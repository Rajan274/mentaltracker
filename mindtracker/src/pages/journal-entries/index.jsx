import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';

import EntryCard from './components/EntryCard';
import SearchAndFilters from './components/SearchAndFilters';
import EntryModal from './components/EntryModal';
import BulkActions from './components/BulkActions';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';

const JournalEntries = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const entriesPerPage = 6;

  // Mock journal entries data
  useEffect(() => {
    const mockEntries = [
      {
        id: 1,
        date: "2024-11-12T09:30:00.000Z",
        mood: "good",
        content: `Had a wonderful morning walk in the park today. The autumn leaves were absolutely beautiful, and I felt a sense of peace watching the sunrise through the trees.\n\nI've been practicing mindfulness more regularly, and I can really feel the difference in my daily stress levels. Taking time to breathe and be present has become such an important part of my routine.\n\nWork was challenging but manageable. I'm learning to set better boundaries and not take on more than I can handle. It's a work in progress, but I'm proud of the small steps I'm taking.`,
        createdAt: "2024-11-12T09:30:00.000Z",
        updatedAt: "2024-11-12T09:30:00.000Z"
      },
      {
        id: 2,
        date: "2024-11-11T20:15:00.000Z",
        mood: "happy",
        content: `Spent quality time with family today. We had a lovely dinner together and shared stories from our week. These moments remind me of what truly matters in life.\n\nI'm grateful for the support system I have. Sometimes I forget how lucky I am to have people who care about me and want to see me succeed.\n\nFeeling optimistic about the week ahead. I have some exciting projects coming up at work, and I'm looking forward to the challenges they'll bring.`,
        createdAt: "2024-11-11T20:15:00.000Z",
        updatedAt: "2024-11-11T20:15:00.000Z"
      },
      {
        id: 3,
        date: "2024-11-10T14:45:00.000Z",
        mood: "low",
        content: `Today was tough. I woke up feeling overwhelmed and anxious about everything on my plate. Sometimes it feels like I'm drowning in responsibilities.\n\nI tried to practice some of the coping strategies my therapist taught me - deep breathing, grounding exercises, and reminding myself that feelings are temporary.\n\nBy evening, I felt a bit better. I realized that it's okay to have difficult days, and they don't define my overall progress. Tomorrow is a new opportunity to try again.`,
        createdAt: "2024-11-10T14:45:00.000Z",
        updatedAt: "2024-11-10T14:45:00.000Z"
      },
      {
        id: 4,
        date: "2024-11-09T11:20:00.000Z",
        mood: "great",
        content: `What an amazing day! I finally completed that project I've been working on for weeks. The sense of accomplishment is incredible.\n\nI also received some wonderful feedback from my supervisor, which really boosted my confidence. It's nice to know that my hard work is being recognized and appreciated.\n\nCelebrated with a nice dinner out and treated myself to a book I've been wanting to read. Self-care and celebrating wins, no matter how small, is so important for maintaining good mental health.`,
        createdAt: "2024-11-09T11:20:00.000Z",
        updatedAt: "2024-11-09T11:20:00.000Z"
      },
      {
        id: 5,
        date: "2024-11-08T16:30:00.000Z",
        mood: "happy",
        content: `Started my day with yoga and meditation. It's becoming such a positive habit that sets the tone for everything else.\n\nHad a productive work session and managed to cross several items off my to-do list. There's something satisfying about being organized and making progress on goals.\n\nEvening was spent reading and listening to music. Simple pleasures like these remind me that happiness doesn't always come from big events - sometimes it's found in quiet, peaceful moments.`,
        createdAt: "2024-11-08T16:30:00.000Z",
        updatedAt: "2024-11-08T16:30:00.000Z"
      },
      {
        id: 6,
        date: "2024-11-07T13:10:00.000Z",
        mood: "very-low",
        content: `Struggling today. Everything feels heavy and difficult. I know these feelings will pass, but right now it's hard to see beyond the fog.\n\nI'm trying to be gentle with myself and not judge these emotions. My therapist always reminds me that it's okay to not be okay sometimes.\n\nI reached out to a friend for support, which was hard but necessary. Connection with others, even when I don't feel like it, usually helps me feel less alone in these moments.`,
        createdAt: "2024-11-07T13:10:00.000Z",
        updatedAt: "2024-11-07T13:10:00.000Z"
      },
      {
        id: 7,
        date: "2024-11-06T19:45:00.000Z",
        mood: "good",
        content: `Had therapy today, which always leaves me feeling more centered and clear-headed. We worked on some strategies for managing work stress and setting healthier boundaries.\n\nI'm learning that saying 'no' to things that drain my energy is actually saying 'yes' to my mental health and wellbeing.\n\nTook a long bath tonight with some essential oils and candles. Self-care rituals like this help me transition from the busyness of the day to a more peaceful evening.`,
        createdAt: "2024-11-06T19:45:00.000Z",
        updatedAt: "2024-11-06T19:45:00.000Z"
      },
      {
        id: 8,
        date: "2024-11-05T10:25:00.000Z",
        mood: "happy",
        content: `Beautiful weather today inspired me to spend more time outdoors. I went for a hike in the nearby nature preserve and felt so connected to the natural world.\n\nThere's something about being in nature that instantly calms my mind and puts things in perspective. The fresh air and physical activity were exactly what I needed.\n\nMet up with a friend for coffee afterward and had some really meaningful conversations. Good friends who listen without judgment are such a blessing.`,
        createdAt: "2024-11-05T10:25:00.000Z",
        updatedAt: "2024-11-05T10:25:00.000Z"
      }
    ];
    setEntries(mockEntries);
  }, []);

  // Filter and sort entries
  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries;

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(entry =>
        entry?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Mood filter
    if (selectedMood !== 'all') {
      filtered = filtered?.filter(entry => entry?.mood === selectedMood);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered?.filter(entry => {
        const entryDate = new Date(entry.date);
        
        switch (dateRange) {
          case 'today':
            return entryDate >= today;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return entryDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            return entryDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
            return entryDate >= quarterAgo;
          case 'year':
            const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            return entryDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Sort entries
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'mood-high':
          const moodOrder = { 'great': 5, 'good': 4, 'happy': 3, 'low': 2, 'very-low': 1 };
          return moodOrder?.[b?.mood] - moodOrder?.[a?.mood];
        case 'mood-low':
          const moodOrderLow = { 'great': 5, 'good': 4, 'happy': 3, 'low': 2, 'very-low': 1 };
          return moodOrderLow?.[a?.mood] - moodOrderLow?.[b?.mood];
        case 'word-count':
          return b?.content?.split(' ')?.length - a?.content?.split(' ')?.length;
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  }, [entries, searchTerm, selectedMood, dateRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEntries?.length / entriesPerPage);
  const paginatedEntries = filteredAndSortedEntries?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMood, dateRange, sortBy]);

  const handleEntrySelect = (entryId, isSelected) => {
    if (isSelected) {
      setSelectedEntries([...selectedEntries, entryId]);
    } else {
      setSelectedEntries(selectedEntries?.filter(id => id !== entryId));
    }
  };

  const handleSelectAll = () => {
    setSelectedEntries(filteredAndSortedEntries?.map(entry => entry?.id));
  };

  const handleDeselectAll = () => {
    setSelectedEntries([]);
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteEntry = (entry) => {
    setEntries(entries?.filter(e => e?.id !== entry?.id));
    setSelectedEntries(selectedEntries?.filter(id => id !== entry?.id));
    setIsModalOpen(false);
  };

  const handleExpandEntry = (entry) => {
    setSelectedEntry(entry);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveEntry = (updatedEntry) => {
    setEntries(entries?.map(entry => 
      entry?.id === updatedEntry?.id ? updatedEntry : entry
    ));
  };

  const handleBulkDelete = (entryIds) => {
    setEntries(entries?.filter(entry => !entryIds?.includes(entry?.id)));
    setSelectedEntries([]);
  };

  const handleBulkExport = (entryIds, format) => {
    const entriesToExport = entries?.filter(entry => entryIds?.includes(entry?.id));
    
    let exportData;
    let filename;
    let mimeType;

    switch (format) {
      case 'csv':
        const csvHeaders = 'Date,Mood,Content,Word Count\n';
        const csvRows = entriesToExport?.map(entry => 
          `"${new Date(entry.date)?.toLocaleDateString()}","${entry?.mood}","${entry?.content?.replace(/"/g, '""')}","${entry?.content?.split(' ')?.length}"`
        )?.join('\n');
        exportData = csvHeaders + csvRows;
        filename = `journal-entries-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
        mimeType = 'text/csv';
        break;
      
      case 'txt':
        exportData = entriesToExport?.map(entry => 
          `Date: ${new Date(entry.date)?.toLocaleDateString()}\nMood: ${entry?.mood}\n\n${entry?.content}\n\n${'='?.repeat(50)}\n\n`
        )?.join('');
        filename = `journal-entries-${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
        mimeType = 'text/plain';
        break;
      
      case 'json':
      default:
        exportData = JSON.stringify(entriesToExport, null, 2);
        filename = `journal-entries-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMood('all');
    setDateRange('all');
    setSortBy('newest');
  };

  const handleCreateEntry = () => {
    navigate('/personal-dashboard');
  };

  const hasActiveFilters = searchTerm || selectedMood !== 'all' || dateRange !== 'all' || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="main-content">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Journal Entries</h1>
              <p className="text-muted-foreground">
                Explore your thoughts and track your mental wellness journey
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleCreateEntry}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              className="mt-4 lg:mt-0"
            >
              New Entry
            </Button>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedEntries={selectedEntries}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            totalEntries={entries?.length}
            filteredEntries={filteredAndSortedEntries?.length}
          />

          {/* Entries List */}
          {filteredAndSortedEntries?.length === 0 ? (
            <EmptyState
              hasFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              onCreateEntry={handleCreateEntry}
            />
          ) : (
            <>
              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredAndSortedEntries?.length} {filteredAndSortedEntries?.length === 1 ? 'entry' : 'entries'} found
                  {hasActiveFilters && ` (filtered from ${entries?.length} total)`}
                </p>
                
                {selectedEntries?.length === 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const allVisible = paginatedEntries?.map(entry => entry?.id);
                      setSelectedEntries(allVisible);
                    }}
                    iconName="CheckSquare"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Select Page
                  </Button>
                )}
              </div>

              {/* Entries Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {paginatedEntries?.map((entry) => (
                  <div key={entry?.id} className="relative">
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <Checkbox
                        checked={selectedEntries?.includes(entry?.id)}
                        onChange={(e) => handleEntrySelect(entry?.id, e?.target?.checked)}
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    </div>
                    
                    <EntryCard
                      entry={entry}
                      onEdit={handleEditEntry}
                      onDelete={handleDeleteEntry}
                      onExpand={handleExpandEntry}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={filteredAndSortedEntries?.length}
                entriesPerPage={entriesPerPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
      {/* Entry Modal */}
      <EntryModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
        mode={modalMode}
      />
    </div>
  );
};

export default JournalEntries;