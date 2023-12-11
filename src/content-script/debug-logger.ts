import ExhaustiveError from "../utils/exhaustive-error";
import { AutofillDataList, DebugMode } from "../utils/storage";
import { AutofillData, AutofillResultObject } from "./autofill";
import modelessStyle from "./modeless-style.scss" assert { type: "css" };

type Result = {
  autofillData: AutofillData;
  result: AutofillResultObject | null;
};

class DebugLogger {
  private results: Result[];
  private modelessContentElement?: HTMLElement;

  public constructor(autofillDataList: AutofillDataList) {
    this.results = autofillDataList.map((autofillData) => ({
      autofillData,
      result: null
    }));
  }

  public setResult(index: number, result: AutofillResultObject) {
    this.results[index].result = result;
  }

  public log(mode: DebugMode): void {
    const text = `
      [Simple Autofill] ${Math.round(performance.now())} ms
      ${this.results.map(this.createResultMessage).join("\n")}
    `.replace(/^\s+/gm, "");

    switch (mode) {
      case "none":
        break;
      case "modeless":
        this.showModeless(text);
        break;
      case "console":
        console.log(text);
        break;
      case "modal":
        alert(text);
        break;
      default:
        throw new ExhaustiveError(mode);
    }
  }

  private createResultMessage({ result, autofillData }: Result, index: number) {
    const status =
      result === null
        ? "PROCESSING"
        : `${result.result === 0 ? "SUCCEED" : "FAILED"}: ${result.result} - ${result.message}`;

    return `
      #${index + 1} ${status}
      | '${autofillData.host.tester}' - '${autofillData.path.tester}'
      | Autofill: '${autofillData.selector}'
      |   -> '${autofillData.attribute}' = '${autofillData.value}'
      | Timeout: ${autofillData.timeout}
    `;
  }

  private showModeless(content: string) {
    if (!this.modelessContentElement) {
      const modelessElement = document.createElement("div");
      modelessElement.style.setProperty("all", "initial", "important");

      this.modelessContentElement = document.createElement("pre");

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        modelessElement.remove();
      });

      const modelessFixedContainer = document.createElement("div");
      modelessFixedContainer.append(this.modelessContentElement, closeButton);

      const styleElement = document.createElement("style");
      styleElement.textContent = modelessStyle;

      const shadow = modelessElement.attachShadow({ mode: "closed" });
      shadow.append(modelessFixedContainer, styleElement);

      document.body.append(modelessElement);
    }

    this.modelessContentElement.textContent = content;
  }
}

export default DebugLogger;
