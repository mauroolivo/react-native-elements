import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

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
  const providerIdRef = useRef<number | null>(null);
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
      <View style={styles.overlay} pointerEvents="auto">
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.text}>{localState.text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    minWidth: 160,
    maxWidth: "80%",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.88)",
  },
  text: {
    color: "#ffffff",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
