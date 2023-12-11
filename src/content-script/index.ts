import { SETTINGS_STORAGE_KEY, Settings } from "../utils/storage";
import autofill from "./autofill";
import DebugLogger from "./debug-logger";

document.addEventListener("DOMContentLoaded", async () => {
  const { [SETTINGS_STORAGE_KEY]: storageData } = await chrome.storage.sync.get(
    SETTINGS_STORAGE_KEY
  );
  const parseResult = Settings.safeParse(storageData);

  if (!parseResult.success) {
    return;
  }

  const { autofillDataList, debugMode } = parseResult.data;

  const url = new URL(location.href);

  const logger = new DebugLogger(autofillDataList);

  for (const [index, autofillData] of autofillDataList.entries()) {
    autofill(autofillData, url).then((result) => {
      logger.setResult(index, result);
      logger.log(debugMode);
    });
  }

  logger.log(debugMode);
});
