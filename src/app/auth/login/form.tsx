import BaseInputContainer from '@/shared/components/input-container/base.input.container';
import BaseBoxLoading from '@/shared/components/box-loading/base.box.loading';
import BaseErrorAlert from '@/shared/components/alert/base.error.alert';
import { getEmailValidation } from '@/shared/utils/validation.utils';
import BaseButton from '@/shared/components/button/base.button';
import { getApiCallErrorMessage } from '@/shared/utils/api.utils';
import useAuthStore from '@/modules/auth/stores/auth.store';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface componentProps {
  onSuccess: () => void;
}

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm({ onSuccess }: componentProps) {
  const t = useTranslations();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const emailValidation = {
    required: true,
    ...getEmailValidation(t('validation.email')),
  };
  const passwordValidation = {
    required: true,
    minLength: {
      value: 6,
      message: t('validation.minLength', { length: 6 }),
    },
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError('');

    try {
      await login(data);
      onSuccess();
    } catch (error: unknown) {
      setError(getApiCallErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseBoxLoading loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseErrorAlert error={error} />

        <BaseInputContainer
          label={t('auth.email')}
          id='email'
          error={errors.email}
        >
          <input {...register('email', emailValidation)} />
        </BaseInputContainer>
        <BaseInputContainer
          label={t('auth.password')}
          id='password'
          error={errors.password}
        >
          <input {...register('password', passwordValidation)} />
        </BaseInputContainer>

        <BaseButton submit disabled={loading}>
          {t('login.button')}
        </BaseButton>
      </form>
    </BaseBoxLoading>
  );
}
