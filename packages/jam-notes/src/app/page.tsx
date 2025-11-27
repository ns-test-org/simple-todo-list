'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 ring-8 ring-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            📝 Coops Todos
          </h1>
          <p className="text-gray-600 text-lg font-medium">Stay organized and productive</p>
        </div>
        
        {/* Add todo input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg font-medium shadow-inner"
          />
          <button
            onClick={addTodo}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all transform hover:scale-105 font-bold shadow-xl text-lg"
          >
            ✨ Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-3 mb-6">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-8xl mb-4">🎯</div>
              <p className="text-gray-500 text-xl font-medium">
                No tasks yet. Add your first task above!
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl hover:from-purple-50 hover:to-blue-50 hover:border-purple-200 transition-all transform hover:scale-[1.02] group shadow-lg"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 text-purple-500 bg-white border-2 border-gray-300 rounded-lg focus:ring-purple-400 focus:ring-4 transition-all"
                />
                <span
                  className={`flex-1 text-lg font-medium ${
                    todo.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-800'
                  } transition-all`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 font-bold shadow-md"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="pt-6 border-t-2 border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">{todos.length}</div>
                <div className="text-blue-500 text-sm font-semibold">Total</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 border-2 border-green-200 shadow-lg">
                <div className="text-3xl font-bold text-green-600">{todos.filter(t => t.completed).length}</div>
                <div className="text-green-500 text-sm font-semibold">Done</div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 border-2 border-purple-200 shadow-lg">
                <div className="text-3xl font-bold text-purple-600">{todos.filter(t => !t.completed).length}</div>
                <div className="text-purple-500 text-sm font-semibold">Left</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm font-medium">
          Built with ❤️ by{' '}
          <a 
            href="https://nullshot.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/90 underline decoration-white/50 hover:decoration-white transition-all"
          >
            nullshot.ai
          </a>
        </p>
      </div>
    </div>
  );
}






















