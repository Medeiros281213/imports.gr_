import { useMemo } from 'react';
import CardProduto from './CardProduto';
import { groupProductVariations } from '../utils/product-grouping';
import '../styles/apple-store.css';

export default function ProductGrid({ title, subtitle, produtos }) {
  const gridItems = useMemo(() => groupProductVariations(produtos), [produtos]);

  if (gridItems.length === 0) return null;

  return (
    <section className="as-section">
      <div className="as-header">
        <h2>{title} <span style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</span></h2>
      </div>

      <div className="as-product-grid">
        {gridItems.map((produto, index) => (
          <CardProduto produto={produto} index={index} key={`${produto.id}-${index}`} />
        ))}
      </div>
    </section>
  );
}
