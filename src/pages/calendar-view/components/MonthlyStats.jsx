import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlyStats = ({ moodEntries, currentDate }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const calculateStats = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const entriesThisMonth = moodEntries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate?.getMonth() === currentDate?.getMonth() && 
             entryDate?.getFullYear() === currentDate?.getFullYear();
    });

    const totalEntries = entriesThisMonth?.length;
    const consistencyPercentage = Math.round((totalEntries / daysInMonth) * 100);
    
    const averageMood = totalEntries > 0 
      ? (entriesThisMonth?.reduce((sum, entry) => sum + entry?.mood, 0) / totalEntries)?.toFixed(1)
      : 0;

    const moodDistribution = {
      1: entriesThisMonth?.filter(e => e?.mood === 1)?.length,
      2: entriesThisMonth?.filter(e => e?.mood === 2)?.length,
      3: entriesThisMonth?.filter(e => e?.mood === 3)?.length,
      4: entriesThisMonth?.filter(e => e?.mood === 4)?.length,
      5: entriesThisMonth?.filter(e => e?.mood === 5)?.length,
    };

    const journalEntries = entriesThisMonth?.filter(entry => 
      entry?.reflection && entry?.reflection?.trim()?.length > 0
    )?.length;

    return {
      totalEntries,
      consistencyPercentage,
      averageMood,
      moodDistribution,
      journalEntries,
      daysInMonth
    };
  };

  const stats = calculateStats();

  const moodLabels = {
    1: 'Very Low',
    2: 'Low', 
    3: 'Neutral',
    4: 'Good',
    5: 'Great'
  };

  const moodColors = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-green-500',
    5: 'bg-emerald-500'
  };

  const getAverageMoodLabel = (avg) => {
    if (avg >= 4.5) return 'Excellent';
    if (avg >= 3.5) return 'Good';
    if (avg >= 2.5) return 'Fair';
    if (avg >= 1.5) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Tracking Consistency */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-subtle">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Consistency</p>
            <p className="text-2xl font-semibold text-foreground">{stats?.consistencyPercentage}%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {stats?.totalEntries} of {stats?.daysInMonth} days tracked
        </p>
      </div>
      {/* Average Mood */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-subtle">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Mood</p>
            <p className="text-2xl font-semibold text-foreground">{stats?.averageMood}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {getAverageMoodLabel(parseFloat(stats?.averageMood))}
        </p>
      </div>
      {/* Journal Entries */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-subtle">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Journal Entries</p>
            <p className="text-2xl font-semibold text-foreground">{stats?.journalEntries}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Reflective entries written
        </p>
      </div>
      {/* Mood Distribution */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-subtle">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mood Distribution</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {Object.entries(stats?.moodDistribution)?.map(([mood, count]) => {
            const percentage = stats?.totalEntries > 0 ? (count / stats?.totalEntries) * 100 : 0;
            return (
              <div key={mood} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${moodColors?.[mood]}`}></div>
                <span className="text-xs text-muted-foreground flex-1">
                  {moodLabels?.[mood]}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {Math.round(percentage)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;