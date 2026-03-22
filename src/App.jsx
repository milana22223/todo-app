import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  // 🔹 Состояние для списка задач (с загрузкой из localStorage)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Состояние для текущего фильтра
  const [filter, setFilter] = useState('all');

  // 🔹 Состояние для темы (с загрузкой из localStorage)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });

  // 🔹 Сохранение задач в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 🔹 Сохранение темы в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  // 🔹 Добавление новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // 🔹 Переключение статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 🔹 Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 🔹 Редактирование задачи
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // 🔹 Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // 🔹 Подсчет активных задач
  const activeCount = todos.filter(todo => !todo.completed).length;

  // 🔹 Динамические стили в зависимости от темы
  const appStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: isDark ? '#333' : '#fff',
    color: isDark ? '#fff' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s'
  };

  const headerStyles = {
    textAlign: 'center',
    color: isDark ? '#fff' : '#333',
    margin: '0 0 20px 0'
  };

  const clearButtonStyles = {
    marginTop: '20px',
    padding: '8px 16px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '14px'
  };

  const emptyMessageStyles = {
    textAlign: 'center',
    color: isDark ? '#aaa' : '#999'
  };

  return (
    <div style={appStyles}>
      {/* 🔹 Заголовок с кнопкой переключения темы */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h1 style={headerStyles}>Менеджер задач</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '8px 16px',
            background: isDark ? '#fff' : '#333',
            color: isDark ? '#333' : '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            whiteSpace: 'nowrap'
          }}
          aria-label="Переключить тему"
        >
          {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </div>
      
      {/* 🔹 Форма добавления задачи */}
      <AddTodoForm onAdd={addTodo} isDark={isDark} />
      
      {/* 🔹 Фильтры и счётчик */}
      <TodoFilters 
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        isDark={isDark}
      />
      
      {/* 🔹 Список задач или сообщение о пустом списке */}
      {filteredTodos.length === 0 ? (
        <p style={emptyMessageStyles}>
          {filter === 'all' ? 'Задач пока нет' : 
           filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isDark={isDark}
            />
          ))}
        </ul>
      )}
      
      {/* 🔹 Кнопка очистки всех задач */}
      {todos.length > 0 && (
        <button 
          onClick={() => setTodos([])}
          style={clearButtonStyles}
        >
          Очистить всё
        </button>
      )}
    </div>
  );
}

export default App;