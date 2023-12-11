import { FC, useEffect, useState } from "react";
import { createInitialAutofillData } from "../../content-script/autofill";
import {
  SETTINGS_STORAGE_KEY,
  Settings,
  createInitialSettings
} from "../../utils/storage";
import SettingsInput from "./SettingsInput";

const App: FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    chrome.storage.sync
      .get(SETTINGS_STORAGE_KEY)
      .then(({ [SETTINGS_STORAGE_KEY]: storageData }) => {
        const storageSettings =
          Settings.catch(createInitialSettings()).parse(storageData);

        setSettings({
          ...storageSettings,
          autofillDataList: storageSettings.autofillDataList.length
            ? storageSettings.autofillDataList
            : [createInitialAutofillData()]
        });
      });
  }, []);

  return (
    <main>
      {settings ? (
        <SettingsInput
          settings={settings}
          onChange={(newSettings) => {
            setSettings(newSettings);
            chrome.storage.sync.set({
              [SETTINGS_STORAGE_KEY]: newSettings
            });
          }}
        />
      ) : (
        "Loading"
      )}
    </main>
  );
};

export default App;
