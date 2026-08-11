import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Modal, Text as RNText, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type OverlayStore = {
  visible: boolean;
  text: string;
  activeProviderId: number | null;
};

type Listener = (store: OverlayStore) => void;

const DEFAULT_TEXT = "Loading...";

let state: OverlayStore = {
  visible: false,
  text: DEFAULT_TEXT,
  activeProviderId: null,
};

let listeners: Listener[] = [];
let providerStack: number[] = [];
let nextProviderId = 1;

function emit() {
  listeners.forEach((listener) => listener(state));
}

function registerProvider(): number {
  const providerId = nextProviderId;
  nextProviderId += 1;

  providerStack.push(providerId);
  state = {
    ...state,
    activeProviderId: providerId,
  };
  emit();

  return providerId;
}

function unregisterProvider(providerId: number) {
  providerStack = providerStack.filter((id) => id !== providerId);

  state = {
    ...state,
    activeProviderId:
      providerStack.length > 0 ? providerStack[providerStack.length - 1] : null,
  };
  emit();
}

export function show(text: string = DEFAULT_TEXT) {
  state = {
    visible: true,
    text,
    activeProviderId: state.activeProviderId,
  };
  emit();
}

export function loaderStart(text: string = DEFAULT_TEXT) {
  show(text);
}

export function hide() {
  state = {
    ...state,
    visible: false,
  };
  emit();
}

export function loaderStop() {
  hide();
}

export function updateText(text: string) {
  state = {
    ...state,
    text,
  };
  emit();
}

export async function withLoader<T>(
  text: string,
  task: () => Promise<T> | T,
): Promise<T> {
  loaderStart(text);
  try {
    return await task();
  } finally {
    loaderStop();
  }
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  listener(state);

  return () => {
    listeners = listeners.filter((entry) => entry !== listener);
  };
}

export const loadingOverlay = {
  show,
  hide,
  updateText,
  start: loaderStart,
  stop: loaderStop,
  withLoader,
};

export function LoadingOverlayProvider() {
  const { colors, resolvedTheme } = useTheme();
  const providerIdRef = useRef<number | null>(null);
  const [rotationValue] = useState(() => new Animated.Value(0));
  const [localState, setLocalState] = useState<OverlayStore>(state);
  const [isActiveProvider, setIsActiveProvider] = useState(false);

  useEffect(
    () =>
      subscribe((nextState) => {
        setLocalState(nextState);

        const currentProviderId = providerIdRef.current;
        setIsActiveProvider(
          currentProviderId !== null &&
            nextState.activeProviderId === currentProviderId,
        );
      }),
    [],
  );

  useEffect(() => {
    const currentProviderId = registerProvider();
    providerIdRef.current = currentProviderId;

    return () => {
      unregisterProvider(currentProviderId);
      providerIdRef.current = null;
    };
  }, []);

  const ringRotation = useMemo(
    () =>
      rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [rotationValue],
  );

  useEffect(() => {
    if (!(localState.visible && isActiveProvider)) {
      rotationValue.stopAnimation();
      rotationValue.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => {
      loop.stop();
      rotationValue.stopAnimation();
      rotationValue.setValue(0);
    };
  }, [isActiveProvider, localState.visible, rotationValue]);

  return (
    <Modal
      visible={localState.visible && isActiveProvider}
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      // Android hardware back while Modal is open lands here.
      // Intentionally do nothing so physical back never dismisses the loader.
      onRequestClose={() => {}}
    >
      <View
        className="flex-1 items-center justify-center px-2xl"
        pointerEvents="auto"
        style={{ backgroundColor: colors.overlay }}
      >
        <Animated.View
          className="h-14 w-14 rounded-pill border-4"
          style={{
            borderColor: colors.primary,
            borderTopColor: colors.primary,
            borderRightColor: "transparent",
            transform: [{ rotate: ringRotation }],
          }}
        />
        <RNText
          className="mt-lg text-center text-titleMd"
          style={{
            color: resolvedTheme === "dark" ? colors.text : colors.textInverse,
          }}
        >
          {localState.text}
        </RNText>
      </View>
    </Modal>
  );
}
