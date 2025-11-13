import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummary = ({ streak, weeklyAverage, totalEntries, lastEntry }) => {
  const getStreakMessage = (streakDays) => {
    if (streakDays === 0) return "Start your journey today!";
    if (streakDays === 1) return "Great start! Keep it up!";
    if (streakDays < 7) return "Building momentum!";
    if (streakDays < 30) return "Fantastic consistency!";
    return "You're on fire! Amazing dedication!";
  };

  const getAverageColor = (average) => {
    if (average >= 4) return "text-green-600 bg-green-50";
    if (average >= 3) return "text-yellow-600 bg-yellow-50";
    if (average >= 2) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const formatDate = (date) => {
    if (!date) return "No entries yet";
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="morphic-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Your Progress</h3>
        <div className="flex items-center space-x-1 text-primary">
          <Icon name="TrendingUp" size={16} />
          <span className="text-sm font-medium">Tracking</span>
        </div>
      </div>
      {/* Streak Counter */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Flame" size={24} className="text-orange-500" />
          <span className="text-3xl font-bold text-foreground">{streak}</span>
          <span className="text-lg text-muted-foreground">
            {streak === 1 ? 'day' : 'days'}
          </span>
        </div>
        <p className="text-sm font-medium text-primary">
          {getStreakMessage(streak)}
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Calendar" size={16} className="text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Weekly Avg
            </span>
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getAverageColor(weeklyAverage)}`}>
            {weeklyAverage ? weeklyAverage?.toFixed(1) : '0.0'}
          </div>
        </div>

        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Icon name="BarChart3" size={16} className="text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Total Entries
            </span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {totalEntries || 0}
          </div>
        </div>
      </div>
      {/* Last Entry */}
      {lastEntry && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last entry:</span>
            <span className="text-foreground font-medium">
              {formatDate(lastEntry?.date)}
            </span>
          </div>
        </div>
      )}
      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 text-center">
        <Icon name="Heart" size={20} className="text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground">
          {streak > 0 
            ? "Every day you track is a step towards better mental health!" :"Your mental health journey starts with a single entry. You've got this!"
          }
        </p>
      </div>
    </div>
  );
};

export default ProgressSummary;