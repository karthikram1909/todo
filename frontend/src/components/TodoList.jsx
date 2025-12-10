import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
    if (todos.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
                <p>No tasks found. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo._id || todo.tempId}
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodoList;
