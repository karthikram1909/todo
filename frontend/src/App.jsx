import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import client from './api/client';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial Load from LS and API
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
      setLoading(false);
    }

    fetchTodos();
  }, []);

  // Sync to LS whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const res = await client.get('/');
      setTodos(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Fallback to LS if API fails is already handled by initial load
    }
  };

  const handleAddTodo = async (text, deadline, priority) => {
    // Optimistic update
    const tempId = Date.now().toString();
    const newTodo = { _id: tempId, text, deadline, priority, completed: false, tempId };
    setTodos(prev => [newTodo, ...prev]);

    try {
      const res = await client.post('/', { text, deadline, priority });
      // Replace temp todo with real one
      setTodos(prev => prev.map(t => t.tempId === tempId ? res.data : t));
    } catch (error) {
      console.error('Error adding todo:', error);
      // Revert on failure
      setTodos(prev => prev.filter(t => t.tempId !== tempId));
      alert('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    // Optimistic
    setTodos(prev => prev.map(t => t._id === id ? { ...t, ...updates } : t));

    try {
      await client.put(`/${id}`, updates);
    } catch (error) {
      console.error('Error updating todo:', error);
      // Revert (this is simplified, ideally we fetch fresh state)
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    // Optimistic
    const oldTodos = [...todos];
    setTodos(prev => prev.filter(t => t._id !== id));

    try {
      await client.delete(`/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setTodos(oldTodos);
      alert('Failed to delete todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ? true :
        filter === 'completed' ? todo.completed :
          !todo.completed;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      <h1>My Task List</h1>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TodoList
        todos={filteredTodos}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
      />

      <button className="btn btn-primary add-fab" onClick={() => setIsModalOpen(true)}>
        +
      </button>
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />
    </div>
  );
}

export default App;
