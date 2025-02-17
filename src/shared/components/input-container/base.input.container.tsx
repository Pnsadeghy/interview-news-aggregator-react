import { type FieldError } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import './base.input.container.scss';
import React, { useMemo } from 'react';

interface componentProps {
  children: React.ReactNode;
  label?: string;
  id?: string;
  error?: FieldError;
}

export default function BaseInputContainer({
  children,
  label,
  id,
  error,
}: componentProps) {
  const t = useTranslations('validation');

  const errorMessage = useMemo(
    () => (error ? error.message || t(error.type) : null),
    [error, t],
  );

  return (
    <div className='input-container mb-4'>
      {label && id && (
        <label htmlFor={id} className='mb-1 block text-sm'>
          {label}
        </label>
      )}
      {children}
      {errorMessage && (
        <div className='mt-0.5 block text-sm text-red-500'>{errorMessage}</div>
      )}
    </div>
  );
}
