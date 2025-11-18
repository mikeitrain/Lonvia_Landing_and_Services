import React from 'react';
import { DoctorRoute } from '@/components/common/DoctorRoute';
import { DoctorPanel } from '@/components/doctor/DoctorPanel';

const DoctorPanelPage: React.FC = () => {
  return (
    <DoctorRoute>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Meetings</h1>
        <DoctorPanel />
      </div>
    </DoctorRoute>
  );
};

export default DoctorPanelPage;

