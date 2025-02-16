import PanelLayoutSide from "@/app/panel/components/layout-side/panel.layout.side";
import BasePanelLayout from "@/shared/components/panel-layout/base.panel.layout";
import React from "react";

export default function AppPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BasePanelLayout side={<PanelLayoutSide />} >
        {children}
    </BasePanelLayout>
  );
}
