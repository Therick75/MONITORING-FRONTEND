"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Projector,
  ProjectorIcon,
  Settings2,
  SquareTerminal,
  
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "david",
    email: "davidlarotapilco@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
    name: "Sub administrador",
      logo: GalleryVerticalEnd,
      plan: "Colegio 1",
    },
    {
      name: "Personal de planta",
      logo: AudioWaveform,
      plan: "Colegio 2",
    },
    {
      name: "Coordinador",
      logo: Command,
      plan: "Colegio 3",
    },
  ],
  projects: [
    {
      name: "dashboard",
      url: "/intranet/dashboard",
      icon: Frame,
    },
    {
      name: "Reportes",
      url: "/intranet/reports",
      icon: PieChart,
    },
    {
      name: "Aulas",
      url: "/intranet/classrooms",
      icon: Map,
    },
    {
      name: "Configuración",
      url: "/intranet/settings",
      icon: Map,
    },
  ],
  navMain: [
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

