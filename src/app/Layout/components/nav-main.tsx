"use client"

import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { Fragment, useState } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[]
}) {
  const [open, setOpen] = useState(false)
  const [itemOpen, setItemOpen] = useState<string[]>([])

  const handleItemOpen = (item: string) => {
    setOpen(()=>!open)
    if (open) {
      setItemOpen((prev) => [...prev, item])
      return
    }
    else if(itemOpen.includes(item)){
      setItemOpen((prev) => prev.filter((item) => item !== item))
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sistema Comisiones</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  <Link to={item.url}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                  </Link>
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Fragment>
                          <div className="flex items-center justify-between gap-2">
                            <Link to={subItem.url}>
                              <span className="text-sm">
                                {subItem.title}
                              </span>
                            </Link>
                            {subItem.items && (
                              itemOpen.includes(subItem.title) ?
                                <ChevronDown className="p-1 h-6 w-6 cursor-pointer hover:text-blue-900 hover:rounded-full hover:bg-blue-50" onClick={() => { handleItemOpen(subItem.title) }} />
                                :
                                <ChevronRight className="p-1 h-6 w-6 cursor-pointer hover:text-blue-900 hover:rounded-full hover:bg-blue-50" onClick={() => { handleItemOpen(subItem.title) }} />
                            )}
                          </div>
                          {itemOpen.includes(subItem.title) && subItem.items?.map((subSubItem) => (
                            <SidebarMenuSubItem key={subSubItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={subSubItem.url}>
                                  <span className="text-sm">- {subSubItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </Fragment>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
