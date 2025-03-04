"use client";

import { AppSidebar } from "@/components/app-sidebar";
import * as React from "react";
import { Header } from "@/components/Header"; // ✅ Import Header Component
import { Charts } from "@/components/chart";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* ✅ Use Header Component */}
        <Header />

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Card Title {i}</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
                <Button variant="outline">Button</Button>
              </Card>
            ))}
          </div>

          {/* Charts Component */}
          <Charts />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
