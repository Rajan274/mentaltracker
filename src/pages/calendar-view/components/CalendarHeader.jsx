import React from 'react';

import Button from '../../../components/ui/Button';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, onTodayClick }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatMonthYear = (date) => {
    return `${monthNames?.[date?.getMonth()]} ${date?.getFullYear()}`;
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return today?.getMonth() === currentDate?.getMonth() && 
           today?.getFullYear() === currentDate?.getFullYear();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
          {formatMonthYear(currentDate)}
        </h1>
        {!isCurrentMonth() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onTodayClick}
            iconName="Calendar"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Today
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevMonth}
          iconName="ChevronLeft"
          className="w-10 h-10 p-0"
          aria-label="Previous month"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onNextMonth}
          iconName="ChevronRight"
          className="w-10 h-10 p-0"
          aria-label="Next month"
        />
      </div>
    </div>
  );
};

export default CalendarHeader;