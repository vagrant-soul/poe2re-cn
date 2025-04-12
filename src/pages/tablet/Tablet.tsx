import {Header} from "@/components/header/Header.tsx";
import {Result} from "@/components/result/Result.tsx";
import {defaultSettings, Settings} from "@/app/settings.ts";
import {useEffect, useState} from "react";
import {loadSettings, saveSettings, selectedProfile} from "@/lib/localStorage.ts";
import {generateTabletRegex} from "@/pages/tablet/TabletResult.ts";
import {Input} from "@/components/ui/input.tsx";
import {Checked} from "@/components/checked/Checked.tsx";

export function Tablet(){
  const globalSettings = loadSettings(selectedProfile())
  const [settings, setSettings] = useState<Settings["tablet"]>(globalSettings.tablet);
  const [result, setResult] = useState("");

  useEffect(() => {
    const settingsResult = {...globalSettings, tablet: {...settings}};
    saveSettings(settingsResult);
    setResult(generateTabletRegex(settingsResult));
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
      <div className="flex grow bg-muted/30 flex-1 flex-col gap-2 p-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">碑牌稀有度</p>
            <Checked id="tabletrarity-magic" text="魔法" checked={settings.rarity.magic}
                     onChange={(b) => setSettings({
                       ...settings, rarity: {...settings.rarity, magic: b}
                     })}
            />
            <Checked id="tabletrarity-normal" text="普通" checked={settings.rarity.normal}
                     onChange={(b) => setSettings({
                       ...settings, rarity: {...settings.rarity, normal: b}
                     })}
            />
          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">碑牌类型</p>
            <Checked id="tablettype-breach" text="裂痕" checked={settings.type.breach}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, breach: b}
                     })}
            />
            <Checked id="tablettype-delirium" text="譫妄" checked={settings.type.delirium}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, delirium: b}
                     })}
            />
            <Checked id="tablettype-precursor" text="先行者" checked={settings.type.irradiated}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, irradiated: b}
                     })}
            />
            <Checked id="tablettype-breach" text="探險" checked={settings.type.expedition}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, expedition: b}
                     })}
            />
            <Checked id="tablettype-breach" text="祭祀" checked={settings.type.ritual}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, ritual: b}
                     })}
            />
            <Checked id="tablettype-breach" text="總督" checked={settings.type.overseer}
                     onChange={(b) => setSettings({
                       ...settings, type: {...settings.type, overseer: b}
                     })}
            />
          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">修饰器</p>
            
            <Checked id="tabletmodifier-affectedmaps" text="范围内受影响地图的最小值1#" checked={settings.modifier.affectedMaps}
                     onChange={(b) => setSettings({
                       ...settings, modifier: {...settings.modifier, affectedMaps: b}
                     })}
            />
            <Input type="number" placeholder="Min affected maps in range" className="pb-2 mb-2 w-40"
                   value={settings.modifier.numAffectedMaps}
                   min="1"
                   max="10"
                   onChange={(b) =>
                     setSettings({
                       ...settings, modifier: {...settings.modifier, numAffectedMaps: Number(b.target.value) || 0}
                     })}
            />
          </div>
        </div>
      </div>
    </>
  )
}
