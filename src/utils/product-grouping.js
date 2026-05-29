const VARIANT_SUFFIXES = [
  'Branco',
  'Branca',
  'Preto',
  'Preta',
  'Marrom',
  'Marom',
  'Rose',
  'Rosa',
  'Azul',
  'Vermelho',
  'Vermelha',
  'Dourado',
  'Dourada',
  'Prata',
];

const getProductFamily = (produto) => {
  const suffixPattern = new RegExp(`\\s+(${VARIANT_SUFFIXES.join('|')})$`, 'i');
  const variantMatch = produto.nome.match(suffixPattern);
  const baseName = produto.nome.replace(suffixPattern, '').trim();

  return {
    familyKey: `${produto.marca}|${produto.categoria}|${baseName}`.toLowerCase(),
    baseName,
    variantLabel: variantMatch ? variantMatch[1] : null,
  };
};

export const groupProductVariations = (produtos) => {
  const groupedProducts = new Map();

  produtos.forEach((produto) => {
    const family = getProductFamily(produto);
    const existingProduct = groupedProducts.get(family.familyKey);
    const variation = {
      ...produto,
      variationLabel: family.variantLabel || produto.nome,
    };

    if (existingProduct) {
      existingProduct.variacoes.push(variation);
      existingProduct.estoque += produto.estoque;
      return;
    }

    groupedProducts.set(family.familyKey, {
      ...produto,
      id: family.familyKey,
      nome: family.baseName,
      variacoes: [variation],
    });
  });

  return Array.from(groupedProducts.values()).map((produto) => {
    if (produto.variacoes.length === 1) return produto.variacoes[0];
    return produto;
  });
};
