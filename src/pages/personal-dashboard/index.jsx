import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import MoodSelector from './components/MoodSelector';
import QuickReflection from './components/QuickReflection';
import ProgressSummary from './components/ProgressSummary';
import RecentEntries from './components/RecentEntries';
import WellnessTip from './components/WellnessTip';
import ActionButtons from './components/ActionButtons';

const PersonalDashboard = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock data for demonstration
  const [userData] = useState({
    name: "Sarah Johnson",
    streak: 12,
    weeklyAverage: 3.8,
    totalEntries: 45,
    joinDate: "2024-10-15"
  });

  const [recentEntries] = useState([
    {
      id: 1,
      date: new Date()?.toISOString(),
      mood: 4,
      reflection: "Had a productive day at work. Completed the project presentation and received positive feedback from the team. Feeling accomplished and motivated for tomorrow's challenges."
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000)?.toISOString(),
      mood: 3,
      reflection: "Decent day overall. Morning workout helped boost my energy. Had some stress during the afternoon meeting, but managed to stay calm and focused."
    },
    {
      id: 3,
      date: new Date(Date.now() - 172800000)?.toISOString(),
      mood: 5,
      reflection: "Amazing day! Spent quality time with family, went for a nature walk, and practiced meditation. Feeling grateful and at peace."
    },
    {
      id: 4,
      date: new Date(Date.now() - 259200000)?.toISOString(),
      mood: 2,
      reflection: "Challenging day with some personal issues. Feeling a bit overwhelmed but trying to stay positive and take things one step at a time."
    },
    {
      id: 5,
      date: new Date(Date.now() - 345600000)?.toISOString(),
      mood: 4,
      reflection: "Good progress on personal goals. Finished reading a chapter of my book and had a meaningful conversation with a friend."
    }
  ]);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }
  }, [navigate]);

  // Get today's date
  const getCurrentDate = () => {
    return new Date()?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Check if user has already logged mood today
  const hasTodayEntry = () => {
    const today = new Date()?.toDateString();
    return recentEntries?.some(entry => 
      new Date(entry.date)?.toDateString() === today
    );
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setHasUnsavedChanges(true);
  };

  const handleReflectionChange = (value) => {
    setReflection(value);
    setHasUnsavedChanges(true);
  };

  const handleSaveEntry = async (reflectionText = reflection) => {
    if (!selectedMood) {
      alert('Please select a mood first');
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEntry = {
        id: Date.now(),
        date: new Date()?.toISOString(),
        mood: selectedMood?.id,
        reflection: reflectionText
      };

      // In a real app, this would be sent to the backend
      console.log('Saving entry:', newEntry);
      
      // Reset form
      setSelectedMood(null);
      setReflection('');
      setHasUnsavedChanges(false);
      
      // Show success message
      alert('Entry saved successfully!');
      
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditEntry = (entry) => {
    // Navigate to edit mode or open modal
    console.log('Editing entry:', entry);
    // In a real app, this would open an edit modal or navigate to edit page
  };

  const handleExportData = async (format) => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        user: userData,
        entries: recentEntries,
        exportDate: new Date()?.toISOString(),
        format: format
      };

      // In a real app, this would generate and download the file
      console.log(`Exporting data as ${format}:`, exportData);
      
      // Create download link
      const dataStr = format === 'json' 
        ? JSON.stringify(exportData, null, 2)
        : convertToCSV(exportData?.entries);
      
      const dataBlob = new Blob([dataStr], { 
        type: format === 'json' ? 'application/json' : 'text/csv' 
      });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindtracker-data.${format}`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (entries) => {
    const headers = ['Date', 'Mood Level', 'Mood Label', 'Reflection'];
    const moodLabels = { 1: 'Very Low', 2: 'Low', 3: 'Happy', 4: 'Good', 5: 'Great' };
    
    const csvContent = [
      headers?.join(','),
      ...entries?.map(entry => [
        new Date(entry.date)?.toLocaleDateString(),
        entry?.mood,
        moodLabels?.[entry?.mood],
        `"${entry?.reflection?.replace(/"/g, '""')}"`
      ]?.join(','))
    ]?.join('\n');
    
    return csvContent;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {getGreeting()}, {userData?.name}! 👋
                </h1>
                <p className="text-lg text-muted-foreground">
                  {getCurrentDate()}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>Member since {new Date(userData.joinDate)?.toLocaleDateString()}</span>
                  </div>
                  {hasTodayEntry() && (
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Icon name="CheckCircle" size={14} />
                      <span>Today's entry completed</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/calendar-view')}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/journal-entries')}
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Journal
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Mood Tracking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mood Selector */}
              <div className="morphic-card p-6">
                <MoodSelector
                  selectedMood={selectedMood}
                  onMoodSelect={handleMoodSelect}
                  disabled={isSaving}
                />
              </div>

              {/* Quick Reflection */}
              <div className="morphic-card p-6">
                <QuickReflection
                  reflection={reflection}
                  onReflectionChange={handleReflectionChange}
                  onSave={handleSaveEntry}
                  isSaving={isSaving}
                />
              </div>

              {/* Save Button */}
              {(selectedMood || reflection) && (
                <div className="flex justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handleSaveEntry()}
                    loading={isSaving}
                    disabled={!selectedMood}
                    iconName="Save"
                    iconPosition="left"
                    className="px-8"
                  >
                    {isSaving ? 'Saving Entry...' : 'Save Today\'s Entry'}
                  </Button>
                </div>
              )}

              {/* Recent Entries */}
              <RecentEntries
                entries={recentEntries}
                onEditEntry={handleEditEntry}
              />
            </div>

            {/* Right Column - Progress & Tips */}
            <div className="space-y-6">
              {/* Progress Summary */}
              <ProgressSummary
                streak={userData?.streak}
                weeklyAverage={userData?.weeklyAverage}
                totalEntries={userData?.totalEntries}
                lastEntry={recentEntries?.[0]}
              />

              {/* Wellness Tip */}
              <WellnessTip />
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="mt-12">
            <ActionButtons
              onExportData={handleExportData}
              isExporting={isExporting}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalDashboard;