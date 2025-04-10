import {Settings} from "@/app/settings.ts";

export function generateVendorRegex(settings: Settings): string {
  const terms = [
    ...itemProperty(settings.vendor.itemProperty),
    itemType(settings.vendor.itemType),
    itemLevel(settings.vendor.itemLevel),
    characterLevel(settings.vendor.characterLevel),
    resistances(settings.vendor.resistances),
    movement(settings.vendor.movementSpeed),
    ...itemMods(settings.vendor.itemMods),
    settings.vendor.resultSettings.customText || null,
    itemClass(settings.vendor.itemClass),
  ].filter((e) => e !== null && e !== "")

  return terms.length > 0 ? `"${terms.join("|")}"` : "";
}


function itemProperty(settings: Settings["vendor"]["itemProperty"]): (string | null)[] {
  return [
    settings.quality ? "質: \\+" : null,
    settings.sockets ? "槽: S" : null,
  ].filter((e) => e !== null)
}

function itemType(settings: Settings["vendor"]["itemType"]): string | null {
  const types = [
    settings.rare ? "稀" : null,
    settings.magic ? "魔" : null,
    settings.normal ? "普" : null,
  ].filter((e) => e !== null);

  if (types.length === 0 || types.length === 3) return null;
  if (types.length > 1) return `度: (${types.join("|")})`
  return `度: ${types.join("|")}`;
}

function resistances(settings: Settings["vendor"]["resistances"]): string | null {
  const res = [
    settings.fire ? "焰" : null,
    settings.cold ? "冷" : null,
    settings.lightning ? "電" : null,
    settings.chaos ? "沌" : null,
  ].filter((e) => e !== null);

  if (res.length === 0) return null;
  if (res.length === 4) return `抗性`;
  if (res.length > 1) return `(${res.join("|")})抗`;

  return `${res.join("|")}抗`

}

function movement(settings: Settings["vendor"]["movementSpeed"]): string | null {
  const move0 = [
    settings.move30 ? "30" : null,
    settings.move20 ? "20" : null,
    settings.move10 ? "10" : null,
  ].filter((e) => e !== null)
  const move5 = [
    settings.move25 ? "25" : null,
    settings.move15 ? "15" : null,
  ].filter((e) => e !== null)

  const numOfSelected = move0.length + move5.length;
  if (numOfSelected === 0) return null;
  if (numOfSelected === 1) return `${[move0, move5].join("")}% 移`;
  if (numOfSelected === 5) return `\\d+% 移`;

  const zeros = move0.length > 1 ?
    `[${move0.map((e) => e[0]).join("")}]0`
    : move0.join("|");
  const fives = move5.length > 1 ?
    `[${move5.map((e) => e[0]).join("")}]5`
    : move5.join("|");
  return `(${[zeros, fives].filter((e) => e !== null && e !== "").join("|")})% 移`;
}

function itemMods(settings: Settings["vendor"]["itemMods"]): (string | null)[] {
  return [
    settings.physical ? "理傷" : null,
    settings.elemental ? "[電冷焰]+傷" : null,
    settings.skillLevel ? "^所|^全" : null,
    settings.spirit ? "精魂" : null,
    settings.rarity ? "品稀" : null,
  ].filter((e) => e !== null)
}

function itemClass(settings: Settings["vendor"]["itemClass"]): string | null {
  const itemClasses = [
    settings.amulets ? "項" : null,
    settings.rings ? "戒" : null,
    settings.belts ? "帶" : null,
    settings.daggers ? "da" : null,
    settings.wands ? "法杖" : null,
    settings.oneHandMaces ? "單" : null,
    settings.sceptres ? "權" : null,
    settings.bows ? "弓" : null,
    settings.staves ? "長" : null,
    settings.twoHandMaces ? "雙" : null,
    settings.quarterstaves ? "細" : null,
    settings.crossbows ? "十" : null,
    settings.gloves ? "套" : null,
    settings.boots ? "鞋" : null,
    settings.bodyArmours ? "胸" : null,
    settings.helmets ? "盔" : null,
    settings.quivers ? "袋" : null,
    settings.foci ? "器" : null,
    settings.shields ? "盾" : null,
  ].filter((e) => e !== null);

  if (itemClasses.length === 0) return null;
  if (itemClasses.length === 1) return `類: ${itemClasses.join("")}`
  return `類: (${itemClasses.join("|")})`;
}

function itemLevel(settings: Settings["vendor"]["itemLevel"]): string | null {
  return createLevelRangeRegex(settings.min, settings.max, "品等級: ");
}

function characterLevel(settings: Settings["vendor"]["characterLevel"]): string | null {
  return createLevelRangeRegex(settings.min, settings.max, "需求:\n等級: ");
}

function createLevelRangeRegex(min: number, max: number, prefix: string): string | null {
  // No filter if both are zero.
  if (min === 0 && max === 0) {
    return null;
  }

  // If a valid maximum is provided but min is greater than max, return null.
  if (max > 0 && min > max) {
    return null;
  }

  // Use an upper bound – for item levels we assume a maximum of 99 if none is provided.
  const effectiveMax = max === 0 ? 99 : max;

  // Simple cases first
  if (min === 0 && effectiveMax === 99) {
    return `${prefix}(\\d{1,2})\\b`;
  }
  
  if (min > 0 && min === effectiveMax) {
    // Exact match
    return `${prefix}(${min})\\b`;
  }
  // Handle specific ranges more efficiently
  const singleDigits = min <= 9 ? rangePattern(min, Math.min(9, effectiveMax)) : "";
  const tens = Math.floor(Math.min(Math.max(min, 10), effectiveMax) / 10);
  const maxTens = Math.floor(effectiveMax / 10);
  
  const patterns = [];
  
  // Add single digit pattern if applicable
  if (singleDigits) {
    patterns.push(singleDigits);
  }
  
  // Handle ranges spanning tens more efficiently
  if (tens <= maxTens) {
    // Different tens groups
    if (tens === maxTens) {
      // Same tens group (e.g., 10-19)
      const minOnes = min > 9 ? min % 10 : 0;
      const maxOnes = effectiveMax % 10;
      patterns.push(`${tens}[${minOnes}-${maxOnes}]`);
    } else {
      // Starting tens group
      if (min <= tens * 10 + 9 && min > tens * 10) {
        const minOnes = min % 10;
        patterns.push(`${tens}[${minOnes}-9]`);
      } else if (min <= tens * 10) {
        patterns.push(`${tens}\\d`);
      }
      
      // Full tens groups in the middle
      if (maxTens > tens + 1) {
        patterns.push(`[${tens + 1}-${maxTens - 1}]\\d`);
      }
      
      // Final tens group
      if (effectiveMax % 10 > 0) {
        patterns.push(`${maxTens}[0-${effectiveMax % 10}]`);
      } else {
        patterns.push(`${maxTens}0`);
      }
    }
  }

  return `${prefix}(${patterns.join("|")})\\b`;
}

// Helper function to create regex pattern for a range of numbers
function rangePattern(start: number, end: number): string {
  if (start > end) return "";
  if (start === end) return start.toString();
  if (start === 0 && end === 9) return "\\d";
  return `[${start}-${end}]`;
}
