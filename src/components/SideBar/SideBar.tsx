"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MdOutlineDashboard as Dashboard } from "react-icons/md";
import { FiUser as User } from "react-icons/fi";
import { AiOutlineSafety as Protected } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { useMockData } from "../Providers";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Dashboard,
  },
  {
    title: "UserManagement",
    url: "/users",
    icon: User,
  },
  {
    title: "ProtectedPage",
    url: "/protected",
    icon: Protected,
    perm: "admin",
  },
];

const SideBar = () => {
  const router = useRouter();
  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useMockData();

  useEffect(() => {
    setCookie(document.cookie);
  }, []);

  const params = cookie.split("; ");
  const id = params.find((param) => param.startsWith(`id=`))?.split("=")[1];
  const currentUser = users.find((user) => user.id === id);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold py-8">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const shouldRender =
                  !item.perm || (currentUser && currentUser.role === item.perm);

                if (!shouldRender) return null;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Button
                        variant="ghost"
                        className="flex justify-start"
                        onClick={() => router.push(item.url)}
                      >
                        <item.icon />
                        {item.title}
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex justify-between items-center">
          <span className="text-lg font-bold">{currentUser?.nickname}</span>
          <Button
            onClick={() => {
              document.cookie =
                "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              router.push("/login");
            }}
          >
            登出
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
