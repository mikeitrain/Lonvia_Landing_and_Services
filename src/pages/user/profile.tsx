import UserProfile from '@/components/user-profile/user-profile';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { section } = router.query;

  useEffect(() => {
    // This will be handled by the UserProfile component
    // The section parameter can be used to set the initial active section
  }, [section]);

  return (
    <ProtectedRoute>
      <UserProfile initialSection={section as string} />
    </ProtectedRoute>
  );
} 