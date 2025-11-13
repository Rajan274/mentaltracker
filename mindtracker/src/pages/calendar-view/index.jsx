import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CalendarHeader from './components/CalendarHeader';
import MonthlyStats from './components/MonthlyStats';
import FilterControls from './components/FilterControls';
import CalendarGrid from './components/CalendarGrid';
import DayDetailSidebar from './components/DayDetailSidebar';

const CalendarView = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [moodEntries, setMoodEntries] = useState([]);

  // Mock mood entries data
  const mockMoodEntries = [
    {
      id: 1,
      date: "2024-11-01",
      mood: 4,
      reflection: "Had a productive day at work. Completed the project presentation and received positive feedback from the team. Feeling accomplished and motivated for tomorrow.",
      timestamp: "2024-11-01T18:30:00.000Z"
    },
    {
      id: 2,
      date: "2024-11-02",
      mood: 3,
      reflection: "Average day. Nothing particularly exciting happened, but also no major issues. Just going through the motions.",
      timestamp: "2024-11-02T20:15:00.000Z"
    },
    {
      id: 3,
      date: "2024-11-03",
      mood: 5,
      reflection: "Amazing day! Went hiking with friends and enjoyed beautiful weather. Felt so refreshed and connected with nature. These are the moments that make life wonderful.",
      timestamp: "2024-11-03T21:45:00.000Z"
    },
    {
      id: 4,
      date: "2024-11-04",
      mood: 2,
      reflection: "Struggled with anxiety today. Work deadlines are piling up and I\'m feeling overwhelmed. Need to practice some breathing exercises and get better sleep.",
      timestamp: "2024-11-04T22:00:00.000Z"
    },
    {
      id: 5,
      date: "2024-11-05",
      mood: 4,
      reflection: "",
      timestamp: "2024-11-05T19:30:00.000Z"
    },
    {
      id: 6,
      date: "2024-11-06",
      mood: 3,
      reflection: "Quiet day at home. Read a good book and did some light cleaning. Sometimes these simple days are exactly what I need.",
      timestamp: "2024-11-06T20:00:00.000Z"
    },
    {
      id: 7,
      date: "2024-11-07",
      mood: 4,
      reflection: "Great workout session this morning. Feeling strong and energized. Planning to maintain this exercise routine.",
      timestamp: "2024-11-07T07:45:00.000Z"
    },
    {
      id: 8,
      date: "2024-11-08",
      mood: 1,
      reflection: "Very difficult day. Received some disappointing news about a job application. Feeling rejected and questioning my abilities. Need to remember that setbacks are temporary.",
      timestamp: "2024-11-08T23:15:00.000Z"
    },
    {
      id: 9,
      date: "2024-11-09",
      mood: 3,
      reflection: "Slowly recovering from yesterday's disappointment. Talked to a friend who gave me some perspective. Grateful for supportive people in my life.",
      timestamp: "2024-11-09T19:00:00.000Z"
    },
    {
      id: 10,
      date: "2024-11-10",
      mood: 4,
      reflection: "Feeling more optimistic today. Applied to two new positions and updated my resume. Taking action always helps me feel better.",
      timestamp: "2024-11-10T16:30:00.000Z"
    },
    {
      id: 11,
      date: "2024-11-11",
      mood: 5,
      reflection: "Wonderful day with family. Celebrated my sister's birthday and had so many laughs. These connections remind me what's truly important in life.",
      timestamp: "2024-11-11T22:30:00.000Z"
    },
    {
      id: 12,
      date: "2024-11-12",
      mood: 4,
      reflection: "Good progress on personal projects today. Feeling creative and focused. It\'s nice when everything just flows naturally.",
      timestamp: "2024-11-12T14:16:00.000Z"
    }
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }
  }, [navigate]);

  // Initialize mood entries
  useEffect(() => {
    setMoodEntries(mockMoodEntries);
  }, []);

  // Utility functions
  const formatDate = (date) => {
    return date?.toISOString()?.split('T')?.[0];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(null);
  };

  // Day selection handler
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  // Mood entry handlers
  const handleSaveMood = (entryData) => {
    const existingEntryIndex = moodEntries?.findIndex(entry => entry?.date === entryData?.date);
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries?.[existingEntryIndex],
        mood: entryData?.mood,
        reflection: entryData?.reflection,
        timestamp: entryData?.timestamp
      };
      setMoodEntries(updatedEntries);
    } else {
      // Create new entry
      const newEntry = {
        id: Date.now(),
        date: entryData?.date,
        mood: entryData?.mood,
        reflection: entryData?.reflection,
        timestamp: entryData?.timestamp
      };
      setMoodEntries([...moodEntries, newEntry]);
    }
  };

  const handleDeleteEntry = (date) => {
    setMoodEntries(moodEntries?.filter(entry => entry?.date !== date));
  };

  // Get filtered entries based on active filter
  const getFilteredEntries = () => {
    const entriesThisMonth = moodEntries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate?.getMonth() === currentDate?.getMonth() && 
             entryDate?.getFullYear() === currentDate?.getFullYear();
    });

    switch (activeFilter) {
      case 'all':
        return moodEntries;
      case 'mood-only':
        return moodEntries?.filter(entry => !entry?.reflection || entry?.reflection?.trim()?.length === 0);
      case 'with-journal':
        return moodEntries?.filter(entry => entry?.reflection && entry?.reflection?.trim()?.length > 0);
      case 'mood-1': case'mood-2': case'mood-3': case'mood-4': case'mood-5':
        const moodLevel = parseInt(activeFilter?.split('-')?.[1]);
        return moodEntries?.filter(entry => entry?.mood === moodLevel);
      default:
        return moodEntries;
    }
  };

  // Get current mood entry for selected date
  const getCurrentMoodEntry = () => {
    if (!selectedDate) return null;
    const dateStr = formatDate(selectedDate);
    return moodEntries?.find(entry => entry?.date === dateStr);
  };

  const filteredEntries = getFilteredEntries();
  const currentMoodEntry = getCurrentMoodEntry();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="main-content">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onTodayClick={handleTodayClick}
          />

          {/* Monthly Statistics */}
          <MonthlyStats
            moodEntries={moodEntries}
            currentDate={currentDate}
          />

          {/* Filter Controls */}
          <FilterControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            moodEntries={moodEntries}
            currentDate={currentDate}
          />

          {/* Calendar Grid */}
          <CalendarGrid
            currentDate={currentDate}
            moodEntries={filteredEntries}
            onDayClick={handleDayClick}
            selectedDate={selectedDate}
            getDaysInMonth={getDaysInMonth}
            getFirstDayOfMonth={getFirstDayOfMonth}
            formatDate={formatDate}
          />
        </div>

        {/* Day Detail Sidebar */}
        {selectedDate && (
          <>
            {/* Overlay for mobile */}
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setSelectedDate(null)}
            />
            
            <DayDetailSidebar
              selectedDate={selectedDate}
              moodEntry={currentMoodEntry}
              onClose={() => setSelectedDate(null)}
              onSaveMood={handleSaveMood}
              onDeleteEntry={handleDeleteEntry}
              formatDate={formatDate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarView;