Pod::Spec.new do |s|
  s.name           = 'NativeLineChart'
  s.version        = '1.0.0'
  s.summary        = 'A native line chart view for learning Expo module integration'
  s.description    = 'A native line chart view backed by DGCharts.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '16.4',
    :tvos => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'DGCharts'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "NativeLineChartModule.swift", "NativeLineChartView.swift"
end
