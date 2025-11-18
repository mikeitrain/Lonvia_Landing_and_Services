import React, { useState } from 'react';
import { Case } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import CaseList from '@/components/case/case-list';

interface AppointmentCalendarProps {
  cases: Case[];
  onCaseClick?: (caseId: string) => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  cases,
  onCaseClick,
}) => {
  const { language, t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Initialize with today's date (normalized to midnight for proper date comparison)
  const getToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(getToday());

  // Get all dates that have appointments (only accepted appointments)
  const getDatesWithAppointments = (): Date[] => {
    const dates = new Set<string>();
    cases.forEach((caseData) => {
      caseData.appointments?.forEach((appointment) => {
        // Only show accepted appointments on the calendar
        if (appointment.scheduledStart && appointment.meetingStatus === 'accepted') {
          const date = new Date(appointment.scheduledStart);
          dates.add(date.toDateString());
        }
      });
    });
    return Array.from(dates).map(dateStr => new Date(dateStr));
  };

  const datesWithAppointments = getDatesWithAppointments();

  // Check if a date has appointments
  const hasAppointments = (date: Date): boolean => {
    return datesWithAppointments.some(d =>
      d.toDateString() === date.toDateString()
    );
  };

  // Get cases for a specific date (only accepted appointments)
  const getCasesForDate = (date: Date): Case[] => {
    const result: Case[] = [];
    const casesOnDate: Set<number> = new Set();

    cases.forEach((caseData) => {
      const hasAppointmentOnDate = caseData.appointments?.some((appointment) => {
        // Only show accepted appointments
        if (appointment.scheduledStart && appointment.meetingStatus === 'accepted') {
          const appointmentDate = new Date(appointment.scheduledStart);
          return appointmentDate.toDateString() === date.toDateString();
        }
        return false;
      });

      if (hasAppointmentOnDate && caseData.id && !casesOnDate.has(caseData.id)) {
        casesOnDate.add(caseData.id);
        result.push(caseData);
      }
    });

    return result;
  };

  // Get month year string
  const getMonthYearString = () => {
    return currentMonth.toLocaleDateString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Get day headers based on language (Monday to Sunday)
  const getDayHeaders = () => {
    const locale = language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB';
    const dayHeaders: string[] = [];
    
    // January 1, 2024 is a Monday - use this as reference
    const baseDate = new Date(2024, 0, 1); // Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i); // Monday, Tuesday, ..., Sunday
      const dayName = date.toLocaleDateString(locale, { weekday: 'short' });
      // Use first 2 characters for better readability, especially for languages with similar first letters
      dayHeaders.push(dayName.substring(0, 2).toUpperCase());
    }
    
    return dayHeaders;
  };

  // Get first day of month
  const getFirstDayOfMonth = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Convert Sunday (0) to Monday (6)
  };

  // Get days in month
  const getDaysInMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  };

  // Get days array
  const getDaysArray = () => {
    const days: Array<{ date: number; isCurrentMonth: boolean; dateObj: Date }> = [];
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    // Add previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        dateObj: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, daysInPrevMonth - i),
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        dateObj: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
      });
    }

    // Add next month's days to fill the grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        dateObj: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i),
      });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectedCases = selectedDate ? getCasesForDate(selectedDate) : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('calendar.title') || 'Calendar'}</h2>

        <div className="items-center gap-4 p-3 border border-gray-300 rounded-lg">
          {/* Month/Year Selector */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              &lt;
            </button>
            <span className="text-lg font-medium">{getMonthYearString()}</span>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              &gt;
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {getDayHeaders().map((day, idx) => (
              <div key={idx} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {getDaysArray().map((dayInfo, idx) => {
              const hasAppt = hasAppointments(dayInfo.dateObj);
              const isCurrentDay = isToday(dayInfo.dateObj);
              const isSelectedDay = isSelected(dayInfo.dateObj);

              let bgColor = '';
              let borderColor = '';

              if (isSelectedDay) {
                bgColor = 'bg-blue-200';
                borderColor = 'border-blue-400';
              } else if (isCurrentDay) {
                bgColor = 'bg-gray-200';
                borderColor = 'border-gray-400';
              } else if (hasAppt) {
                bgColor = 'bg-green-200';
                borderColor = 'border-green-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleDateClick(dayInfo.dateObj)}
                  className={`
                  h-10 w-full rounded-md text-sm transition-colors cursor-pointer
                  ${dayInfo.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                  ${isSelectedDay ? 'hover:bg-blue-100' : hasAppt && !isCurrentDay ? 'hover:bg-green-100' : 'hover:bg-gray-50'}
                  ${bgColor} ${borderColor} border
                  ${isCurrentDay || isSelectedDay || hasAppt ? 'font-semibold' : ''}
                `}
                >
                  {dayInfo.date}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-blue-400 bg-blue-200"></div>
            <span className="text-gray-700">{t('calendar.legend.selected') || 'Selected Date'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-gray-400 bg-gray-200"></div>
            <span className="text-gray-700">{t('calendar.legend.today') || 'Today'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-green-400 bg-green-200"></div>
            <span className="text-gray-700">{t('calendar.legend.hasAppointments') || 'Has Appointments'}</span>
          </div>
        </div>

        {/* Selected date cases */}
        {selectedDate && (
          <div className="mt-4">
            {selectedCases.length > 0 ? (
              <CaseList cases={selectedCases} onCaseClick={onCaseClick} viewMode="arranged"/>
            ) : (
              <div className="text-center text-gray-500 py-4">
                {t('calendar.noAppointments') || 'No appointments scheduled for'} {selectedDate.toLocaleDateString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

