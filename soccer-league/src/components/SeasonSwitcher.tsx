import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Calendar } from 'lucide-react';
import './SeasonSwitcher.css';

// Mock Seasons data for MVP display purposes
const MOCK_SEASONS = [
    { id: 's1', name: 'Fall 2026', status: 'active' },
    { id: 's2', name: 'Spring 2026', status: 'archived' },
    { id: 's3', name: 'Fall 2025', status: 'archived' },
];

export function SeasonSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determine active season from URL or fallback to first 'active' mock season
    const currentSeasonId = searchParams.get('season_id') || MOCK_SEASONS.find(s => s.status === 'active')?.id;
    const currentSeason = MOCK_SEASONS.find(s => s.id === currentSeasonId) || MOCK_SEASONS[0];

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectSeason = (seasonId: string) => {
        // Update the URL with the selected season
        searchParams.set('season_id', seasonId);
        setSearchParams(searchParams);
        setIsOpen(false);
    };

    return (
        <div className="season-switcher" ref={dropdownRef}>
            <button
                className="season-switcher-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="season-icon-wrapper">
                    <Calendar size={16} />
                </div>
                <div className="season-info-text">
                    <span className="season-label">Season</span>
                    <span className="season-name">
                        {currentSeason.name}
                        {currentSeason.status === 'archived' && <span className="archive-badge">Archived</span>}
                    </span>
                </div>
                <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <div className="season-dropdown-menu">
                    <div className="dropdown-header">Select Season</div>
                    {MOCK_SEASONS.map(season => (
                        <button
                            key={season.id}
                            className={`season-dropdown-item ${season.id === currentSeasonId ? 'selected' : ''}`}
                            onClick={() => handleSelectSeason(season.id)}
                        >
                            <span className="item-name">{season.name}</span>
                            {season.status === 'archived' && <span className="archive-badge small">Archived</span>}
                            {season.status === 'active' && <span className="active-dot" title="Current Season" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
