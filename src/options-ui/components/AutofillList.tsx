import { FC } from "react";
import AutofillDataInput from "./AutofillDataInput";
import { createInitialAutofillData } from "../../content-script/autofill";
import { AutofillDataList } from "../../utils/storage";

type Props = {
  autofillDataList: AutofillDataList;
  onChange: (autofillDataList: AutofillDataList) => void;
};

const AutofillList: FC<Props> = ({ autofillDataList, onChange }) => {
  return (
    <div className="AutofillList">
      <ul className="AutofillList__list">
        {autofillDataList.map((autofillData, index) => (
          <li key={index} className="AutofillList__item">
            <div className="AutofillList__item-head">
              #{index + 1}
              <button
                className="AutofillList__remove-button"
                onClick={() => {
                  onChange(autofillDataList.filter((_, i) => i !== index));
                }}
              >
                Remove
              </button>
            </div>
            <AutofillDataInput
              autofillData={autofillData}
              onChange={(autofillData) => {
                onChange(
                  autofillDataList.map((value, i) =>
                    i === index ? autofillData : value
                  )
                );
              }}
            />
          </li>
        ))}
      </ul>
      <button
        className="AutofillList__add-button"
        onClick={() => {
          onChange([...autofillDataList, createInitialAutofillData()]);
        }}
      >
        Add an Item
      </button>
    </div>
  );
};

export default AutofillList;
