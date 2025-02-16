import {type FieldError} from "react-hook-form"
import {useTranslations} from "next-intl"
import "./base.input.container.scss"
import React, {useMemo} from "react"

interface componentProps {
    children: React.ReactNode
    label?: string
    id?: string
    error?: FieldError
}

export default function BaseInputContainer({children, label, id, error}: componentProps) {
    const t = useTranslations('validation')

    const errorMessage = useMemo(() => error ? error.message || t(error.type) : null, [error, t])

    return (
        <div className="mb-4 input-container" >
            {label && id && <label htmlFor={id} className="text-sm block mb-1">{label}</label>}
            {children}
            {errorMessage && <div className="text-sm text-red-500 block mt-0.5">{errorMessage}</div>}
        </div>
    )
}