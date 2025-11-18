import { Suspense } from 'react';
import { ConfirmRegister } from '@/components/auth/ConfirmRegister';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-body">Loading...</p>
      </div>
    </div>
  );
}

export default function ConfirmRegisterPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmRegister />
    </Suspense>
  );
} 