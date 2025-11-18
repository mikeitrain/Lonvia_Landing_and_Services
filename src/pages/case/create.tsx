'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreateCaseWizard } from '@/components/case/CreateCaseWizard';

export default function CreateCasePage() {
  const router = useRouter();
  const { isAuthenticated, loading, user, userLoading, userGroups } = useAuth();
  const { t } = useLanguage();
  const isPatient = userGroups.includes('patient');

  // Redirect non-patient users directly to profile
  React.useEffect(() => {
    if (isAuthenticated && !loading && !userLoading && user && !isPatient) {
      router.replace('/user/profile');
    }
  }, [isAuthenticated, loading, userLoading, user, isPatient, router]);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-secondary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-heading mb-4">
            {t('auth.loginRequired') || 'Login Required'}
          </h1>
          <p className="text-body mb-6">
            {t('auth.loginToCreateCase') || 'Please log in to create a medical case.'}
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {t('auth.login') || 'Login'}
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return;
  }

  // Show the CreateCaseWizard
  return <CreateCaseWizard user={user} />;
}