import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ onExportData, isExporting = false }) => {
  const actionItems = [
    {
      label: 'View Full Calendar',
      description: 'See your mood patterns over time',
      icon: 'Calendar',
      path: '/calendar-view',
      variant: 'default',
      color: 'bg-gradient-to-r from-primary to-primary/80'
    },
    {
      label: 'See Analytics',
      description: 'Detailed insights and trends',
      icon: 'BarChart3',
      path: '/analytics',
      variant: 'outline',
      color: 'bg-gradient-to-r from-secondary to-secondary/80'
    },
    {
      label: 'Journal Entries',
      description: 'Browse all your reflections',
      icon: 'BookOpen',
      path: '/journal-entries',
      variant: 'outline',
      color: 'bg-gradient-to-r from-accent to-accent/80'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actionItems?.map((item) => (
          <Link key={item?.path} to={item?.path} className="block">
            <div className="morphic-card p-4 hover:shadow-medium transition-all duration-300 
                          group cursor-pointer border border-border hover:border-primary/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${item?.color} text-white`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item?.label}
                  </h4>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary 
                           transform group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {item?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Secondary Actions */}
      <div className="morphic-card p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-lg">
              <Icon name="Download" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download your mood tracking data as CSV or JSON
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportData('csv')}
              loading={isExporting}
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportData('json')}
              loading={isExporting}
              iconName="Code"
              iconPosition="left"
              iconSize={14}
            >
              JSON
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <Icon name="Target" size={24} className="text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-green-700">7</div>
          <div className="text-xs text-green-600">Day Goal</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <Icon name="TrendingUp" size={24} className="text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-blue-700">85%</div>
          <div className="text-xs text-blue-600">This Week</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <Icon name="Award" size={24} className="text-purple-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-purple-700">12</div>
          <div className="text-xs text-purple-600">Achievements</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
          <Icon name="Zap" size={24} className="text-orange-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-orange-700">4.2</div>
          <div className="text-xs text-orange-600">Avg Mood</div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;