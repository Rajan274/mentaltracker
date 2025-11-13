import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchAndFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedMood, 
  onMoodChange, 
  dateRange, 
  onDateRangeChange, 
  sortBy, 
  onSortChange,
  onClearFilters 
}) => {
  const moodOptions = [
    { value: 'all', label: 'All Moods' },
    { value: 'great', label: '🤩 Great' },
    { value: 'good', label: '😄 Good' },
    { value: 'happy', label: '😊 Happy' },
    { value: 'low', label: '😔 Low' },
    { value: 'very-low', label: '😢 Very Low' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'mood-high', label: 'Highest Mood' },
    { value: 'mood-low', label: 'Lowest Mood' },
    { value: 'word-count', label: 'Word Count' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const hasActiveFilters = searchTerm || selectedMood !== 'all' || dateRange !== 'all' || sortBy !== 'newest';

  return (
    <div className="morphic-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search your reflections..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
          <Select
            options={moodOptions}
            value={selectedMood}
            onChange={onMoodChange}
            placeholder="Filter by mood"
            className="sm:w-40"
          />

          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={onDateRangeChange}
            placeholder="Date range"
            className="sm:w-40"
          />

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="sm:w-40"
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="default"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="sm:w-auto"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {searchTerm && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <Icon name="Search" size={12} />
                <span>"{searchTerm}"</span>
              </div>
            )}
            
            {selectedMood !== 'all' && (
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-sm">
                <Icon name="Heart" size={12} />
                <span>{moodOptions?.find(m => m?.value === selectedMood)?.label}</span>
              </div>
            )}
            
            {dateRange !== 'all' && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-sm">
                <Icon name="Calendar" size={12} />
                <span>{dateRangeOptions?.find(d => d?.value === dateRange)?.label}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;