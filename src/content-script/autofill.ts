import { z } from "zod";
import testURL, { URLTester } from "./test-url";

export const AutofillData = z.object({
  host: URLTester,
  path: URLTester,
  selector: z.string(),
  attribute: z.string(),
  value: z.string(),
  timeout: z.number()
});

export type AutofillData = z.infer<typeof AutofillData>;

export const createInitialAutofillData = (): AutofillData => ({
  host: { type: "raw", tester: "" },
  path: { type: "pattern", tester: "" },
  selector: "",
  attribute: "value",
  value: "",
  timeout: 5000
});

const searchElement = <T extends Element>(
  selector: string,
  duration: number,
  timeout: number
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const resolveElement = () => {
      const element = document.querySelector<T>(selector);

      if (element) {
        resolve(element);
      }
    };

    resolveElement();

    const interval = setInterval(resolveElement, duration);

    setTimeout(() => {
      clearInterval(interval);
      reject();
    }, timeout);
  });
};

export const AutofillResult = {
  SUCCEEDED: 0,
  HOST_MISMATCH: 1,
  PATH_MISMATCH: 2,
  ELEMENT_SEARCH_TIMED_OUT: 3
} as const;

export type AutofillResult =
  (typeof AutofillResult)[keyof typeof AutofillResult];

export type AutofillResultObject = {
  result: AutofillResult;
  message: string;
};

const autofill = async (
  { host, path, selector, attribute, value, timeout }: AutofillData,
  url: URL
): Promise<AutofillResultObject> => {
  if (!testURL(host, url.host)) {
    return {
      result: AutofillResult.HOST_MISMATCH,
      message: `'${host.tester}' did not match '${url.host}'.`
    };
  }

  if (!testURL(path, url.pathname)) {
    return {
      result: AutofillResult.PATH_MISMATCH,
      message: `'${path.tester}' did not match '${url.pathname}'.`
    };
  }

  let element: Element;

  try {
    element = await searchElement(selector, 50, timeout);
  } catch {
    return {
      result: AutofillResult.ELEMENT_SEARCH_TIMED_OUT,
      message: `'${selector}' element search timed out.`
    };
  }

  element.setAttribute(attribute, value);

  const events = [
    new FocusEvent("focus"),
    new InputEvent("input"),
    new Event("change"),
    new FocusEvent("blur")
  ];

  for (const event of events) {
    element.dispatchEvent(event);
  }

  return {
    result: AutofillResult.SUCCEEDED,
    message: "Autofill succeeded."
  };
};

export default autofill;
