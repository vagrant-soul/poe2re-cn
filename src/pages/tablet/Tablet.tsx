import {Header} from "@/components/header/Header.tsx";
import {Result} from "@/components/result/Result.tsx";
import {defaultSettings, Settings} from "@/app/settings.ts";
import {useEffect, useState} from "react";
import {loadSettings, saveSettings, selectedProfile} from "@/lib/localStorage.ts";
import {SelectList, SelectOption} from "@/components/selectList/SelectList.tsx";
import {tabletRegex} from "@/generated/Tablet.Gen.ts";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {generateTabletResult} from "@/pages/tablet/TabletResult.ts";


export function Tablet() {
  const globalSettings = loadSettings(selectedProfile())
  const [settings, setSettings] = useState<Settings["tablet"]>(globalSettings.tablet);
  const [result, setResult] = useState("");

  const prefixes: SelectOption[] = tabletRegex
    .filter((e) => e.affix === "PREFIX")
    .map((mod) => ({
      name: mod.name,
      isSelected: false,
      value: null,
      ranges: mod.ranges,
      regex: mod.regex,
    }));

  const suffixes: SelectOption[] = tabletRegex
    .filter((e) => e.affix === "SUFFIX")
    .map((mod) => ({
      name: mod.name,
      isSelected: false,
      value: null,
      ranges: mod.ranges,
      regex: mod.regex,
    }));

  useEffect(() => {
    const settingsResult = {...globalSettings, tablet: {...settings}};
    saveSettings(settingsResult);
    setResult(generateTabletResult(settingsResult));
  }, [settings]);

  return (
    <>
      <Header name="碑牌正则生成器"></Header>
      <div className="flex bg-muted grow-0 flex-1 flex-col gap-2 ">
        <Result
          result={result}
          reset={() => setSettings(defaultSettings.tablet)}
          customText={settings.resultSettings.customText}
          autoCopy={settings.resultSettings.autoCopy}
          setCustomText={(text) => {
            setSettings({
              ...settings, resultSettings: {...settings.resultSettings, customText: text,}
            })
          }}
          setAutoCopy={(enable) => {
            setSettings({
              ...settings, resultSettings: {...settings.resultSettings, autoCopy: enable,}
            })
          }}
        />
      </div>
      <div className="p-4">
        <RadioGroup value={settings.matchType} onValueChange={(v) => {
          setSettings({
            ...settings, matchType: v,
          })
        }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any"/>
            <Label htmlFor="any"><span className="text-lg cursor-pointer text-green-400">匹配 <span
              className="font-semibold">任何</span> 前缀或后缀</span></Label>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="both" id="both"/>
            <Label htmlFor="both"><span className="text-lg cursor-pointer text-green-400">仅当前缀与后缀 <span
              className="font-semibold">全需</span> 匹配时</span></Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-10">
        <SelectList
          id="prefix-modifiers"
          options={prefixes}
          selected={settings.modifier.prefixes}
          setSelected={(modifiers) => {
            setSettings({
              ...settings,
              modifier: {...settings.modifier, prefixes: modifiers}
            })
          }}
        />
        <SelectList
          id="suffix-modifiers"
          options={suffixes}
          selected={settings.modifier.suffixes}
          setSelected={(modifiers) => {
            setSettings({
              ...settings,
              modifier: {...settings.modifier, suffixes: modifiers}
            })
          }}
        />
      </div>
    </>
  );
}