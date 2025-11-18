'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchAuthSession } from 'aws-amplify/auth';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

interface DoctorRouteProps {
  children: React.ReactNode;
}

export const DoctorRoute: React.FC<DoctorRouteProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [checkingGroup, setCheckingGroup] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const session = await fetchAuthSession();
        const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
        const groups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
        if (!groups.includes('doctor')) {
          router.replace('/user/profile');
          return;
        }
      } finally {
        setCheckingGroup(false);
      }
    };
    check();
  }, [router]);

  return (
    <ProtectedRoute>
      {checkingGroup ? (
        <div className="min-h-screen flex items-center justify-center bg-background-secondary">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-body">{t('common.loading')}</p>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </ProtectedRoute>
  );
};

