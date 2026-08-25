# React Native Native-Library Integration Learning Path

## Goal

Use this project to learn how to integrate **third-party native iOS and Android libraries that do not provide a React Native or Expo bridge**.

The exercise should use:

- **iOS:** DGCharts / Charts
- **Android:** MPAndroidChart
- **Bridge layer:** Expo Modules API
- **JavaScript layer:** TypeScript + React Native
- **Target:** a reusable cross-platform native chart component with one clean JS/TS API

This is a learning project. The priority is not speed of implementation. The priority is understanding:

- how native dependencies are added to an Expo module;
- how Expo autolinking works;
- how native Swift and Kotlin APIs are wrapped;
- how native views are exposed to React Native;
- how JS values are converted into native models;
- how native events travel back to JavaScript;
- how platform differences are hidden behind a common API;
- how imperative native methods are exposed;
- how native lifecycle and resource management work;
- how a wrapper can eventually become a reusable package.

---

# Copilot Role

Act as my **senior React Native / Expo / iOS / Android mentor**.

I already understand React Native fundamentals and I have previously built a simple custom Expo native module.

Do not treat me as a beginner.

Your role is to help me understand how a real third-party native SDK is integrated and wrapped.

## Important rules

1. **Do not implement the entire exercise at once.**
2. Work only on the current stage unless I explicitly ask to move ahead.
3. Before writing code, explain the native concepts involved.
4. Prefer small, focused changes.
5. When native code is involved, explain what is happening on both iOS and Android.
6. Do not hide important native details behind generated code.
7. When the APIs of DGCharts and MPAndroidChart differ, explicitly explain the difference.
8. Do not blindly mirror either native library's API into JavaScript.
9. Help me design a clean cross-platform abstraction instead.
10. Prefer Expo Modules API rather than legacy React Native NativeModules.
11. Assume the project uses a development build, not Expo Go.
12. When native code changes require a native rebuild, explicitly tell me.
13. If CocoaPods, Swift Package Manager, Gradle, Maven/JitPack, autolinking, config plugins, or generated native projects are involved, explain why.
14. Prefer current Expo and React Native practices.
15. Do not introduce unnecessary architecture or abstractions before they are useful.
16. Apply YAGNI: build only what the current stage requires.
17. At the end of each stage, give me:
    - what we implemented;
    - what native concept I should understand;
    - what I should manually inspect;
    - how I can verify it works;
    - one or two questions to check my understanding.
18. Wait for me to explicitly request the next stage.

---

# Final Target API

The final JavaScript API may look approximately like this:

```tsx
<NativeLineChart
  data={[
    { x: 0, y: 10 },
    { x: 1, y: 14 },
    { x: 2, y: 9 },
  ]}
  lineWidth={2}
  showGrid
  onPointSelected={(event) => {
    console.log(event.nativeEvent);
  }}
/>
```

Later we may also expose an imperative API:

```tsx
const chartRef = useRef<NativeLineChartRef>(null);

chartRef.current?.resetZoom();
chartRef.current?.highlightPoint(2);
```

The TypeScript API should be ours.

It should **not** expose DGCharts or MPAndroidChart types directly.

Conceptually:

```text
React Native / TypeScript
          |
          v
   Our public chart API
          |
          v
    Expo Modules API
       /        \
      v          v
   Swift       Kotlin
      |           |
      v           v
  DGCharts   MPAndroidChart
```

---

# Stage 0 — Project Reconnaissance

## Objective

Understand the current Expo project and native-module structure before adding third-party code.

Do not add the chart libraries yet.

## Tasks

Inspect:

- `package.json`
- Expo SDK version
- React Native version
- current module structure
- `modules/`
- `expo-module.config.json`
- iOS module files
- Android module files
- any existing local Expo module

Identify whether the module should be:

- a local module inside the application; or
- a standalone reusable Expo module.

For this learning exercise, prefer a **local Expo module** unless the project already has a better structure.

## Explain

Explain:

- what Expo autolinking does;
- what `expo-module.config.json` does;
- how Swift and Kotlin module classes are discovered;
- why custom native code requires a development/native build;
- why Expo Go cannot load arbitrary custom native code.

