import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ hasFilters, onClearFilters, onCreateEntry }) => {
  if (hasFilters) {
    return (
      <div className="morphic-card p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No entries found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any journal entries matching your current filters. Try adjusting your search terms or date range.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
          <Button
            variant="default"
            onClick={onCreateEntry}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Create New Entry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="morphic-card p-12 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="BookOpen" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">Start Your Journey</h3>
      <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
        Your journal is empty, but that's just the beginning! Start documenting your thoughts, feelings, and daily reflections to track your mental wellness journey.
      </p>
      
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          onClick={onCreateEntry}
          iconName="Plus"
          iconPosition="left"
          iconSize={18}
          className="px-8"
        >
          Write Your First Entry
        </Button>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} />
            <span>Private & Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={16} />
            <span>Track Your Mood</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} />
            <span>See Your Progress</span>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 p-6 bg-muted/30 rounded-xl">
        <h4 className="font-medium text-foreground mb-3 flex items-center justify-center space-x-2">
          <Icon name="Lightbulb" size={16} />
          <span>Journaling Tips</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="text-center">
            <div className="font-medium text-foreground mb-1">Be Honest</div>
            <div>Write authentically about your feelings and experiences</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground mb-1">Stay Consistent</div>
            <div>Regular entries help you track patterns and progress</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground mb-1">Reflect Deeply</div>
            <div>Ask yourself why you feel certain ways and what you learned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;