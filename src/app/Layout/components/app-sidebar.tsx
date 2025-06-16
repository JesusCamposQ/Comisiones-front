import {
  Building,
  CircleDollarSign,
  BadgeDollarSign,
  Target,
} from "lucide-react"

import { NavMain } from "@/app/Layout/components/nav-main"
import { NavUser } from "@/app/Layout/components/nav-user"
import { TeamSwitcher } from "@/app/Layout/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: localStorage.getItem('username') || '',
  },
  teams: [
    {
      name: "Sistema Comisiones",
      logo: BadgeDollarSign,
      plan: "Comisiones",
    },
  ],
  navMain: [
    {
      title: "Comisiones",
      url: "/ventas",
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: "Por Ventas",
          url: "#",
          items: [
            {
              title: "Comisiones Sucursal",
              url: "/ventas",
            },
          ],
        },
        {
          title: "Registro",
          url: "#",
          items: [
            {
              title: "Recetas sin Comisión",
              url: "/comision/registro/receta",
            },
            {
              title: "Productos sin Comisión",
              url: "/comision/registro/producto",
            },
          ],
        },
        {
          title: "Gestión Comisión",
          url: "#",
          items: [
            {
              title: "Ver Combinaciones",
              url: "/comision/gestion/receta",
            },
            {
              title: "Cargar Combinaciones",
              url: "/cargar/combinaciones",
            },
            {
              title: "Actualizar Combinaciones",
              url: "/actualizar/combinaciones",
            },
            {
              title: "Cargar Comision Producto",
              url: "/cargar/comision/producto",
            },
          ],
        },
        {
          title: "Por Producto",
          url: "#",
          items: [
            {
              title: "Monturas",
              url: "/comision/gestion/producto/montura",
            },
            {
              title: "Monturas sin Comisión",
              url: "/comision/gestion/producto/sin-comision/montura",
            },
            {
              title: "Gafas",
              url: "/comision/gestion/producto/gafas",
            },
            {
              title: "Gafas sin Comisión",
              url: "/comision/gestion/producto/sin-comision/gafas",
            },
            {
              title: "Lentes Contacto",
              url: "/comision/gestion/producto/lente-contacto",
            },
            {
              title: "Lentes sin Comisión",
              url: "/comision/gestion/producto/sin-comision/lente-contacto",
            },
          ],
        },
        {
          title: "Servicios",
          url: "#",
          items: [
            {
              title: "Servicios",
              url: "/comision/gestion/servicio",
            },
            {
              title: "Servicios sin Comisión",
              url: "/comision/gestion/servicio/sin-comision",
            },
          ],
        },
      ],
    },
    // {
    //   title: "Productos",
    //   url: "#",
    //   icon: ShoppingBag,
    //   items: [],
    // },
    {
      title: "Metas",
      url: "/metas",
      icon: Target,
      items: [
        {
          title: "Ver Metas",
          url: "/metas",
        },
        {
          title: "Registrar Metas",
          url: "/metas/registro",
        },
      ],
    },
    {
      title: "Organización",
      url: "/usuarios",
      icon: Building,
      items: [
        {
          title: "Usuarios",
          url: "/usuarios",
        },
      ],
    },
  ]  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
