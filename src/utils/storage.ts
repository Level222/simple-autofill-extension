import { z } from "zod";
import { AutofillData } from "../content-script/autofill";

export const SETTINGS_STORAGE_KEY = "settings";

export const AutofillDataList = z.array(AutofillData);

export type AutofillDataList = z.infer<typeof AutofillDataList>;

export const DebugMode = z.union([
  z.literal("none"),
  z.literal("modeless"),
  z.literal("console"),
  z.literal("modal")
]);

export type DebugMode = z.infer<typeof DebugMode>;

export const Settings = z.object({
  autofillDataList: AutofillDataList,
  debugMode: DebugMode
});

export type Settings = z.infer<typeof Settings>;

export const createInitialSettings = (): Settings => ({
  autofillDataList: [],
  debugMode: "none"
});
