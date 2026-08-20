# DeviceDiagnostics — Expo Native Module Learning Plan

Use this document as a staged implementation plan for building a custom Expo native module with Swift (iOS), Kotlin (Android), and TypeScript.

## Goal

Build a `DeviceDiagnostics` module incrementally. Each stage should introduce one new native-module concept while preserving the API and behavior implemented in previous stages.

Do not jump ahead unless the current stage works on both iOS and Android.

---

## Stage 0 — Project Setup and Development Build

### Objective

Prepare the project so native code can be added, compiled, and tested reliably.

### Implement

- Read the Expo SDK 57 versioned native module documentation before creating native code.
- Create the local Expo module structure and confirm that it is autolinked.
- Build and launch a development client on iOS and Android.
- Add a small TypeScript screen or route that will exercise each stage.
- Confirm that native changes are included after rebuilding the development client.

### Learn

- The difference between Expo Go and a development build.
- Local module layout and native autolinking.
- When a native change requires prebuild, pod installation, or a native rebuild.

### Done when

The project builds and launches a development client on both platforms, and a local native module can be rebuilt without affecting unrelated app behavior.

---

## Stage 1 — JS → Native Function

### Objective

Learn the basic path from TypeScript/JavaScript to native code.

This is intentionally a bridge-learning API. In a normal application, the platform name is already available through React Native APIs such as `Platform.OS`.

### API

```ts
const platform = DeviceDiagnostics.getPlatformName();
// "ios" | "android"
```

### Implement

- Create a local Expo native module.
- Add the iOS implementation in Swift.
- Add the Android implementation in Kotlin.
- Export `getPlatformName()`.
- Expose a typed TypeScript API.

### Concept

```text
React Native / TypeScript
        ↓
Expo Modules API
        ↓
Swift / Kotlin
```

### Done when

The same TypeScript call returns `"ios"` on iOS and `"android"` on Android.

---

## Stage 2 — Native → JS Result

### Objective

Return structured native data to JavaScript and understand type conversion across the native boundary.

### API

```ts
const info = DeviceDiagnostics.getDeviceInfo();

// Example:
{
  model: "iPhone",
  systemVersion: "26.0",
  platform: "ios"
}
```

### Implement

Return useful device information obtained from native platform APIs, such as:

- platform
- device model
- OS/system version

Define corresponding TypeScript types.

### Concept

```text
Swift / Kotlin values
        ↓
Expo Modules
        ↓
JavaScript object
        ↓
TypeScript type
```

### Learn

- Which values can cross the native boundary.
- Mapping Swift/Kotlin values to JavaScript.
- Designing a stable TypeScript contract over platform-specific implementations.

### Done when

`getDeviceInfo()` returns a correctly typed object on both platforms.

---

## Stage 3 — Arguments: JS → Native

### Objective

Pass values from JavaScript into native functions.

### API

```ts
DeviceDiagnostics.vibrate({
  duration: 500,
  intensity: 0.8,
});
```

### Implement

Add a native vibration or haptic function accepting a platform-independent options object:

```ts
DeviceDiagnostics.vibrate({
  duration: 500,
  intensity: 0.8,
});
```

Validate that `duration` is positive and that `intensity` is between `0` and `1`.

On Android, use the vibrator API where supported. On iOS, use an appropriate haptic feedback API and document that arbitrary vibration duration may be approximated because iOS does not expose an equivalent general-purpose vibration API.

### Concept

```text
JS
│
│ duration and intensity
▼
Expo Modules
│
▼
Swift / Kotlin
│
▼
Platform API
```

### Learn

- Native function parameters.
- JS → Swift/Kotlin type conversion.
- Input validation.
- Platform differences.
- Native error handling.

### Optional extension

Add a named haptic preset while keeping the structured options contract:

```ts
DeviceDiagnostics.vibrate({
  preset: "success",
});
```

### Done when

JavaScript can provide arguments that affect native behavior on both platforms.

---

## Stage 4 — Async Native Code

### Objective

Understand asynchronous native operations, Promises, and native error propagation.

### API

```ts
const bytes = await DeviceDiagnostics.getAvailableDiskSpace();
```

Usage:

```ts
try {
  const bytes = await DeviceDiagnostics.getAvailableDiskSpace();
} catch (error) {
  console.error(error);
}
```

### Implement

Add an asynchronous function that obtains available disk space using native platform APIs.

Define the result explicitly:

```ts
type DiskSpaceInfo = {
  availableBytes: number;
};
```

Reject the Promise for native failures, unavailable information, or unsupported platforms rather than silently returning an invalid value.

### Concept

```text
JS ── request ──→ Native
JS ←─ Promise ─── Native
```

### Learn

- Async Expo module functions.
- Promise resolution.
- Promise rejection.
- Native errors reaching JavaScript.
- Threading considerations for native operations.

### Done when

`await DeviceDiagnostics.getAvailableDiskSpace()` resolves with a typed value and failures can propagate correctly to JS.

---

## Stage 5 — Native → JS Events

### Objective

Allow native code to proactively notify JavaScript when native state changes.

### API

```ts
const subscription = DeviceDiagnostics.addListener(
  "batteryStateChanged",
  (event) => {
    console.log(event.level);
    console.log(event.isCharging);
  },
);
```

Example event:

```ts
{
  level: 0.73,
  isCharging: true
}
```

### Implement

