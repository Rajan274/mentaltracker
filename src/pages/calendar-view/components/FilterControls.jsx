import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  activeFilter, 
  onFilterChange, 
  moodEntries, 
  currentDate 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Entries' },
    { value: 'mood-only', label: 'Mood Only' },
    { value: 'with-journal', label: 'With Journal' },
    { value: 'mood-1', label: 'Very Low Mood' },
    { value: 'mood-2', label: 'Low Mood' },
    { value: 'mood-3', label: 'Neutral Mood' },
    { value: 'mood-4', label: 'Good Mood' },
    { value: 'mood-5', label: 'Great Mood' }
  ];

  const getFilteredCount = () => {
    const entriesThisMonth = moodEntries?.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate?.getMonth() === currentDate?.getMonth() && 
             entryDate?.getFullYear() === currentDate?.getFullYear();
    });

    switch (activeFilter) {
      case 'all':
        return entriesThisMonth?.length;
      case 'mood-only':
        return entriesThisMonth?.filter(entry => !entry?.reflection || entry?.reflection?.trim()?.length === 0)?.length;
      case 'with-journal':
        return entriesThisMonth?.filter(entry => entry?.reflection && entry?.reflection?.trim()?.length > 0)?.length;
      case 'mood-1': case'mood-2': case'mood-3': case'mood-4': case'mood-5':
        const moodLevel = parseInt(activeFilter?.split('-')?.[1]);
        return entriesThisMonth?.filter(entry => entry?.mood === moodLevel)?.length;
      default:
        return entriesThisMonth?.length;
    }
  };

  const clearFilter = () => {
    onFilterChange('all');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter Entries</span>
        </div>
        
        <Select
          options={filterOptions}
          value={activeFilter}
          onChange={onFilterChange}
          placeholder="Select filter"
          className="w-48"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{getFilteredCount()}</span> entries
        </div>
        
        {activeFilter !== 'all' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterControls;