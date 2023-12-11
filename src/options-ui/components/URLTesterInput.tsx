import { FC } from "react";
import { URLTester, URLTesterType } from "../../content-script/test-url";

type Props = {
  urlTester: URLTester;
  onChange: (urlTester: URLTester) => void;
};

const URLTesterInput: FC<Props> = ({ urlTester, onChange }) => {
  return (
    <div className="URLTesterInput">
      <select
        className="URLTesterInput__select"
        value={urlTester.type}
        onChange={({ target }) => {
          const parseResult = URLTesterType.safeParse(target.value);
          if (parseResult.success) {
            onChange({ ...urlTester, type: parseResult.data });
          }
        }}
      >
        <option value="raw">Raw</option>
        <option value="regex">Regex</option>
        <option value="pattern">Pattern</option>
      </select>
      <input
        className="URLTesterInput__input"
        type="text"
        value={urlTester.tester}
        onChange={({ target }) => {
          onChange({ ...urlTester, tester: target.value });
        }}
      />
    </div>
  );
};

export default URLTesterInput;
