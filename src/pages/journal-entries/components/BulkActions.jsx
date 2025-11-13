import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ 
  selectedEntries, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkExport,
  totalEntries,
  filteredEntries 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  const selectedCount = selectedEntries?.length;
  const isAllSelected = selectedCount === filteredEntries && filteredEntries > 0;
  const isPartiallySelected = selectedCount > 0 && selectedCount < filteredEntries;

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleBulkDelete = () => {
    onBulkDelete(selectedEntries);
    setShowDeleteConfirm(false);
  };

  const handleExport = () => {
    onBulkExport(selectedEntries, exportFormat);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="morphic-card p-4 mb-6 bg-primary/5 border border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isPartiallySelected}
              onChange={handleSelectAllToggle}
              label={`${selectedCount} of ${filteredEntries} entries selected`}
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 mr-4">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e?.target?.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="txt">Text</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export ({selectedCount})
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-error hover:bg-error/10"
            >
              Delete ({selectedCount})
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              iconName="X"
              iconSize={16}
            >
            </Button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="morphic-card p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Multiple Entries</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-foreground/80 mb-6">
              Are you sure you want to delete {selectedCount} journal {selectedCount === 1 ? 'entry' : 'entries'}? 
              This will permanently remove your reflections and cannot be recovered.
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
                onClick={handleBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete {selectedCount} {selectedCount === 1 ? 'Entry' : 'Entries'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;