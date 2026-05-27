import React from 'react';
import '../styles/apple-store.css';

export default function StoreHeader() {
  return (
    <div style={{ maxWidth: '1200px', margin: '80px auto 40px', padding: '0 24px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: '600', color: '#1d1d1f', lineHeight: '1.08', letterSpacing: '-0.01em' }}>
        Loja. <span style={{ color: '#6e6e73' }}>O melhor jeito de comprar os produtos que você ama.</span>
      </h1>
    </div>
  );
}
