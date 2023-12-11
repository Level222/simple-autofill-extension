import { FC, useState } from "react";
import URLTesterInput from "./URLTesterInput";
import { AutofillData } from "../../content-script/autofill";

type Props = {
  autofillData: AutofillData;
  onChange: (autofillData: AutofillData) => void;
};

const AutofillDataInput: FC<Props> = ({ autofillData, onChange }) => {
  const [currentTimeoutValue, setCurrentTimeoutValue] = useState(
    String(autofillData.timeout)
  );

  const [isTimeoutValid, setIsTimeoutValid] = useState<boolean>(true);

  return (
    <div className="AutofillDataInput">
      Host
      <URLTesterInput
        urlTester={autofillData.host}
        onChange={(host) => {
          onChange({ ...autofillData, host });
        }}
      />
      Path
      <URLTesterInput
        urlTester={autofillData.path}
        onChange={(path) => {
          onChange({ ...autofillData, path });
        }}
      />
      Selector
      <input
        className="AutofillDataInput__input"
        type="text"
        placeholder="#user-id"
        value={autofillData.selector}
        onChange={({ target }) => {
          onChange({ ...autofillData, selector: target.value });
        }}
      />
      Attribute
      <input
        className="AutofillDataInput__input"
        type="text"
        placeholder="value"
        value={autofillData.attribute}
        onChange={({ target }) => {
          onChange({ ...autofillData, attribute: target.value });
        }}
      />
      Value
      <input
        className="AutofillDataInput__input"
        type="text"
        placeholder="John"
        value={autofillData.value}
        onChange={({ target }) => {
          onChange({ ...autofillData, value: target.value });
        }}
      />
      Timeout
      <input
        className={`AutofillDataInput__input${
          isTimeoutValid ? "" : "--invalid"
        }`}
        type="text"
        value={currentTimeoutValue}
        placeholder="10"
        onChange={({ target }) => {
          setCurrentTimeoutValue(target.value);
          const numericTimeout = Number(target.value);
          if (Number.isNaN(numericTimeout)) {
            setIsTimeoutValid(false);
          } else {
            setIsTimeoutValid(true);
            onChange({ ...autofillData, timeout: numericTimeout });
          }
        }}
      />
    </div>
  );
};

export default AutofillDataInput;
