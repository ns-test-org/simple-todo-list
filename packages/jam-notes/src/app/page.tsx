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
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ✨ Todo List
          </h1>
          <p className="text-white/70 text-sm">Stay organized and productive</p>
        </div>
        
        {/* Add todo input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 font-medium shadow-lg"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-3 mb-6">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-white/60 text-lg">
                No tasks yet. Add your first task above!
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-4 p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl hover:bg-slate-700/50 transition-all transform hover:scale-[1.02] group"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 text-orange-500 bg-slate-700/50 border-slate-500 rounded-md focus:ring-orange-400 focus:ring-2"
                />
                <span
                  className={`flex-1 text-lg ${
                    todo.completed
                      ? 'text-white/50 line-through'
                      : 'text-white'
                  } transition-all`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-3 py-2 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="pt-6 border-t border-slate-600/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/40 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{todos.length}</div>
                <div className="text-slate-300 text-sm">Total</div>
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">{todos.filter(t => t.completed).length}</div>
                <div className="text-slate-300 text-sm">Done</div>
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-400">{todos.filter(t => !t.completed).length}</div>
                <div className="text-slate-300 text-sm">Left</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}