Observe battery state using native APIs and emit a `batteryStateChanged` event to JavaScript.

Define the event contract:

```ts
type BatteryStateChangedEvent = {
  level: number;
  isCharging: boolean;
};
```

When monitoring begins, emit the current battery state once if it is available, then emit subsequent changes. Document that battery behavior can be limited or simulated differently on iOS simulators and Android emulators.

### Concept

```text
OS
│
│ battery changed
▼
Swift / Kotlin
│
│ event
▼
Expo Modules
│
▼
JavaScript listener
```

### Learn

- Native event emitters.
- Event payloads.
- Native → JS communication.
- TypeScript event types.
- Subscriptions.

### Done when

Changing battery/charging state can cause native code to emit a typed event received by JavaScript.

---

## Stage 6 — Native Lifecycle

### Objective

Manage native resources and state correctly over time.

### First implementation: explicit lifecycle

Start with explicit lifecycle control:

```ts
DeviceDiagnostics.startMonitoring();
```

and:

```ts
DeviceDiagnostics.stopMonitoring();
```

### Implement

Maintain native monitoring state and correctly register/unregister OS observers.

### Concept

```text
JS
│
│ startMonitoring()
▼
Native Module
│
├── register OS observer
├── maintain state
├── receive callbacks
├── emit events → JS
│
│ stopMonitoring()
▼
unregister observer
```

### Investigate

Understand what should happen when:

- a React component unmounts
- the application enters the background
- the application returns to the foreground
- there are zero JS listeners
- there are multiple JS listeners
- the native module is destroyed
- Android recreates an Activity

### Follow-up: listener-owned lifecycle

After explicit lifecycle management works, consider making subscriptions control monitoring automatically:

After understanding explicit lifecycle management, consider making subscriptions control monitoring automatically:

```ts
const subscription = DeviceDiagnostics.addListener(
  "batteryStateChanged",
  callback,
);

// Later:
subscription.remove();
```

The native module can start monitoring when the first listener is registered and stop when the last listener is removed. Treat this as a follow-up exercise so resource ownership is clear before it becomes implicit.

### Learn

- Native module lifecycle.
- Resource cleanup.
- Listener counting.
- Application/activity lifecycle.
- Avoiding leaked observers and resources.

### Done when

Monitoring starts and stops predictably without leaking native observers or duplicating subscriptions.

---

## Cross-Stage Verification

For every completed stage:

- Exercise the API from the TypeScript test screen or route.
- Run TypeScript and lint checks.
- Build the development client with the native implementation.
- Verify the behavior on both iOS and Android.
- Preserve and rerun the checks for all previous stages.

Use physical devices when simulator or emulator behavior is not representative, especially for vibration, haptics, battery state, and background lifecycle behavior.

---

## Stage 7 — Native View

### Objective

Expose a real native UI component to React Native.

### API

```tsx
<DeviceDiagnosticsView showBattery showMemory showDisk />
```

### Implement

Create:

- an iOS native view
- an Android native view
- an Expo Modules view definition
- a typed React Native component wrapper

This stage requires a native rebuild after adding the view. Include module configuration and autolinking verification as part of the implementation.

### Architecture

```text
React

<DeviceDiagnosticsView />
          │
          ▼
     Expo Modules
       /       \
      /         \
   iOS         Android
    │             │
 Native View    Native View
    │             │
 UIKit       Android UI
```

### Props

Expose React props to native code:

```tsx
<DeviceDiagnosticsView refreshInterval={1000} showBattery={true} />
```

Flow:

```text
React → props → Native View
```

### Events

Expose native UI events back to React:

```tsx
<DeviceDiagnosticsView
  onBatteryPress={(event) => {
    console.log(event.nativeEvent);
  }}
/>
```

Flow:

```text
React
  ↓ props
Native View
  ↑ events
React
```

### Learn

- Expo native views.
- Native view lifecycle.
- React props → native properties.
- Native events → React callbacks.
- Swift/UIKit and Kotlin/Android view implementations.
- Maintaining one React API over different native UI implementations.

### Done when

The React component renders a real native view on both platforms, accepts props, and emits at least one event back to React.

---

## Final Mental Model

After completing all seven stages:

```text
1. Function
   JS ──────────────→ Native

2. Return value
   JS ←────────────── Native

3. Arguments
   JS ── data ──────→ Native

4. Async
   JS ── request ───→ Native
   JS ←─ Promise ──── Native

5. Events
   JS ←─ event ────── Native

6. Lifecycle
   JS ←→ Native state ←→ OS

7. Views
   React
     ↕ props/events
   Native UI
     ↕
   OS
```

## Implementation Rule for Agents

When using this file as an agent reference:

1. Implement only the requested stage.
2. Preserve all working behavior from previous stages.
3. Implement both iOS and Android unless explicitly instructed otherwise.
4. Keep the public TypeScript API platform-independent.
5. Prefer Expo Modules APIs and conventions rather than legacy React Native native-module APIs.
6. Keep native implementations small and focused on demonstrating the concept.
7. Add TypeScript types for every public API and event payload.
8. Handle native errors explicitly where applicable.
9. Clean up native listeners, observers, and resources.
10. Do not introduce unrelated abstractions or dependencies.
11. Add a small TypeScript usage screen or focused test for each public API.
12. Verify the implementation on both platforms before considering a stage complete; use physical devices when simulator or emulator behavior is not representative.
