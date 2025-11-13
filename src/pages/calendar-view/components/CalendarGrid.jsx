import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarGrid = ({ 
  currentDate, 
  moodEntries, 
  onDayClick, 
  selectedDate,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDate 
}) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const moodColors = {
    1: 'bg-red-100 border-red-200',
    2: 'bg-orange-100 border-orange-200', 
    3: 'bg-yellow-100 border-yellow-200',
    4: 'bg-green-100 border-green-200',
    5: 'bg-emerald-100 border-emerald-200'
  };

  const moodEmojis = {
    1: '😢',
    2: '😕', 
    3: '😐',
    4: '😊',
    5: '😄'
  };

  const getMoodForDate = (day) => {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return moodEntries?.find(entry => entry?.date === dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return today?.getDate() === day && 
           today?.getMonth() === currentDate?.getMonth() && 
           today?.getFullYear() === currentDate?.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate?.getDate() === day && 
           selectedDate?.getMonth() === currentDate?.getMonth() && 
           selectedDate?.getFullYear() === currentDate?.getFullYear();
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-24 lg:h-32 border border-border/30"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const moodEntry = getMoodForDate(day);
      const hasEntry = !!moodEntry;
      const hasJournal = hasEntry && moodEntry?.reflection && moodEntry?.reflection?.trim()?.length > 0;
      
      days?.push(
        <div
          key={day}
          onClick={() => onDayClick(day)}
          className={`
            h-24 lg:h-32 border border-border/30 cursor-pointer transition-all duration-200 hover:bg-muted/50
            ${hasEntry ? moodColors?.[moodEntry?.mood] : 'bg-background hover:bg-muted/30'}
            ${isSelected(day) ? 'ring-2 ring-primary ring-offset-2' : ''}
            ${isToday(day) ? 'ring-1 ring-accent' : ''}
          `}
        >
          <div className="p-2 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className={`
                text-sm font-medium
                ${isToday(day) ? 'text-accent font-semibold' : 'text-foreground'}
                ${hasEntry ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {day}
              </span>
              {hasJournal && (
                <Icon name="BookOpen" size={12} className="text-primary opacity-60" />
              )}
            </div>
            
            {hasEntry && (
              <div className="flex items-center justify-center">
                <span className="text-lg" role="img" aria-label={`Mood level ${moodEntry?.mood}`}>
                  {moodEmojis?.[moodEntry?.mood]}
                </span>
              </div>
            )}
            
            {!hasEntry && (
              <div className="flex items-center justify-center opacity-30">
                <Icon name="Plus" size={16} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle overflow-hidden">
      {/* Days of week header */}
      <div className="grid grid-cols-7 bg-muted/30">
        {daysOfWeek?.map(day => (
          <div key={day} className="p-3 text-center">
            <span className="text-sm font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarGrid;