import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-heading mb-4">Page Not Found</h1>
        <p className="text-body">Redirecting to home page...</p>
      </div>
    </div>
  );
} 