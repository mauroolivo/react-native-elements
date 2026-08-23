import ExpoModulesCore
import UIKit

struct VibrationOptions: Record {
  @Field var duration: Int = 500
  @Field var intensity: Double = 1.0
}

public class DeviceDiagnosticsModule: Module {
  private var batteryObservers: [NSObjectProtocol] = []
  private var isManuallyMonitoring = false

  public func definition() -> ModuleDefinition {
    Name("DeviceDiagnostics")

    Events("batteryStateChanged")

    OnStartObserving("batteryStateChanged") { [weak self] in
      self?.startBatteryMonitoring()
    }

    OnStopObserving("batteryStateChanged") { [weak self] in
      self?.stopBatteryMonitoring()
    }

    OnDestroy { [weak self] in
      self?.stopBatteryMonitoring()
    }

    Function("getPlatformName") {
      "ios"
    }

    Function("getDeviceInfo") {
      let device = UIDevice.current
      return [
        "platform": "ios",
        "model": device.model,
        "systemVersion": device.systemVersion
      ]
    }

    Function("vibrate") { (options: VibrationOptions) throws in
      guard options.duration > 0 else {
        throw Exception(name: "InvalidArgumentException", description: "`duration` must be greater than 0.")
      }
      guard options.intensity >= 0 && options.intensity <= 1 else {
        throw Exception(name: "InvalidArgumentException", description: "`intensity` must be between 0 and 1.")
      }

      let style: UIImpactFeedbackGenerator.FeedbackStyle
      switch options.duration {
      case ..<200:
        style = .light
      case 200..<500:
        style = .medium
      default:
        style = .heavy
      }

      DispatchQueue.main.async {
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.prepare()
        if #available(iOS 13.0, *) {
          generator.impactOccurred(intensity: CGFloat(options.intensity))
        } else {
          generator.impactOccurred()
        }
      }
    }

    AsyncFunction("getAvailableDiskSpace") { () throws -> [String: Int64] in
      let attributes = try FileManager.default.attributesOfFileSystem(forPath: NSHomeDirectory())
      guard let freeSize = attributes[.systemFreeSize] as? NSNumber else {
        throw Exception(name: "DiskSpaceUnavailableException", description: "Available disk space is unavailable.")
      }

      return ["availableBytes": freeSize.int64Value]
    }

    Function("startMonitoring") {
      self.isManuallyMonitoring = true
      self.startBatteryMonitoring()
    }

    Function("stopMonitoring") {
      self.isManuallyMonitoring = false
      self.stopBatteryMonitoring()
    }
  }

  private func startBatteryMonitoring() {
    UIDevice.current.isBatteryMonitoringEnabled = true
    guard batteryObservers.isEmpty else {
      emitBatteryStateIfAvailable()
      return
    }

    let center = NotificationCenter.default
    let levelObserver = center.addObserver(
      forName: UIDevice.batteryLevelDidChangeNotification,
      object: nil,
      queue: .main
    ) { [weak self] _ in
      self?.emitBatteryStateIfAvailable()
    }
    let stateObserver = center.addObserver(
      forName: UIDevice.batteryStateDidChangeNotification,
      object: nil,
      queue: .main
    ) { [weak self] _ in
      self?.emitBatteryStateIfAvailable()
    }

    batteryObservers = [levelObserver, stateObserver]
    emitBatteryStateIfAvailable()
  }

  private func stopBatteryMonitoring() {
    let center = NotificationCenter.default
    batteryObservers.forEach { center.removeObserver($0) }
    batteryObservers.removeAll()
    UIDevice.current.isBatteryMonitoringEnabled = false
  }

  private func emitBatteryStateIfAvailable() {
    let device = UIDevice.current
    let level = device.batteryLevel
    guard level >= 0 else {
      return
    }

    let isCharging = device.batteryState == .charging || device.batteryState == .full
    sendEvent("batteryStateChanged", [
      "level": level,
      "isCharging": isCharging
    ])
  }
}
