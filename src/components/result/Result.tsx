import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
  Eraser,
  Copy,
} from "lucide-react"
import {Accordion, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {loadWebSettings, saveWebSettings} from "@/lib/localStorage.ts";
import {cx} from "class-variance-authority";

export interface ResultProps {
  result: string
  maxLength?: number
  reset: () => void
  customText: string
  setCustomText: (text: string) => void
  autoCopy: boolean
  setAutoCopy: (enable: boolean) => void
}

export function Result(props: ResultProps) {
  const {result, maxLength, reset, customText, setCustomText, autoCopy, setAutoCopy} = props;

  const webSettings = loadWebSettings();
  const currentLength = result.length
  const [showOptions, setShowOptions] = useState(webSettings.optionsOpen);
  const [copied, setCopied] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (autoCopy) {
      navigator.clipboard.writeText(result);
      setCopied(result);
    }
  }, [result, autoCopy]);

  useEffect(() => {
    saveWebSettings({...webSettings, optionsOpen: showOptions})
  }, [showOptions]);

  console.log(copied === result);

  return (
    <div>
      <div className="flex">
        <div className="flex-1 font-mono p-4 pt-6">
          <div >
            <p className={cx(
              "text-2xl min-h-12",
              copied === result && "text-green-400"
            )}>
              {result}
            </p>
            <p className={cx("text-sm mt-3 text-gray-400", currentLength > 50 && "text-red-400")}>
              长度: {currentLength} / {maxLength ?? 50}
              {currentLength > 50 && " - POE 的长度限制为 50 个字符，当前正则表达式无法复制。"}
            </p>
          </div>
        </div>
        <div className="flex-none p-4 pb-0">
          <div>
            <Button className="m-1 round bg-green-400 hover:bg-green-600" onClick={() => {
              navigator.clipboard.writeText(result);
              setCopied(result);
            }}>
              <Copy/> 复制
            </Button>
            <Button className="m-1 bg-red-300 hover:bg-red-400" onClick={reset}>
              <Eraser/> 重置
            </Button>
          </div>
          <div className="flex items-center space-x-2 pl-1 pb-4 ">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="mb-0 pb-0" onClick={_ => setShowOptions(!showOptions)}>
                  {showOptions ? "隐藏" : "显示"} 选项
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className={showOptions ? "p-2 bg-slate-700 flex items-center gap-2 px-4" : "hidden"}>
        <div className="pr-4">选项</div>
        <Separator orientation="vertical" className="mr-2 h-4"/>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms"
                    checked={autoCopy}
                    onCheckedChange={value => setAutoCopy(value as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            自动复制
          </label>
        </div>
        <Separator orientation="vertical" className="mr-2 h-4"/>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text"
                 placeholder="自定义文本"
                 className="font-mono"
                 value={customText}
                 onChange={(e) => setCustomText(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}