import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDeadline, setEditDeadline] = useState(todo.deadline ? todo.deadline.split('T')[0] : '');
    const [editPriority, setEditPriority] = useState(todo.priority || 'Medium');

    const handleToggle = () => {
        onUpdate(todo._id, { completed: !todo.completed });
    };

    const handleSave = () => {
        if (editText.trim()) {
            onUpdate(todo._id, {
                text: editText,
                deadline: editDeadline,
                priority: editPriority
            });
            setIsEditing(false);
        }
    };

    const priorityColors = {
        Low: '#52c41a',
        Medium: '#faad14',
        High: '#ff4d4f'
    };

    return (
        <div className="todo-item" style={{ borderLeft: `4px solid ${priorityColors[todo.priority] || '#ccc'} ` }}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={handleToggle}
            />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input
                            type="text"
                            className="search-input"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="date"
                                className="search-input"
                                value={editDeadline}
                                onChange={(e) => setEditDeadline(e.target.value)}
                            />
                            <select
                                className="search-input"
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Save</button>
                            <button className="btn" onClick={() => setIsEditing(false)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span
                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                            title="Double click to edit"
                        >
                            {todo.text}
                        </span>
                        <div style={{ fontSize: '0.85rem', color: '#888', display: 'flex', gap: '1rem' }}>
                            {todo.deadline && <span>📅 {new Date(todo.deadline).toLocaleDateString()}</span>}
                            <span style={{ color: priorityColors[todo.priority], fontWeight: 'bold' }}>
                                {todo.priority} Priority
                            </span>
                        </div>
                    </>
                )}
            </div>

            {!isEditing && (
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', alignItems: 'center' }}>
                    <button
                        className="btn"
                        style={{ padding: '0.4rem', color: '#646cff' }}
                        onClick={() => setIsEditing(true)}
                        title="Edit"
                    >
                        ✎
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(todo._id)}
                        title="Delete"
                        style={{ padding: '0.4rem' }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;

