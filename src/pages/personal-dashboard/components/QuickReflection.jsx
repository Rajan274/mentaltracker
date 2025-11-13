import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickReflection = ({ reflection, onReflectionChange, onSave, isSaving = false }) => {
  const [localReflection, setLocalReflection] = useState(reflection || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  const prompts = [
    "What made you feel this way today?",
    "Describe your day in a few words...",
    "What are you grateful for today?",
    "How did you take care of yourself today?",
    "What challenged you today?",
    "What brought you joy today?"
  ];

  const [currentPrompt] = useState(prompts?.[Math.floor(Math.random() * prompts?.length)]);

  useEffect(() => {
    setLocalReflection(reflection || '');
  }, [reflection]);

  const handleTextChange = (e) => {
    const value = e?.target?.value;
    setLocalReflection(value);
    setHasChanges(value !== (reflection || ''));
    onReflectionChange(value);

    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new auto-save timeout
    const timeout = setTimeout(() => {
      if (value !== (reflection || '')) {
        onSave(value);
      }
    }, 2000);

    setAutoSaveTimeout(timeout);
  };

  const handleSaveClick = () => {
    onSave(localReflection);
    setHasChanges(false);
  };

  const characterCount = localReflection?.length;
  const maxCharacters = 500;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Quick Reflection</h3>
        {hasChanges && (
          <span className="text-xs text-muted-foreground flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            Auto-saving...
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          value={localReflection}
          onChange={handleTextChange}
          placeholder={currentPrompt}
          className="w-full h-32 p-4 border border-border rounded-xl resize-none 
                   bg-card text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-colors duration-200"
          maxLength={maxCharacters}
        />
        
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {characterCount}/{maxCharacters}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Lightbulb" size={14} />
          <span>Tip: Be honest with yourself - there's no judgment here</span>
        </div>
        
        {hasChanges && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveClick}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            iconSize={14}
          >
            Save Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuickReflection;