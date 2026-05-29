import React from 'react';
import '../styles/apple-store.css';
import '../styles/categories.css';

export default function CategoryRibbon({ categorias, ativa, setAtiva }) {
  const cats = categorias || [];

  const getCategoryValue = (category) => {
    if (typeof category === 'string') return category;
    return category.value;
  };

  const getCategoryLabel = (category) => {
    if (typeof category === 'string') return category;
    return category.label;
  };

  const getInitial = (category) => {
    if (category === 'todos') return '∞';
    if (typeof category === 'object' && category.initial) return category.initial;
    return getCategoryLabel(category).charAt(0).toUpperCase();
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
        const value = getCategoryValue(cat);
        const label = getCategoryLabel(cat);

        if (value.toLowerCase() === 'todos') return null;

        const isAtiva = ativa === value;

        return (
          <button
            key={value || i}
            className={`category-orb ${isAtiva ? 'active' : ''}`}
            type="button"
            onClick={() => setAtiva(value)}
            aria-pressed={isAtiva}
          >
            <div className="category-orb-icon">{getInitial(cat)}</div>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
