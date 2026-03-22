// ... импорты остаются без изменений

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  
  // 🔹 НОВОЕ: Состояние для темы
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 🔹 НОВОЕ: Функция редактирования задачи
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  // 🔹 НОВОЕ: Динамические стили в зависимости от темы
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

  return (
    <div style={appStyles}>
      {/* 🔹 НОВОЕ: Заголовок с кнопкой переключения темы */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: isDark ? '#fff' : '#333',
          margin: 0,
          flex: 1 
        }}>
          Менеджер задач
        </h1>
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
            marginLeft: '10px'
          }}
        >
          {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </div>
      
      <AddTodoForm onAdd={addTodo} />
      
      <TodoFilters 
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />
      
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: isDark ? '#aaa' : '#999' }}>
          {filter === 'all' ? 'Задач пока нет' : 
           filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}  // 🔹 НОВОЕ: передаём функцию редактирования
            />
          ))}
        </ul>
      )}
      
      {todos.length > 0 && (
        <button 
          onClick={() => setTodos([])}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Очистить всё
        </button>
      )}
    </div>
  );
}

export default App;