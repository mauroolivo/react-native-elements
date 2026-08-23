import ExpoModulesCore
import UIKit

public final class DeviceDiagnosticsView: ExpoView {
  private let containerStack = UIStackView()
  private let batteryLabel = UILabel()
  private let memoryLabel = UILabel()
  private let diskLabel = UILabel()
  let onBatteryPress = EventDispatcher()

  private var showBattery: Bool = true
  private var showMemory: Bool = true
  private var showDisk: Bool = true
  private var refreshInterval: TimeInterval = 1.0
  private var refreshTimer: Timer?

  required public init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    backgroundColor = .secondarySystemBackground
    layer.cornerRadius = 16
    clipsToBounds = true

    containerStack.axis = .vertical
    containerStack.spacing = 8
    containerStack.alignment = .leading
    containerStack.distribution = .fillEqually
    addSubview(containerStack)

    [batteryLabel, memoryLabel, diskLabel].forEach { label in
      label.textColor = .label
      label.font = .systemFont(ofSize: 14, weight: .medium)
      label.numberOfLines = 1
      containerStack.addArrangedSubview(label)
    }

    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleTap))
    addGestureRecognizer(tapGesture)

    updateMetrics()
    startRefreshing()
  }

  override public func layoutSubviews() {
    super.layoutSubviews()
    containerStack.frame = bounds.insetBy(dx: 12, dy: 12)
  }

  func setShowBattery(_ value: Bool) {
    showBattery = value
    updateMetrics()
  }

  func setShowMemory(_ value: Bool) {
    showMemory = value
    updateMetrics()
  }

  func setShowDisk(_ value: Bool) {
    showDisk = value
    updateMetrics()
  }

  func setRefreshInterval(_ value: Double?) {
    let next = value ?? 1.0
    refreshInterval = max(0.25, next)
    startRefreshing()
  }

  private func startRefreshing() {
    refreshTimer?.invalidate()
    refreshTimer = Timer.scheduledTimer(withTimeInterval: refreshInterval, repeats: true) { [weak self] _ in
      self?.updateMetrics()
    }
  }

  @objc private func handleTap() {
    let level = UIDevice.current.batteryLevel
    guard level >= 0 else { return }

    let isCharging = UIDevice.current.batteryState == .charging || UIDevice.current.batteryState == .full
    onBatteryPress([
      "level": level,
      "isCharging": isCharging
    ])
  }

  private func updateMetrics() {
    batteryLabel.isHidden = !showBattery
    memoryLabel.isHidden = !showMemory
    diskLabel.isHidden = !showDisk

    let batteryLevel = UIDevice.current.batteryLevel
    let chargeState = UIDevice.current.batteryState
    let isCharging = chargeState == .charging || chargeState == .full

    batteryLabel.text = showBattery
      ? "Battery: \((batteryLevel >= 0 ? batteryLevel * 100 : 0).rounded())% \(isCharging ? "charging" : "discharging")"
      : ""

    let totalMemory = Double(ProcessInfo.processInfo.physicalMemory) / 1024 / 1024 / 1024
    memoryLabel.text = showMemory ? "Memory: \(String(format: "%.1f", totalMemory)) GB" : ""

    if let attributes = try? FileManager.default.attributesOfFileSystem(forPath: NSHomeDirectory()),
       let freeSize = attributes[.systemFreeSize] as? NSNumber {
      let freeGB = Double(freeSize.int64Value) / 1024 / 1024 / 1024
      diskLabel.text = showDisk ? "Disk: \(String(format: "%.1f", freeGB)) GB free" : ""
    } else {
      diskLabel.text = showDisk ? "Disk: unavailable" : ""
    }
  }
}
