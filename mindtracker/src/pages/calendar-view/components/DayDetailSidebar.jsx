import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DayDetailSidebar = ({ 
  selectedDate, 
  moodEntry, 
  onClose, 
  onSaveMood, 
  onDeleteEntry,
  formatDate 
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editMood, setEditMood] = useState(moodEntry?.mood || 3);
  const [editReflection, setEditReflection] = useState(moodEntry?.reflection || '');

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'text-red-500' },
    { value: 2, emoji: '😕', label: 'Low', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 4, emoji: '😊', label: 'Good', color: 'text-green-500' },
    { value: 5, emoji: '😄', label: 'Great', color: 'text-emerald-500' }
  ];

  const handleSave = () => {
    const entryData = {
      date: formatDate(selectedDate),
      mood: editMood,
      reflection: editReflection?.trim(),
      timestamp: new Date()?.toISOString()
    };
    
    onSaveMood(entryData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMood(moodEntry?.mood || 3);
    setEditReflection(moodEntry?.reflection || '');
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDeleteEntry(formatDate(selectedDate));
      onClose();
    }
  };

  const formatDateDisplay = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date?.toLocaleDateString('en-US', options);
  };

  const isToday = () => {
    const today = new Date();
    return selectedDate?.toDateString() === today?.toDateString();
  };

  const isFutureDate = () => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected?.setHours(0, 0, 0, 0);
    return selected > today;
  };

  if (!selectedDate) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-pronounced z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {isToday() ? 'Today' : formatDateDisplay(selectedDate)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(selectedDate)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="w-8 h-8 p-0"
          />
        </div>

        {isFutureDate() ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              You can't track mood for future dates.
            </p>
          </div>
        ) : (
          <>
            {/* Mood Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-foreground">Mood</h3>
                {!editMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditMode(true)}
                    iconName="Edit2"
                    iconSize={14}
                  >
                    Edit
                  </Button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {moodOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => setEditMood(option?.value)}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-200 text-center
                          ${editMood === option?.value 
                            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                          }
                        `}
                      >
                        <div className="text-2xl mb-1">{option?.emoji}</div>
                        <div className="text-xs text-muted-foreground">{option?.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  {moodEntry ? (
                    <>
                      <span className="text-3xl">
                        {moodOptions?.find(m => m?.value === moodEntry?.mood)?.emoji}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {moodOptions?.find(m => m?.value === moodEntry?.mood)?.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mood level {moodEntry?.mood}/5
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Icon name="Plus" size={20} />
                      <span>No mood recorded</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reflection Section */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-foreground mb-4">Reflection</h3>
              
              {editMode ? (
                <Input
                  type="text"
                  placeholder="How are you feeling today? What's on your mind?"
                  value={editReflection}
                  onChange={(e) => setEditReflection(e?.target?.value)}
                  className="min-h-[100px] resize-none"
                />
              ) : (
                <div className="p-4 bg-muted/30 rounded-lg min-h-[100px]">
                  {moodEntry?.reflection ? (
                    <p className="text-foreground whitespace-pre-wrap">
                      {moodEntry?.reflection}
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No reflection written for this day.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {editMode ? (
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  iconName="Check"
                  iconPosition="left"
                  className="flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  iconName="X"
                  iconPosition="left"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => setEditMode(true)}
                  iconName="Edit2"
                  iconPosition="left"
                  fullWidth
                >
                  {moodEntry ? 'Edit Entry' : 'Add Entry'}
                </Button>
                
                {moodEntry && (
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    iconName="Trash2"
                    iconPosition="left"
                    fullWidth
                  >
                    Delete Entry
                  </Button>
                )}
              </div>
            )}

            {/* Entry Info */}
            {moodEntry && !editMode && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>
                    Last updated: {new Date(moodEntry.timestamp)?.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DayDetailSidebar;