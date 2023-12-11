import { minimatch } from "minimatch";
import { z } from "zod";
import ExhaustiveError from "../utils/exhaustive-error";

export const URLTesterType = z.union([
  z.literal("raw"),
  z.literal("regex"),
  z.literal("pattern")
]);

export type URLTesterType = z.infer<typeof URLTesterType>;

export const URLTester = z.object({
  type: URLTesterType,
  tester: z.string()
});

export type URLTester = z.infer<typeof URLTester>;

const testURL = (urlTester: URLTester, target: string): boolean => {
  switch (urlTester.type) {
    case "raw":
      return target === urlTester.tester;
    case "regex":
      return new RegExp(urlTester.tester).test(target);
    case "pattern":
      return minimatch(target, urlTester.tester, { dot: true });
    default:
      throw new ExhaustiveError(urlTester.type);
  }
};

export default testURL;
