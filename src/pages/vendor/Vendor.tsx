import {Header} from "@/components/header/Header.tsx";
import {Result} from "@/components/result/Result.tsx";
import {Checked} from "@/components/checked/Checked.tsx";
import {loadSettings, saveSettings, selectedProfile} from "@/lib/localStorage.ts";
import {useEffect, useState} from "react";
import {defaultSettings, Settings} from "@/app/settings.ts";
import {generateVendorRegex} from "@/pages/vendor/VendorResult.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

export function Vendor() {

  const globalSettings = loadSettings(selectedProfile())
  const [settings, setSettings] = useState<Settings["vendor"]>(globalSettings.vendor);
  const [result, setResult] = useState("");

  useEffect(() => {
    const settingsResult = {...globalSettings, vendor: {...settings}};
    saveSettings(settingsResult);
    setResult(generateVendorRegex(settingsResult));
  }, [settings]);

  return (
    <>
      <Header name="Vendor Regex"></Header>
      <div className="flex bg-muted grow-0 flex-1 flex-col gap-2 ">
        <Result
          result={result}
          reset={() => setSettings(defaultSettings.vendor)}
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
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">        
          <div> 
              <div className="space-y-2 w-48">
              <p className="text-xs font-medium text-sidebar-foreground/70">匹配模式</p>
              <RadioGroup value={settings.matchType} onValueChange={(v) => {
                setSettings({
                  ...settings, matchType: v,
                })
              }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any"/>
                  <Label htmlFor="any" className="text-sm font-medium">任意匹配</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both"/>
                  <Label htmlFor="both" className="text-sm font-medium">同时匹配</Label>
                </div>
              </RadioGroup>
            </div> 
            <br />        
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">物品屬性</p>
            <Checked id="atr-quality" text="品質" checked={settings.itemProperty.quality}
                     onChange={(b) => setSettings({
                       ...settings, itemProperty: {...settings.itemProperty, quality: b}
                     })}
            />
            <Checked id="atr-socket" text="插槽" checked={settings.itemProperty.sockets}
                     onChange={(b) => setSettings({
                       ...settings, itemProperty: {...settings.itemProperty, sockets: b}
                     })}
            />

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">移動速度</p>
            <Checked id="30ms" text="移動速度 (30%)" checked={settings.movementSpeed.move30}
                     onChange={(b) => setSettings({
                       ...settings, movementSpeed: {...settings.movementSpeed, move30: b}
                     })}
            />
            <Checked id="25ms" text="移動速度 (25%)" checked={settings.movementSpeed.move25}
                     onChange={(b) => setSettings({
                       ...settings, movementSpeed: {...settings.movementSpeed, move25: b}
                     })}
            />
            <Checked id="20ms" text="移動速度 (20%)" checked={settings.movementSpeed.move20}
                     onChange={(b) => setSettings({
                       ...settings, movementSpeed: {...settings.movementSpeed, move20: b}
                     })}
            />
            <Checked id="15ms" text="移動速度 (15%)" checked={settings.movementSpeed.move15}
                     onChange={(b) => setSettings({
                       ...settings, movementSpeed: {...settings.movementSpeed, move15: b}
                     })}
            />
            <Checked id="10ms" text="移動速度 (10%)" checked={settings.movementSpeed.move10}
                     onChange={(b) => setSettings({
                       ...settings, movementSpeed: {...settings.movementSpeed, move10: b}
                     })}
            />
          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">物品詞綴</p>
            <Checked id="mod-phys" text="物理傷害" checked={settings.itemMods.physical}
                     onChange={(b) => setSettings({
                       ...settings, itemMods: {...settings.itemMods, physical: b}
                     })}
            />
            <Checked id="mod-ele" text="元素傷害" checked={settings.itemMods.elemental}
                     onChange={(b) => setSettings({
                       ...settings, itemMods: {...settings.itemMods, elemental: b}
                     })}
            />
            <Checked id="mod-skill" text="+# 技能等級" checked={settings.itemMods.skillLevel}
                     onChange={(b) => setSettings({
                       ...settings, itemMods: {...settings.itemMods, skillLevel: b}
                     })}
            />
            <Checked id="mod-spirit" text="+# 精魂" checked={settings.itemMods.spirit}
                     onChange={(b) => setSettings({
                       ...settings, itemMods: {...settings.itemMods, spirit: b}
                     })}
            />
            <Checked id="mod-rarity" text="增加物品稀有度" checked={settings.itemMods.rarity}
                     onChange={(b) => setSettings({
                       ...settings, itemMods: {...settings.itemMods, rarity: b}
                     })}
            />

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">抗性</p>
            <Checked id="res-fire" text="火焰抗性" checked={settings.resistances.fire}
                     onChange={(b) => setSettings({
                       ...settings, resistances: {...settings.resistances, fire: b}
                     })}
            />
            <Checked id="res-cold" text="冰冷抗性" checked={settings.resistances.cold}
                     onChange={(b) => setSettings({
                       ...settings, resistances: {...settings.resistances, cold: b}
                     })}
            />
            <Checked id="res-lightning" text="閃電抗性" checked={settings.resistances.lightning}
                     onChange={(b) => setSettings({
                       ...settings, resistances: {...settings.resistances, lightning: b}
                     })}
            />
            <Checked id="res-chaos" text="混沌抗性" checked={settings.resistances.chaos}
                     onChange={(b) => setSettings({
                       ...settings, resistances: {...settings.resistances, chaos: b}
                     })}
            />
          </div>

          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2">物品等級</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs pb-1">最低等級:</p>
                <Input type="number" min="0" max="100" placeholder="Min level" className="pb-1 mb-2 w-full"
                       value={settings.itemLevel?.min ?? 0}
                       onChange={(b) => {
                         const value = Number(b.target.value);
                         const max = settings.itemLevel?.max || 100;
                         if (value <= max) {
                           setSettings({
                             ...settings, 
                             itemLevel: {...(settings.itemLevel || { min: 0, max: 100 }), min: Math.max(0, value)}
                           })
                         }
                       }}
                />
              </div>
              <div>
                <p className="text-xs pb-1">最高等級:</p>
                <Input type="number" min="0" max="100" placeholder="Max level" className="pb-1 mb-2 w-full"
                       value={settings.itemLevel?.max ?? 0}
                       onChange={(b) => {
                         const value = Number(b.target.value);
                         const min = settings.itemLevel?.min ?? 0;
                         if (value >= min) {
                           setSettings({
                             ...settings, 
                             itemLevel: {...(settings.itemLevel || { min: 0, max: 100 }), max: Math.min(100, value)}
                           })
                         }
                       }}
                />
              </div>
            </div>

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">需求等級</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs pb-1">最低等級:</p>
                <Input type="number" min="0" max="100" placeholder="Min level" className="pb-1 mb-2 w-full"
                       value={settings.characterLevel?.min ?? 0}
                       onChange={(b) => {
                         const value = Number(b.target.value);
                         const max = settings.characterLevel?.max || 100;
                         if (value <= max) {
                           setSettings({
                             ...settings, 
                             characterLevel: {...(settings.characterLevel || { min: 0, max: 100 }), min: Math.max(0, value)}
                           })
                         }
                       }}
                />
              </div>
              <div>
                <p className="text-xs pb-1">最高等級:</p>
                <Input type="number" min="0" max="100" placeholder="Max level" className="pb-1 mb-2 w-full"
                       value={settings.characterLevel?.max ?? 0}
                       onChange={(b) => {
                         const value = Number(b.target.value);
                         const min = settings.characterLevel?.min ?? 0;
                         if (value >= min) {
                           setSettings({
                             ...settings, 
                             characterLevel: {...(settings.characterLevel || { min: 0, max: 100 }), max: Math.min(100, value)}
                           })
                         }
                       }}
                />
              </div>
            </div>

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">物品稀有度</p>
            <Checked id="itemtype-rare" text="稀有"
                     checked={settings.itemType.rare}
                     onChange={(b) => setSettings({
                       ...settings, itemType: {...settings.itemType, rare: b}
                     })}
            />
            <Checked id="itemtype-magic" text="魔法" checked={settings.itemType.magic}
                     onChange={(b) => setSettings({
                       ...settings, itemType: {...settings.itemType, magic: b}
                     })}
            />
            <Checked id="itemtype-normal" text="普通" checked={settings.itemType.normal}
                     onChange={(b) => setSettings({
                       ...settings, itemType: {...settings.itemType, normal: b}
                     })}
            />

          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-2">物品類型-飾品</p>
            <Checked id="type-amulet" text="項鍊"
                     checked={settings.itemClass.amulets}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, amulets: b}
                     })}
            />
            <Checked id="type-rings" text="戒指"
                     checked={settings.itemClass.rings}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, rings: b}
                     })}
            />
            <Checked id="type-belts" text="腰帶"
                     checked={settings.itemClass.belts}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, belts: b}
                     })}
            />

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">物品類型-單手武器</p>
            {/*<Checked id="type-daggers" text="Daggers"*/}
            {/*         checked={settings.itemClass.daggers}*/}
            {/*         onChange={(b) => setSettings({*/}
            {/*           ...settings, itemClass: {...settings.itemClass, daggers: b}*/}
            {/*         })}*/}
            {/*/>*/}
            <Checked id="type-wands" text="法杖"
                     checked={settings.itemClass.wands}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, wands: b}
                     })}
            />
            <Checked id="type-1h-maces" text="單手錘"
                     checked={settings.itemClass.oneHandMaces}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, oneHandMaces: b}
                     })}
            />
            <Checked id="type-sceptres" text="權杖"
                     checked={settings.itemClass.sceptres}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, sceptres: b}
                     })}
            />
            {/*<Checked id="type-claws" text="Claws"/>*/}
            {/*<Checked id="type-1h-sword" text="One Hand Swords"/>*/}
            {/*<Checked id="type-1h-axes" text="One Hand Axes"/>*/}
            {/*<Checked id="type-spears" text="Spears"/>*/}
            {/*<Checked id="type-flails" text="Flails"/>*/}

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">物品類型-雙手武器</p>
            <Checked id="type-bows" text="弓"
                     checked={settings.itemClass.bows}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, bows: b}
                     })}

            />
            <Checked id="type-staves" text="長杖"
                     checked={settings.itemClass.staves}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, staves: b}
                     })}

            />
            <Checked id="type-2h-maces" text="雙手錘"
                     checked={settings.itemClass.twoHandMaces}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, twoHandMaces: b}
                     })}

            />
            <Checked id="type-q-staves" text="細杖"
                     checked={settings.itemClass.quarterstaves}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, quarterstaves: b}
                     })}
            />
            <Checked id="type-crossbow" text="十字弩"
                     checked={settings.itemClass.crossbows}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, crossbows: b}
                     })}
            />
            {/*<Checked id="type-2h-swords" text="Two Hand Swords"/>*/}
            {/*<Checked id="type-2h-axes" text="Two Hand Axes"/>*/}
            {/*<Checked id="type-traps" text="Traps"/>*/}


            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">物品類型-護甲</p>
            <Checked id="type-gloves" text="手套"
                     checked={settings.itemClass.gloves}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, gloves: b}
                     })}

            />
            <Checked id="type-boots" text="鞋子"
                     checked={settings.itemClass.boots}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, boots: b}
                     })}

            />
            <Checked id="type-body" text="胸甲"
                     checked={settings.itemClass.bodyArmours}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, bodyArmours: b}
                     })}

            />
            <Checked id="type-helm" text="頭盔"
                     checked={settings.itemClass.helmets}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, helmets: b}
                     })}
            />

            <p className="text-xs font-medium text-sidebar-foreground/70 pb-2 pt-4">物品類型-副手</p>
            <Checked id="type-quiver" text="箭袋"
                     checked={settings.itemClass.quivers}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, quivers: b}
                     })}
            />
            <Checked id="type-foci" text="法器"
                     checked={settings.itemClass.foci}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, foci: b}
                     })}
            />
            <Checked id="type-shields" text="盾"
                     checked={settings.itemClass.shields}
                     onChange={(b) => setSettings({
                       ...settings, itemClass: {...settings.itemClass, shields: b}
                     })}
            />
          </div>
        </div>
      </div>
    </>
  )
}
