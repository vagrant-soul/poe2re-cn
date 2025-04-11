import vendorIcon from "@/img/whetstone_inventory_icon.png";
import waystoneIcon from "@/img/waystone_inventory_icon.png";
import tabletIcon from "@/img/precursortablet_inventory_icon.png";
import relicIcon from "@/img/relic_inventory_icon.png";

const Requests = () => {
  return (
    <div>
      <h1 className="flex items-center justify-center lg:text-3xl pt-10">流放之路2正则工具</h1>
      <p className="flex items-center justify-center pt-10">
      目前处于早期开发阶段。新功能将随着游戏的探索而添加。
      </p>
      <p className="flex items-center justify-center">
      请使用QQ频道提出您希望增加的功能或发现的问题。
      </p>
      <p className="flex items-center justify-center">
      当前测试阶段，完成商店部分的正则表达式生成
      </p>
      <p className="flex items-center justify-center">
      服务器用的国外的，速度有点慢，希望大家打赏能支持一下，早点弄个国内的服务器
      </p>

      <h2 className="flex items-center justify-center lg:text-2xl pt-10">当前功能：</h2>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/vendor" className="flex">
            <img src={vendorIcon} alt="vendor regex" width="32" height="32"/>
            <span>商店正则</span>
          </a>
        </div>
      </p>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/waystone" className="flex">
            <img src={waystoneIcon} alt="waystone regex" width="32" height="32"/>
            <span>waystone</span>
          </a>
        </div>
      </p>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/tablet" className="flex">
            <img src={tabletIcon} alt="tablet regex" width="32" height="32"/>
            <span>Tablet Regex</span>
          </a>
        </div>
      </p>

      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/relic" className="flex">
            <img src={relicIcon} alt="relic regex" width="22" height="22"/>
            <span>Relic Regex</span>
          </a>
        </div>
      </p>

    </div>
  )
}

export default Requests;