import React from "react"

interface componentProps {
    children: React.ReactNode
}

export default function apiLoader({children}: componentProps) {
    return (
        <div>
            <h3>Loader</h3>

            <div>
                {children}
            </div>
        </div>
    )
}