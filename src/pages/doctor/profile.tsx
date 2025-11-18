import DoctorProfile from '@/components/doctor/doctor-profile';
import { DoctorRoute } from '@/components/common/DoctorRoute';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DoctorProfilePage() {
  const router = useRouter();
  const { section } = router.query;

  useEffect(() => {
    // This will be handled by the DoctorProfile component
    // The section parameter can be used to set the initial active section
  }, [section]);

  return (
    <DoctorRoute>
      <DoctorProfile initialSection={section as string} />
    </DoctorRoute>
  );
}

