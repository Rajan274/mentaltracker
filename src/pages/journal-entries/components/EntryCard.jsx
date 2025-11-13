import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EntryCard = ({ entry, onEdit, onDelete, onExpand }) => {
  const getMoodEmoji = (mood) => {
    const moodMap = {
      'very-low': '😢',
      'low': '😔',
      'happy': '😊',
      'good': '😄',
      'great': '🤩'
    };
    return moodMap?.[mood] || '😊';
  };

  const getMoodLabel = (mood) => {
    const moodLabels = {
      'very-low': 'Very Low',
      'low': 'Low',
      'happy': 'Happy',
      'good': 'Good',
      'great': 'Great'
    };
    return moodLabels?.[mood] || 'Happy';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="morphic-card p-6 hover:shadow-medium gentle-transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getMoodEmoji(entry?.mood)}</div>
          <div>
            <h3 className="font-medium text-foreground">{formatDate(entry?.date)}</h3>
            <p className="text-sm text-muted-foreground">{getMoodLabel(entry?.mood)} mood</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(entry)}
            iconName="Edit2"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(entry)}
            iconName="Trash2"
            iconSize={16}
            className="text-muted-foreground hover:text-error"
          >
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-foreground/80 leading-relaxed">
          {truncateText(entry?.content)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{new Date(entry.date)?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="FileText" size={14} />
            <span>{entry?.content?.split(' ')?.length} words</span>
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExpand(entry)}
          iconName="Maximize2"
          iconPosition="right"
          iconSize={14}
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default EntryCard;