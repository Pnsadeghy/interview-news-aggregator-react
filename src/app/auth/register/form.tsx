import BaseInputContainer from "@/shared/components/input-container/base.input.container"
import BaseBoxLoading from "@/shared/components/box-loading/base.box.loading"
import BaseErrorAlert from "@/shared/components/alert/base.error.alert"
import {getEmailValidation} from "@/shared/utils/validation.utils"
import BaseButton from "@/shared/components/button/base.button"
import {getApiCallErrorMessage} from "@/shared/utils/api.utils"
import useAuthStore from "@/modules/auth/stores/auth.store"
import { useForm, SubmitHandler } from "react-hook-form"
import {useTranslations} from "next-intl"
import {useState} from "react"

interface componentProps {
    onSuccess: () => void
}

type Inputs = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export default function RegisterForm({onSuccess}: componentProps) {
    const t = useTranslations()
    const registerApi = useAuthStore((state) => state.register)

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const emailValidation = {
        required: true,
        ...getEmailValidation(t('validation.email'))
    }
    const passwordValidation = {
        required: true,
        minLength: {
            value: 6,
            message: t('validation.minLength', {length: 6}),
        }
    }
    const passwordConfirmationValidation = {
        required: true,
        validate: (value: string) =>
            value === watch("password") || t("validation.passwordMismatch"),
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        setError("")

        try {
            await registerApi(data)
            onSuccess()
        } catch (error: unknown) {
            setError(getApiCallErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <BaseBoxLoading loading={loading}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <BaseErrorAlert error={error} />

                <BaseInputContainer label={t('auth.name')} id="name" error={errors.name}>
                    <input {...register("name", {required: true})} />
                </BaseInputContainer>
                <BaseInputContainer label={t('auth.email')} id="email" error={errors.email}>
                    <input {...register("email", emailValidation)} />
                </BaseInputContainer>
                <BaseInputContainer label={t('auth.password')} id="password" error={errors.password}>
                    <input {...register("password", passwordValidation)} />
                </BaseInputContainer>
                <BaseInputContainer
                    label={t("auth.password_confirmation")}
                    id="password_confirmation"
                    error={errors.password_confirmation}
                >
                    <input type="password" {...register("password_confirmation", passwordConfirmationValidation)} />
                </BaseInputContainer>

                <BaseButton submit disabled={loading} >{t('login.button')}</BaseButton>
            </form>
        </BaseBoxLoading>
    )
}