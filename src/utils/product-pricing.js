export const parsePrice = (price) => {
  if (!price) return 0;

  return Number(
    price
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
};

export const getDiscountPercent = (produto) => {
  const currentPrice = parsePrice(produto.preco);
  const oldPrice = parsePrice(produto.precoAntigo);

  if (!currentPrice || !oldPrice || oldPrice <= currentPrice) return 0;

  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
};

export const getTopDiscountProducts = (produtos, limit) => {
  const sortedProducts = [...produtos]
    .map((produto) => ({
      ...produto,
      descontoPercentual: getDiscountPercent(produto),
    }))
    .filter((produto) => produto.descontoPercentual > 0)
    .sort((a, b) => b.descontoPercentual - a.descontoPercentual);

  return typeof limit === "number" ? sortedProducts.slice(0, limit) : sortedProducts;
};
