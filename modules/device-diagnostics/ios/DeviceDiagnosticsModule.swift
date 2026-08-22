import ExpoModulesCore
import UIKit

struct VibrationOptions: Record {
  @Field var duration: Int = 500
  @Field var intensity: Double = 1.0
}

public class DeviceDiagnosticsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceDiagnostics")

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
  }
}