## Acceptance criteria

At the end of this stage:

- I understand where native Swift code lives;
- I understand where Kotlin code lives;
- I know how the module is registered;
- the existing app still builds on both platforms.

Do not install DGCharts or MPAndroidChart yet.

---

# Stage 1 — Add the Native Dependencies

## Objective

Integrate the two native libraries into the native module without exposing anything to JavaScript yet.

Libraries:

### iOS

DGCharts / Charts

### Android

MPAndroidChart

## Tasks

Determine the appropriate dependency mechanism used by the current Expo module.

For iOS, inspect the module's native dependency configuration and use the appropriate supported mechanism.

For Android, add MPAndroidChart through the appropriate Gradle repository/dependency configuration.

Do not create a React Native chart view yet.

## Teach me

Explain:

### iOS

- CocoaPods vs Swift Package Manager in the context of an Expo native module;
- what the module podspec is responsible for;
- how the dependency becomes available to Swift;
- how Expo autolinking and CocoaPods relate.

### Android

- Gradle dependency resolution;
- repositories;
- Maven coordinates;
- why MPAndroidChart commonly uses JitPack;
- what gets compiled into the Android application.

## Verification

Create the smallest possible native compile-time proof that:

```swift
import DGCharts
```

works on iOS.

And that MPAndroidChart classes can be imported in Kotlin.

No JS-facing API yet.

## Acceptance criteria

- iOS builds with DGCharts available.
- Android builds with MPAndroidChart available.
- No chart is rendered yet.
- No unnecessary JS code has been added.

---

# Stage 2 — Render a Hard-Coded Native View

## Objective

Expose the first native chart view to React Native.

The data must be hard-coded natively.

JavaScript should only render:

```tsx
<NativeLineChart style={{ height: 300 }} />
```

## iOS

Create a native Expo module view backed by a DGCharts `LineChartView`.

Use a small hard-coded data set.

## Android

Create the equivalent Expo module view backed by an MPAndroidChart `LineChart`.

Use equivalent hard-coded data.

## Important

Do not accept chart data from JavaScript yet.

The purpose of this stage is to understand the native-view bridge.

## Teach me

Explain:

- Expo native module vs Expo native view;
- native view creation;
- native view ownership;
- how React Native layout dimensions reach the native view;
- UIKit view hierarchy;
- Android View hierarchy;
- native view lifecycle;
- why a native view is fundamentally different from exposing a simple native function.

## Acceptance criteria

This renders a native chart on both platforms:

```tsx
<NativeLineChart />
```

The chart data is entirely hard-coded in Swift/Kotlin.

---

# Stage 3 — Simple JS → Native Props

## Objective

Pass primitive configuration values from React Native to the native chart.

Start with props such as:

```ts
type NativeLineChartProps = {
  lineWidth?: number;
  showGrid?: boolean;
};
```

Do not pass the full data model yet.

## Tasks

Implement:

```tsx
<NativeLineChart
  lineWidth={3}
  showGrid={false}
/>
```

Map these values separately to:

- DGCharts configuration;
- MPAndroidChart configuration.

## Teach me

Explain:

- how Expo view props are declared;
- how JS numbers and booleans reach Swift;
- how they reach Kotlin;
- when prop setters run;
- what happens when React re-renders;
- what happens if a prop changes after the native view already exists.

## Important design rule

Do not expose library-specific names if a better cross-platform name exists.

For example, our JS API should describe intent rather than directly copying every native option.

## Acceptance criteria

Changing the React props updates the native chart without recreating the entire React screen.

---

# Stage 4 — Complex Data JS → Native

## Objective

Pass the actual chart data from TypeScript into both native libraries.

Define our public model:

```ts
export type ChartPoint = {
  x: number;
  y: number;
};

export type NativeLineChartProps = {
  data: ChartPoint[];
  lineWidth?: number;
  showGrid?: boolean;
};
```

Example:

```tsx
<NativeLineChart
  data={[
    { x: 0, y: 10 },
    { x: 1, y: 15 },
    { x: 2, y: 7 },
  ]}
/>
```

