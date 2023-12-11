import { FC } from "react";
import { Settings } from "../../utils/storage";
import AutofillList from "./AutofillList";
import DebugModeInput from "./DebugModeInput";

type Props = {
  settings: Settings;
  onChange: (settings: Settings) => void;
};

const SettingsInput: FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="SettingsInput">
      <DebugModeInput
        debugMode={settings.debugMode}
        onChange={(debugMode) => {
          onChange({ ...settings, debugMode });
        }}
      />
      Autofill
      <AutofillList
        autofillDataList={settings.autofillDataList}
        onChange={(autofillDataList) => {
          onChange({ ...settings, autofillDataList });
        }}
      />
    </div>
  );
};

export default SettingsInput;
