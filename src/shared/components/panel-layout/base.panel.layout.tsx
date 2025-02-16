"use client"

import BaseIconNav from "@/shared/components/icons/base.icon.nav";
import React, {useMemo, useState} from "react";

interface componentProps {
    side: React.ReactNode;
    children: React.ReactNode;
}

export default function BasePanelLayout({children, side}: componentProps) {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const sidebarClass = useMemo(() =>
            showSidebar ? 'start-0' : 'xl:start-0 -start-64'
        , [showSidebar])

    const handleToggleNav = () => {
        setShowSidebar(v => !v)
    }

    return (
        <div className="lg:flex lg:h-screen items-stretch relative">
            <aside className={'lg:static fixed top-0 h-full w-64 bg-gray-200 border-e border-gray-300 z-30 ' + sidebarClass}>
                {side}
            </aside>
            <section className="grow">
                {children}
            </section>
            <button onClick={handleToggleNav}
                    type="button"
                    className="lg:hidden fixed cursor-pointer flex items-center justify-center top-0 start-0 h-16 w-16 text-gray-600" >
                <BaseIconNav className="h-10" />
            </button>
            {showSidebar && <button onClick={handleToggleNav}
                                    type="button"
                                    className="lg:hidden cursor-pointer z-20 w-full h-full bg-black/50 start-0 top-0 fixed" ></button>}
        </div>
    )
}