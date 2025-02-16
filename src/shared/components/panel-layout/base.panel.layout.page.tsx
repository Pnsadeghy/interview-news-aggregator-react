import React from "react";

interface componentProps {
    title: string;
    children?: React.ReactNode;
}

export default function BasePanelLayoutPage({ children, title }: componentProps) {
    return (
        <div>
            <header className="h-16 xl:ps-4 ps-16 bg-gray-200 border-b border-gray-300 flex items-center justify-between pe-4" >
                <h2 className="text-xl" >{title}</h2>
            </header>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}