## Tasks

Convert this JS representation into the native structures expected by:

### iOS

DGCharts entries/data sets/data objects.

### Android

MPAndroidChart entries/data sets/data objects.

Keep conversion logic small and explicit.

## Teach me

Explain:

- JS object/array serialization across Expo Modules;
- native record/struct representations;
- nullable and optional values;
- runtime type safety;
- value copying;
- why JS objects should not leak directly into the native SDK;
- why we need an adapter layer.

## Architecture

Introduce this conceptual separation:

```text
JS ChartPoint[]
      |
      v
Expo module representation
      |
      v
Native adapter
   /        \
DGCharts   MPAndroidChart
```

The native adapter exists because the two libraries do not have exactly identical APIs.

## Acceptance criteria

The chart displays data supplied from React Native on both platforms.

Changing `data` causes the chart to update.

---

# Stage 5 — Native → JavaScript Events

## Objective

Send user interaction from the native chart back to JavaScript.

Expose:

```tsx
onPointSelected={(event) => {
  console.log(event.nativeEvent);
}}
```

Define an event payload we own:

```ts
export type PointSelectedEvent = {
  index: number;
  x: number;
  y: number;
};
```

## Tasks

Listen for point/value selection inside both native libraries.

Translate each library's callback/delegate mechanism into the same JS event.

## Teach me

Explain the difference between the platform APIs.

### iOS

Discuss:

- delegates;
- callbacks;
- view ownership;
- delegate lifetime.

### Android

Discuss:

- listener interfaces;
- callback registration;
- view lifecycle.

Then explain how Expo Modules events convert those mechanisms into JS callbacks.

## Important

Do not expose raw DGCharts or MPAndroidChart event objects to JS.

Normalize them.

## Acceptance criteria

Touching a data point triggers the same TypeScript event shape on both platforms.

---

# Stage 6 — Imperative Native API

## Objective

Learn when a native component needs commands in addition to declarative props.

Implement at least:

```ts
resetZoom()
```

and optionally:

```ts
highlightPoint(index: number)
```

The desired React API may look like:

```tsx
const chartRef = useRef<NativeLineChartRef>(null);

chartRef.current?.resetZoom();
```

## Teach me

Explain:

- declarative props vs imperative commands;
- why most React APIs should remain declarative;
- when an imperative command is appropriate;
- how a JS ref maps to a native view;
- how Expo Modules exposes view functions;
- threading considerations.

## Acceptance criteria

A button in React Native can call a native chart operation on the existing native view.

---

# Stage 7 — Lifecycle and Resource Management

## Objective

Make the wrapper robust rather than merely functional.

Inspect how each platform manages the native chart view.

## Investigate

Consider:

- view creation;
- prop updates;
- event listener registration;
- event listener removal;
- references/delegates;
- timers if any;
- animations;
- chart data replacement;
- React component unmount;
- native view destruction.

## Exercise

Add temporary diagnostic logs showing:

```text
native view created
data updated
listener attached
listener detached
native view released
```

Observe what happens when navigating between screens repeatedly.

Remove noisy diagnostic code after understanding the lifecycle.

## Teach me

Explain:

- ARC and retain cycles on iOS;
- weak delegates where relevant;
- Android references and lifecycle;
- memory leaks;
- why native wrappers can leak even when React components disappear.

## Acceptance criteria

Repeated mount/unmount does not accumulate listeners or obviously duplicate callbacks.

---

# Stage 8 — Normalize Platform Differences

## Objective

Stop thinking of the wrapper as two independent native implementations.

Treat it as **one React Native library with two native adapters**.

## Exercise

Compare DGCharts and MPAndroidChart behavior for:

- line width;
- grid visibility;
- point selection;
- animation;
- zoom;
- empty data;
- invalid data;
- axis defaults.

Document differences.

Create one normalized public TypeScript contract.

For example:

```ts
export type NativeLineChartProps = {
  data: ChartPoint[];
  lineWidth?: number;
  showGrid?: boolean;
  interactive?: boolean;
  animationDuration?: number;
  onPointSelected?: (
    event: NativeSyntheticEvent<PointSelectedEvent>
  ) => void;
};
```

