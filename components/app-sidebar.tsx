"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Workflow, KeyRound, History } from "lucide-react"
import { Syne } from "next/font/google"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Route } from "next"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
})

const navItems = [
  { title: "Workflows", href: "/workflows", icon: Workflow },
  { title: "Credentials", href: "/credentials", icon: KeyRound },
  { title: "Executions", href: "/executions", icon: History },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className={`${syne.variable} px-3 py-2`}>
          <Link href="/" prefetch>
            <span
              className="text-xl font-extrabold leading-none tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              orchestr<span style={{ color: "oklch(0.68 0.19 38)" }}>8</span>
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton className="gap-x-4 h-10 px-4" tooltip={item.title} asChild isActive={pathname.startsWith(item.href)}>
                    <Link href={item.href as Route} prefetch>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
