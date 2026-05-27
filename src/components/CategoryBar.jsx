import "../styles/categories.css";

const categorias = [
  { id: "todos", label: "Todos", icon: "✨", count: 18 },
  { id: "Perfumes", label: "Perfumes", icon: "🌸", count: 10 },
  { id: "Body Splash", label: "Body Splash", icon: "💧", count: 3 },
  { id: "Cremes", label: "Cremes", icon: "🧴", count: 1 },
  { id: "Eletrônicos", label: "Eletrônicos", icon: "📱", count: 4 },
];

function CategoryBar({ categoriaAtiva, setCategoriaAtiva }) {
  return (
    <section className="categories-section" id="categorias">
      <div className="categories-container">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${categoriaAtiva === cat.id ? "active" : ""}`}
            onClick={() => setCategoriaAtiva(cat.id)}
            id={`cat-${cat.id}`}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
            <span className="category-count">{cat.count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryBar;
