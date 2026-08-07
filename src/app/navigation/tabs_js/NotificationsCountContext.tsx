import {
    createContext,
    type PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from "react";

type NotificationsCountContextValue = {
  notificationsCount: number;
  incrementNotifications: () => void;
};

const NotificationsCountContext =
  createContext<NotificationsCountContextValue | null>(null);

export function NotificationsCountProvider({ children }: PropsWithChildren) {
  const [notificationsCount, setNotificationsCount] = useState(0);

  const value = useMemo(
    () => ({
      notificationsCount,
      incrementNotifications: () => setNotificationsCount((count) => count + 1),
    }),
    [notificationsCount],
  );

  return (
    <NotificationsCountContext.Provider value={value}>
      {children}
    </NotificationsCountContext.Provider>
  );
}

export function useNotificationsCount() {
  const context = useContext(NotificationsCountContext);

  if (!context) {
    throw new Error(
      "useNotificationsCount must be used within NotificationsCountProvider",
    );
  }

  return context;
}