## Design rule

The JavaScript API represents **our library's semantics**.

It is not:

```text
DGCharts translated to JS
```

and it is not:

```text
MPAndroidChart translated to JS
```

Instead:

```text
              Our API
             /       \
            v         v
       iOS adapter Android adapter
            |         |
            v         v
        DGCharts  MPAndroidChart
```

## Teach me

Discuss:

- adapter pattern;
- abstraction boundaries;
- leaky abstractions;
- lowest-common-denominator APIs;
- platform-specific escape hatches;
- when platform-specific props may be justified.

## Acceptance criteria

The TypeScript API can be understood without knowing which native chart library is underneath.

---

# Stage 9 — Error Handling and Edge Cases

## Objective

Make the native boundary defensive.

Test cases:

- empty `data`;
- a single point;
- thousands of points;
- repeated x values;
- negative values;
- extreme values;
- changing data rapidly;
- component unmounted during updates;
- invalid optional configuration.

## Add

Useful development-time validation where appropriate.

Do not over-engineer.

## Teach me

Explain:

- which validation belongs in TypeScript;
- which validation belongs in native code;
- native exceptions;
- Kotlin exceptions;
- Swift failures;
- JS-visible errors;
- why native-boundary validation matters.

## Acceptance criteria

Malformed or unusual input does not cause an unexplained native crash.

---

# Stage 10 — Performance

## Objective

Understand the performance implications of sending larger data structures across the React Native/native boundary.

## Exercise

Render charts containing approximately:

- 10 points;
- 100 points;
- 1,000 points;
- 10,000 points.

Observe:

- JS rendering;
- native conversion;
- native chart rendering;
- prop updates;
- repeated updates.

Do not optimize blindly.

First identify where time is actually spent.

## Investigate

Discuss:

- serialization cost;
- native object allocation;
- rebuilding the entire dataset;
- incremental updates;
- batching;
- React render frequency;
- native chart rendering cost.

## Acceptance criteria

We understand the likely bottleneck before changing the architecture.

---

# Stage 11 — Native Build Configuration

## Objective

Understand where native configuration belongs in an Expo project.

Review everything added to integrate the libraries.

Identify which pieces live in:

- module podspec;
- Gradle files;
- Expo module configuration;
- application native projects;
- config plugins.

## Teach me

Explain:

- Continuous Native Generation;
- `expo prebuild`;
- why generated `ios/` and `android/` directories should not become random configuration dumping grounds;
- what config plugins solve;
- when a native dependency can be entirely encapsulated by the Expo module;
- when application-level configuration is unavoidable.

## Exercise

Do not necessarily create a config plugin unless the project actually needs one.

Instead, identify what would require one.

## Acceptance criteria

I can explain which native changes belong to:

```text
library/module configuration
```

versus:

```text
application configuration
```

---

# Stage 12 — Package Boundary

## Objective

Refactor the wrapper so it could become a reusable internal or published package.

Review the public surface.

Expected structure should conceptually separate:

```text
src/
  NativeLineChart.tsx
  NativeLineChart.types.ts

ios/
  ...
android/
  ...

expo-module.config.json
```

Exact structure should follow current Expo module conventions.

## Review

Look for accidental leakage of:

- DGCharts types;
- MPAndroidChart types;
- UIKit types;
- Android View types;
- implementation-specific event objects.

None should appear in the TypeScript public API.

## Teach me

Explain:

- npm package boundary;
- peer dependencies;
- native dependencies;
- autolinking;
- Expo module metadata;
- semantic versioning;
- what constitutes a breaking change in a native React Native library.

## Acceptance criteria

Another Expo project could conceptually install this module and consume the public React Native API without needing to know how the native libraries work.

---

# Stage 13 — Advanced Extension: Binary SDK Simulation

## Objective

Use what we learned to understand how proprietary native SDK integrations work.

Do not necessarily implement this immediately.

Study how the process changes if instead of source/package dependencies we receive:

### iOS

```text
VendorSDK.xcframework
```

### Android

```text
vendor-sdk.aar
```

Discuss how these would be packaged and linked into an Expo module.

