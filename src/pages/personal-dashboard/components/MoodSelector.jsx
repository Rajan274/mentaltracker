import React, { useState } from 'react';



const MoodSelector = ({ selectedMood, onMoodSelect, disabled = false }) => {
  const [hoveredMood, setHoveredMood] = useState(null);

  const moodOptions = [
    {
      id: 1,
      label: 'Very Low',
      emoji: '😢',
      color: 'bg-red-100 hover:bg-red-200 border-red-200',
      selectedColor: 'bg-red-200 border-red-300',
      textColor: 'text-red-700'
    },
    {
      id: 2,
      label: 'Low',
      emoji: '😔',
      color: 'bg-orange-100 hover:bg-orange-200 border-orange-200',
      selectedColor: 'bg-orange-200 border-orange-300',
      textColor: 'text-orange-700'
    },
    {
      id: 3,
      label: 'Happy',
      emoji: '😊',
      color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-200',
      selectedColor: 'bg-yellow-200 border-yellow-300',
      textColor: 'text-yellow-700'
    },
    {
      id: 4,
      label: 'Good',
      emoji: '😄',
      color: 'bg-green-100 hover:bg-green-200 border-green-200',
      selectedColor: 'bg-green-200 border-green-300',
      textColor: 'text-green-700'
    },
    {
      id: 5,
      label: 'Great',
      emoji: '😁',
      color: 'bg-blue-100 hover:bg-blue-200 border-blue-200',
      selectedColor: 'bg-blue-200 border-blue-300',
      textColor: 'text-blue-700'
    }
  ];

  const handleMoodClick = (mood) => {
    if (!disabled) {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-foreground mb-4 text-center">
        How are you feeling today?
      </h3>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {moodOptions?.map((mood) => {
          const isSelected = selectedMood?.id === mood?.id;
          const isHovered = hoveredMood === mood?.id;
          
          return (
            <button
              key={mood?.id}
              onClick={() => handleMoodClick(mood)}
              onMouseEnter={() => setHoveredMood(mood?.id)}
              onMouseLeave={() => setHoveredMood(null)}
              disabled={disabled}
              className={`
                flex flex-col items-center justify-center p-4 rounded-2xl border-2 
                transition-all duration-300 ease-out min-w-[100px] h-24
                ${isSelected ? mood?.selectedColor : mood?.color}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transform hover:scale-105'}
                ${isHovered && !disabled ? 'shadow-lg' : 'shadow-sm'}
              `}
            >
              <span className="text-2xl mb-1">{mood?.emoji}</span>
              <span className={`text-xs font-medium ${mood?.textColor}`}>
                {mood?.label}
              </span>
            </button>
          );
        })}
      </div>
      {selectedMood && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            You selected: <span className="font-medium text-foreground">{selectedMood?.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;