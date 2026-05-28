import React from 'react';
import '../styles/apple-store.css';
import '../styles/categories.css';

export default function CategoryRibbon({ categorias, ativa, setAtiva }) {
  const cats = categorias || [];

  const getInitial = (category) => {
    if (category === 'todos') return '∞';
    return category.charAt(0).toUpperCase();
  };

  return (
    <div className="as-carousel category-ribbon">
      <button
        className={`category-orb ${ativa === 'todos' ? 'active' : ''}`}
        type="button"
        onClick={() => setAtiva('todos')}
        aria-pressed={ativa === 'todos'}
      >
        <div className="category-orb-icon">{getInitial('todos')}</div>
        <span>Todos</span>
      </button>

      {cats.map((cat, i) => {
        if (cat.toLowerCase() === 'todos') return null;
        const isAtiva = ativa === cat;

        return (
          <button
            key={i}
            className={`category-orb ${isAtiva ? 'active' : ''}`}
            type="button"
            onClick={() => setAtiva(cat)}
            aria-pressed={isAtiva}
          >
            <div className="category-orb-icon">{getInitial(cat)}</div>
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