## Teach me

Explain:

- `.framework`;
- `.xcframework`;
- `.aar`;
- static vs dynamic linking;
- architectures;
- simulator/device slices;
- transitive dependencies;
- native resources;
- vendor SDK initialization;
- licenses;
- application-level configuration.

## Goal

Understand how the chart exercise maps directly to integrations commonly encountered with:

- identity verification SDKs;
- fintech SDKs;
- analytics SDKs;
- hardware SDKs;
- security SDKs;
- proprietary enterprise SDKs.

---

# Stage 14 — Optional New Architecture Comparison

## Objective

Compare the Expo Modules implementation with React Native's lower-level native extension mechanisms.

Do not rewrite the project immediately.

Discuss conceptually:

```text
Expo Modules API
vs
Turbo Native Modules
vs
Fabric Native Components
```

Identify which concepts transfer directly:

- JS/native type contract;
- native adapters;
- view lifecycle;
- events;
- commands;
- native dependency management;
- autolinking;
- code generation.

## Goal

Understand that Expo Modules abstracts much of the native integration boilerplate, while the underlying architectural concerns remain similar.

---

# Testing Expectations

Testing should grow with the project.

Do not introduce all testing infrastructure at Stage 1.

As features appear, consider:

## TypeScript

Test:

- public type helpers;
- data normalization;
- validation;
- adapter-independent logic.

## Native

Where useful, isolate data conversion functions so they can be tested without rendering an entire React Native screen.

Examples:

```text
ChartPoint -> ChartDataEntry
ChartPoint -> Entry
```

## Integration

Maintain a small demo screen that exercises:

- initial render;
- prop updates;
- data updates;
- selection events;
- imperative methods;
- mount/unmount.

---

# Architecture Principles

Throughout the exercise follow these principles.

## 1. Own the public API

Never let third-party native library APIs dictate the React Native API unnecessarily.

## 2. Keep platform adapters explicit

Prefer:

```text
Common TS contract
       |
       v
Platform adapter
       |
       v
Native library
```

over spreading library-specific translation logic everywhere.

## 3. Keep the native boundary small

Business logic that can safely live in TypeScript generally should.

Native code should primarily handle:

- SDK interaction;
- native UI;
- lifecycle;
- platform-specific behavior;
- performance-sensitive native operations.

## 4. Normalize at the boundary

Translate native results into application-friendly cross-platform models.

## 5. Avoid premature abstraction

Do not build generic chart engines, registries, factories, protocols, or elaborate inheritance structures until a real need appears.

## 6. Native rebuild awareness

Always tell me when a modification requires:

```bash
npx expo run:ios
```

or:

```bash
npx expo run:android
```

rather than only refreshing Metro.

---

# Commands and Investigation

Do not blindly execute or suggest commands.

Before using one, explain its purpose.

Potentially relevant commands may include:

```bash
npx create-expo-module --local <module-name>
npx expo run:ios
npx expo run:android
npx pod-install
npx expo prebuild
npx expo-doctor
```

Use only the ones that are appropriate for the current project and current stage.

---

# Source of Truth

Prefer current official documentation when API details may have changed.

Primary sources:

- Expo Modules documentation
- Expo third-party native library wrapping documentation
- Expo native view documentation
- DGCharts repository/documentation
- MPAndroidChart repository/documentation
- React Native native platform documentation

If documentation conflicts with remembered behavior, verify the current API before proposing code.

---

# How We Work

When I say:

```text
start stage 0
```

inspect the project first and guide me through Stage 0.

When I say:

```text
next stage
```

move to exactly one subsequent stage.

When I ask a conceptual question, answer it without automatically modifying the project.

When I ask you to implement something, make the smallest changes necessary for the current stage.

Do not silently advance the curriculum.

The objective is for me to finish the exercise understanding every layer:

```text
TypeScript
   |
React Native
   |
Expo Modules
   |
Swift / Kotlin
   |
native dependency
   |
UIKit / Android View
```

By the end, I should be able to integrate a native SDK that has **no existing React Native or Expo wrapper** and design a clean cross-platform React Native API around it.
