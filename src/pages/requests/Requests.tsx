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
      请使用 <a href="https://pd.qq.com/s/115ng3af4" className="flex font-semibold text-green-400 px-2">QQ频道</a> 提出希望增加的功能或反馈Bug。
      </p>     
      <p className="flex justify-center items-center">
        感谢：<span className="font-semibold px-2">编年史</span>提供数据支持。
      </p> 
      <p className="flex items-center justify-center">       
      感谢大家<span className="font-semibold text-green-400 pl-2 pr-2">打赏</span>支持，助我早日拥有国内服务器
      </p>

      <h2 className="flex items-center justify-center lg:text-2xl pt-10">当前功能：</h2>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/vendor" className="flex items-center">
            <img src={vendorIcon} alt="vendor regex" width="32" height="32"/>
            <span className="pl-2">商店正则</span>
          </a>
        </div>
      </p>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/waystone" className="flex items-center">
            <img src={waystoneIcon} alt="waystone regex" width="32" height="32"/>
            <span className="pl-2">地图正则</span>
          </a>
        </div>
      </p>
      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/tablet" className="flex items-center">
            <img src={tabletIcon} alt="tablet regex" width="32" height="32"/>
            <span className="pl-2">碑牌正则</span>
          </a>
        </div>
      </p>

      <p className="flex items-center justify-center pt-5">
        <div>
          <a href="/relic" className="flex items-center">
            <img src={relicIcon} alt="relic regex" width="32" height="32"/>
            <span className="pl-2">圣物正则</span>
          </a>
        </div>
      </p>
      <div className="pl-4">
        <h2 className="text-lg font-medium pt-10 pb-2">近期更新</h2>
        <div className="space-y-4">
        <div>
            <span className="font-semibold">2025-4-15</span> 
            <span className="pl-2">新增碑牌词缀正则（部分待验证）</span>
          </div>
          <div>
            <span className="font-semibold">2025-4-14</span> 
            <span className="pl-2">完成正则的中文化，部分公式参考编年史词缀表</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Requests;