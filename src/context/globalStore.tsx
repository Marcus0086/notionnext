import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { SiteGloalFlag } from "@/types";

const GlobalSettingsStore = createContext({
  settings: {} as SiteGloalFlag,
  setSettings: {} as Dispatch<SetStateAction<SiteGloalFlag>>,
});

export const useGlobalSettings = () => useContext(GlobalSettingsStore);

const GlobalSettingsStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SiteGloalFlag>({
    isDialogOpen: false,
  });
  return (
    <GlobalSettingsStore.Provider value={{ settings, setSettings }}>
      {children}
    </GlobalSettingsStore.Provider>
  );
};

export default GlobalSettingsStoreProvider;
