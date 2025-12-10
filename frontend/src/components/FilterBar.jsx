import React from 'react';

const FilterBar = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    className={`btn filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`btn filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Pending
                </button>
                <button
                    className={`btn filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
