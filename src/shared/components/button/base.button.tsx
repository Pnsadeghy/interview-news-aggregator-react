import React from "react"

interface componentProps {
    children: React.ReactNode
    submit?: boolean
    disabled?: boolean
}

export default function BaseButton({children, submit, disabled}: componentProps) {
    return (
        <button className="text-sm block bg-indigo-500 text-white h-8 px-3 rounded-lg disabled:opacity-75 enabled:cursor-pointer enabled:hover:bg-indigo-700 transition"
                type={submit ? "submit" : "button"} disabled={disabled} >
            {children}
        </button>
    )
}