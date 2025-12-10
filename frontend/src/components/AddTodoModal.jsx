import React, { useState } from 'react';

const AddTodoModal = ({ isOpen, onClose, onAdd }) => {
    const [text, setText] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Medium');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text, deadline, priority);
            setText('');
            setDeadline('');
            setPriority('Medium');
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Task Description</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="What needs to be done?"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Deadline</label>
                            <input
                                type="date"
                                className="search-input"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Priority</label>
                            <select
                                className="search-input"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box' }}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodoModal;
