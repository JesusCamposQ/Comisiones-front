import {

  BadgeDollarSign,

  Box,
  FileBox,
  LineChart,
  UserCog,
  BarChart,
} from "lucide-react";

import { NavMain } from "@/app/Layout/components/nav-main";
import { NavUser } from "@/app/Layout/components/nav-user";
import { TeamSwitcher } from "@/app/Layout/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: localStorage.getItem("username") || "",
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
      title: "Ventas",
      url: "/ventas",
      icon: BarChart,
      isActive: true,

      items: [
        {
          title: "Comisiones por Venta",
          url: "/ventas",
        },
        {
          title: "Ventas inválidas",
          url: "/ventas/invalidas",
        },
      ],
    },
    {
      title: "Combinaciones",
      url: "#",
      icon: FileBox,
      items: [
        {
          title: "Ver Combinaciones",
          url: "/comision/gestion/receta",
        },
        {
          title: "Recetas sin Comisión",
          url: "/comision/registro/receta",
        },
        {
          title: "Cargar Combinaciones",
          url: "/cargar/combinaciones",
        },
        /* {
              title: "Actualizar Combinaciones",
              url: "/actualizar/combinaciones",
            },*/
      ],
    },
    {
      title: "Producto",
      url: "#",
      icon: Box,
      items: [
        {
          title: "listar Comision por rango",
          url: "listar/rango/comision/producto",
        },
        {
          title: "Cargar Comision Producto",
          url: "/cargar/comision/producto",
        },
        {
          title: "listar Monturas",
          url: "/comision/gestion/producto/montura",
        },
        {
          title: "Monturas sin Comisión",
          url: "/comision/gestion/producto/sin-comision/montura",
        },
        {
          title: "listar Gafas",
          url: "/comision/gestion/producto/gafas",
        },
        {
          title: "Gafas sin Comisión",
          url: "/comision/gestion/producto/sin-comision/gafas",
        },
        {
          title: "listar lentes Contacto",
          url: "/comision/gestion/producto/lente-contacto",
        },
        {
          title: "Lentes de contacto sin Comisión",
          url: "/comision/gestion/producto/sin-comision/lente-contacto",
        },
      ],
    },

    {
      title: "Servicios",
      url: "#",
      icon: FileBox,
      items: [
        {
          title: "listar servicios",
          url: "/comision/gestion/servicio",
        },
        {
          title: "Servicios sin Comisión",
          url: "/comision/gestion/servicio/sin-comision",
        },
        {
          title: "Cargar Comision Servicio",
          url: "/cargar/comision/servicio",
        },
      ],
    },

    {
      title: "Llaves",
      url: "/llaves",
      icon: LineChart,
      items: [
        {
          title: "Ver Llaves",
          url: "/llaves",
        },
        {
          title: "Registrar Llaves",
          url: "/llaves/registro",
        },
      ],
    },
    {
      title: "Gestion de usuarios",
      url: "/usuarios",
      icon: UserCog,
      items: [
        {
          title: "Usuarios",
          url: "/usuarios",
        },
        {
          title: "Asesor",
          url: "/listar/asesores",
        },
      ],
    },
  ],
};

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
  );
}
