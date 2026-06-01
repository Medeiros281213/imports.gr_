import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryRibbon from "../components/CategoryRibbon";
import ProductShelf from "../components/ProductShelf";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import produtos from "../data/produtos";
import { getTopDiscountProducts } from "../utils/product-pricing";
import "../styles/card.css";

const getCategoryLabel = (categoria) => {
  if (categoria.toLowerCase().includes("eletr")) return "Eletr\u00f4nicos";
  return categoria;
};

function Catalogo({ navigate, currentUser, onLogout }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState(() => (
    window.location.hash === "#promocoes" ? "promocoes" : "todos"
  ));
  const [termoBusca, setTermoBusca] = useState("");

  const categorias = useMemo(() => {
    const categoriasProdutos = Array.from(new Set(produtos.map((produto) => produto.categoria)))
      .map((categoria) => ({
        value: categoria,
        label: getCategoryLabel(categoria),
      }));

    return [
      { value: "promocoes", label: "Promo\u00e7\u00f5es", initial: "%" },
      ...categoriasProdutos,
    ];
  }, []);

  const categoriasProdutos = categorias.filter((categoria) => categoria.value !== "promocoes");

  const isKitProduto = (produto) => {
    const nome = produto.nome.toLowerCase();
    const badge = produto.badge?.toLowerCase() || "";

    return nome.includes("kit") || badge.includes("kit");
  };

  const renderPerfumeShelves = (listaProdutos) => {
    const kits = listaProdutos.filter(isKitProduto);
    const perfumes = listaProdutos.filter((produto) => !isKitProduto(produto));

    return (
      <>
        {kits.length > 0 && (
          <ProductShelf
            title="Kits de Perfumes."
            subtitle="Combos exclusivos"
            produtos={kits}
          />
        )}

        {perfumes.length > 0 && (
          <ProductShelf
            title="Perfumes."
            subtitle="Explore as opcoes"
            produtos={perfumes}
          />
        )}
      </>
    );
  };

  const renderPromocoesPorCategoria = (listaProdutos) => (
    <>
      {categoriasProdutos.map((cat) => {
        const produtosCategoria = listaProdutos.filter((produto) => produto.categoria === cat.value);
        if (produtosCategoria.length === 0) return null;

        return (
          <ProductGrid
            key={`promocoes-${cat.value}`}
            title={`${cat.label}.`}
            subtitle="Promocoes em destaque"
            produtos={produtosCategoria}
          />
        );
      })}
    </>
  );

  const produtosFiltrados = useMemo(() => {
    let filtrados = categoriaAtiva === "promocoes" ? getTopDiscountProducts(produtos) : produtos;

    if (categoriaAtiva !== "todos" && categoriaAtiva !== "promocoes") {
      filtrados = filtrados.filter((p) => p.categoria === categoriaAtiva);
    }

    if (termoBusca.trim() !== "") {
      const termo = termoBusca.toLowerCase();
      filtrados = filtrados.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.marca.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
      );
    }

    return filtrados;
  }, [categoriaAtiva, termoBusca]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const syncFilterFromHash = () => {
      if (window.location.hash === "#promocoes") {
        setCategoriaAtiva("promocoes");
      }
    };

    window.addEventListener("hashchange", syncFilterFromHash);
    syncFilterFromHash();

    return () => window.removeEventListener("hashchange", syncFilterFromHash);
  }, []);

  const activeLabel = categorias.find((categoria) => categoria.value === categoriaAtiva)?.label || categoriaAtiva;

  return (
    <div className="app-wrapper" style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar onSearch={setTermoBusca} navigate={navigate} currentUser={currentUser} onLogout={onLogout} />

      <main>
        <section className="catalog-page-hero" id="catalogo">
          <span className="section-label">Catalogo completo</span>
          <h1 className="section-title">Encontre seu proximo importado.</h1>
          <p className="section-subtitle">
            Navegue por categorias, kits e produtos selecionados para pronta entrega.
          </p>
        </section>

        <div id="promocoes" style={{ paddingBottom: "2rem" }}>
          <CategoryRibbon
            categorias={categorias}
            ativa={categoriaAtiva}
            setAtiva={setCategoriaAtiva}
          />

          {categoriaAtiva === "promocoes" ? (
            renderPromocoesPorCategoria(produtosFiltrados)
          ) : categoriaAtiva === "todos" && termoBusca === "" ? (
            <>
              {categoriasProdutos.map((cat) => {
                const prodsCat = produtos.filter((p) => p.categoria === cat.value);
                if (prodsCat.length === 0) return null;

                if (cat.value === "Perfumes") {
                  return (
                    <React.Fragment key={cat.value}>
                      {renderPerfumeShelves(prodsCat)}
                    </React.Fragment>
                  );
                }

                return (
                  <ProductShelf
                    key={cat.value}
                    title={`${cat.label}.`}
                    subtitle="Explore as opcoes"
                    produtos={prodsCat}
                  />
                );
              })}
            </>
          ) : categoriaAtiva === "Perfumes" && termoBusca === "" ? (
            renderPerfumeShelves(produtosFiltrados)
          ) : (
            <ProductShelf
              title={termoBusca !== "" ? "Resultados da Busca" : `${activeLabel}.`}
              subtitle={termoBusca !== "" ? `Buscando por "${termoBusca}"` : categoriaAtiva === "promocoes" ? "Do maior desconto para o menor" : "Produtos selecionados"}
              produtos={produtosFiltrados}
            />
          )}
        </div>
      </main>

      <Footer navigate={navigate} />
      <WhatsAppFloat />
    </div>
  );
}

export default Catalogo;
