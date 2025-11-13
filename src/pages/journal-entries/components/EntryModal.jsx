import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const EntryModal = ({ entry, isOpen, onClose, onSave, onDelete, mode = 'view' }) => {
  const [editedContent, setEditedContent] = useState('');
  const [editedMood, setEditedMood] = useState('happy');
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (entry) {
      setEditedContent(entry?.content);
      setEditedMood(entry?.mood);
      setIsEditing(mode === 'edit');
    }
  }, [entry, mode]);

  if (!isOpen || !entry) return null;

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    onSave({
      ...entry,
      content: editedContent,
      mood: editedMood,
      updatedAt: new Date()?.toISOString()
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(entry);
    onClose();
  };

  const moodOptions = [
    { value: 'very-low', label: '😢 Very Low', emoji: '😢' },
    { value: 'low', label: '😔 Low', emoji: '😔' },
    { value: 'happy', label: '😊 Happy', emoji: '😊' },
    { value: 'good', label: '😄 Good', emoji: '😄' },
    { value: 'great', label: '🤩 Great', emoji: '🤩' }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="morphic-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getMoodEmoji(isEditing ? editedMood : entry?.mood)}</div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Journal Entry</h2>
              <p className="text-sm text-muted-foreground">{formatDate(entry?.date)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit2"
                iconSize={16}
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={16}
            >
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              {/* Mood Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  How were you feeling?
                </label>
                <div className="flex flex-wrap gap-2">
                  {moodOptions?.map((mood) => (
                    <button
                      key={mood?.value}
                      onClick={() => setEditedMood(mood?.value)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border gentle-transition ${
                        editedMood === mood?.value
                          ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background hover:bg-muted'
                      }`}
                    >
                      <span className="text-lg">{mood?.emoji}</span>
                      <span className="text-sm font-medium">{mood?.label?.split(' ')?.slice(1)?.join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your reflection
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e?.target?.value)}
                  placeholder="Share your thoughts and feelings..."
                  className="w-full h-64 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                  <span>{editedContent?.split(' ')?.filter(word => word?.length > 0)?.length} words</span>
                  <span>{editedContent?.length} characters</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mood Display */}
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl">{getMoodEmoji(entry?.mood)}</div>
                <div>
                  <p className="font-medium text-foreground">{getMoodLabel(entry?.mood)} mood</p>
                  <p className="text-sm text-muted-foreground">
                    Recorded on {formatDate(entry?.date)}
                  </p>
                </div>
              </div>

              {/* Content Display */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Your reflection</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {entry?.content}
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="FileText" size={14} />
                    <span>{entry?.content?.split(' ')?.filter(word => word?.length > 0)?.length} words</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>~{Math.ceil(entry?.content?.split(' ')?.length / 200)} min read</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="text-error hover:bg-error/10"
              >
                Delete Entry
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(entry?.content);
                    setEditedMood(entry?.mood);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                  disabled={!editedContent?.trim()}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="morphic-card p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Entry</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-foreground/80 mb-6">
              Are you sure you want to delete this journal entry? This will permanently remove your reflection and cannot be recovered.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Entry
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryModal;