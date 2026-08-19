import { useEffect, useMemo, useState } from "react";
import { Animated, Easing, Modal, Text as RNText, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type OverlayStore = {
  visible: boolean;
  text: string;
};

type Listener = (store: OverlayStore) => void;

const DEFAULT_TEXT = "Loading...";

let state: OverlayStore = {
  visible: false,
  text: DEFAULT_TEXT,
};

let listeners: Listener[] = [];

function emit() {
  listeners.forEach((listener) => listener(state));
}

export function show(text: string = DEFAULT_TEXT) {
  state = {
    visible: true,
    text,
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
  const [rotationValue] = useState(() => new Animated.Value(0));
  const [localState, setLocalState] = useState<OverlayStore>(state);

  useEffect(
    () =>
      subscribe((nextState) => {
        setLocalState(nextState);
      }),
    [],
  );

  const ringRotation = useMemo(
    () =>
      rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [rotationValue],
  );

  useEffect(() => {
    if (!localState.visible) {
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
  }, [localState.visible, rotationValue]);

  return (
    <Modal
      visible={localState.visible}
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
