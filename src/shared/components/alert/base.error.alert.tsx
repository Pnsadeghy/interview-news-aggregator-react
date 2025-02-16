import BaseAlert from "@/shared/components/alert/base.alert";
import BaseAlertThemeEnum from "@/shared/components/alert/base.alert.theme.enum";
import React from "react";

interface componentProps {
    error: string
}

export default function BaseErrorAlert({error}: componentProps) {
    return (error && <BaseAlert theme={BaseAlertThemeEnum.Danger}>{error}</BaseAlert>)
}