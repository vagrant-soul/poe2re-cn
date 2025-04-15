import {Settings} from "@/app/settings.ts";
import {selectedOptionRegex} from "@/lib/SelectedOptionRegex.ts";

export function generateTabletResult(settings: Settings): string {

  const modifiers = [
    settings.tablet.modifier.prefixes
      .filter((e) => e.isSelected)
      .map((e) => selectedOptionRegex(e, false, false))
      .join("|"),
    settings.tablet.modifier.suffixes
      .filter((e) => e.isSelected)
      .map((e) => selectedOptionRegex(e, false, false))
      .join("|"),
  ].filter((e) => e !== null && e !== "");

  if (modifiers.length === 0) {
    return "";
  }
  if (settings.tablet.matchType === "any") {
    return `"${modifiers.join("|")}"`;
  } else {
    return modifiers.map((e) => `"${e}"`).join(" ");
  }
}
