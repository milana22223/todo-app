import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  // 🔹 НОВОЕ: Состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderBottom: '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      
      {/* 🔹 НОВОЕ: Условный рендеринг: текст или поле ввода */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '4px',
            fontSize: '14px',
            border: '1px solid #007bff',
            borderRadius: '4px'
          }}
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : '#333',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Двойной клик для редактирования"
        >
          {task.text}
        </span>
      )}

      <button 
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;