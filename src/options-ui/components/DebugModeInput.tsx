import { FC } from "react";
import { DebugMode } from "../../utils/storage";

type Props = {
  debugMode: DebugMode;
  onChange: (debugMode: DebugMode) => void;
};

const DebugModeInput: FC<Props> = ({ debugMode, onChange }) => {
  return (
    <div className="DebugModeInput">
      Debug
      <select
        className="DebugModeInput__select"
        value={debugMode}
        onChange={({ target }) => {
          const parseResult = DebugMode.safeParse(target.value);

          if (parseResult.success) {
            onChange(parseResult.data);
          }
        }}
      >
        <option value="none">None</option>
        <option value="modeless">Modeless</option>
        <option value="console">Console</option>
        <option value="modal">Modal</option>
      </select>
    </div>
  );
};

export default DebugModeInput;
