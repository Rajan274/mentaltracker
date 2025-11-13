import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentEntries = ({ entries, onEditEntry }) => {
  const getMoodEmoji = (moodLevel) => {
    const moodMap = {
      1: '😢',
      2: '😔', 
      3: '😊',
      4: '😄',
      5: '😁'
    };
    return moodMap?.[moodLevel] || '😊';
  };

  const getMoodLabel = (moodLevel) => {
    const labelMap = {
      1: 'Very Low',
      2: 'Low',
      3: 'Happy', 
      4: 'Good',
      5: 'Great'
    };
    return labelMap?.[moodLevel] || 'Unknown';
  };

  const formatDate = (date) => {
    const entryDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (entryDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (entryDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return entryDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  if (!entries || entries?.length === 0) {
    return (
      <div className="morphic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Recent Entries</h3>
          <Link to="/journal-entries">
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No entries yet</p>
          <p className="text-sm text-muted-foreground">
            Start tracking your mood to see your entries here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="morphic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Recent Entries</h3>
        <Link to="/journal-entries">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {entries?.slice(0, 5)?.map((entry) => (
          <div
            key={entry?.id}
            className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 group"
          >
            <div className="flex-shrink-0 flex flex-col items-center">
              <span className="text-2xl mb-1">{getMoodEmoji(entry?.mood)}</span>
              <span className="text-xs text-muted-foreground text-center">
                {formatDate(entry?.date)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  {getMoodLabel(entry?.mood)}
                </span>
                <button
                  onClick={() => onEditEntry(entry)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-muted"
                >
                  <Icon name="Edit2" size={14} className="text-muted-foreground" />
                </button>
              </div>
              
              {entry?.reflection && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {truncateText(entry?.reflection)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {entries?.length > 5 && (
        <div className="mt-4 text-center">
          <Link to="/journal-entries">
            <Button variant="outline" size="sm">
              View {entries?.length - 5} More Entries
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentEntries;