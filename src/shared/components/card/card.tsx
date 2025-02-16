import React from "react"

interface componentProps {
    title?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export default function apiLoader({title, children, footer}: componentProps) {
    return (
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-4" >
            {title && <h3 className="text-3xl font-semibold mb-6" >{title}</h3>}
            <div>
                {children}
            </div>

            {footer && (
                <div className="mt-4 pt-4 border-t border-gray-200" >
                    {footer}
                </div>
            )}
        </div>
    )
}