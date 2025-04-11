import vendorIcon from "@/img/whetstone_inventory_icon.png";
import waystoneIcon from "@/img/waystone_inventory_icon.png";
import tabletIcon from "@/img/precursortablet_inventory_icon.png";
import relicIcon from "@/img/relic_inventory_icon.png";
import bannerImg from "@/img/dashang.png";

import {
  Code,
  Github,
  Bug,
  Coffee,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarImage,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "商店",
    url: "/vendor",
    icon: vendorIcon,
  },
  {
    title: "Waystones",
    url: "/waystone",
    icon: waystoneIcon,
  },
  {
    title: "Tablets",
    url: "/tablet",
    icon: tabletIcon,
  },
  {
    title: "Relics",
    url: "/relic",
    icon: relicIcon,
  },
]

export function Menu() {
  const pathname = window.location.pathname;
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>类别</SidebarGroupLabel>
          </SidebarMenu>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <img src={item.icon} alt={item.title} width="32" height="32"/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>改进</SidebarGroupLabel>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="https://pd.qq.com/s/115ng3af4" target="_blank">
                  <Github/>
                  <span>功能建议</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="https://wqonline.com" target="_blank">
                  <Code/>
                  <span>攻略网站</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>        
        <SidebarGroup>          
          <SidebarGroupContent>
            <SidebarImage 
              src={bannerImg}
              alt="活动图片"
              className="p-2 hover:opacity-90 transition-opacity"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>          
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="https://buymeacoffee.com/veiset" target="_blank">
                  <Coffee />
                  <span>赞助原作者</span>
                </a>                         
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}