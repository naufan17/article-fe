import Link from "next/link"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive} className="active:bg-blue-400 active:text-white hover:text-white hover:bg-blue-400 data-[active=true]:bg-blue-400 data-[active=true]:text-white">
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton> 
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
