const produtos = [
  // ===== CREMES =====
  {
    id: 1,
    nome: "Creme Coconut",
    marca: "Victoria's Secret",
    preco: "R$ 89,90",
    precoAntigo: "R$ 129,90",
    categoria: "Cremes",
    badge: "Importado",
    estoque: 2,
    descricao: "Creme hidratante corporal com fragrância de coco, textura sedosa e duradoura.",
    imagem: "/images/vs_coconut_cream_1779845125678.png"
  },

  // ===== KITS =====
  {
    id: 2,
    nome: "Yara KIT",
    marca: "Lattafa",
    preco: "R$ 299,90",
    precoAntigo: "R$ 399,90",
    categoria: "Perfumes",
    badge: "Kit Exclusivo",
    estoque: 1,
    descricao: "Kit completo Yara com perfume + body lotion. Fragrância floral e gourmand irresistível.",
    imagem: "/images/lattafa_yara_kit_1779845171171.png"
  },
  {
    id: 3,
    nome: "Asad KIT",
    marca: "Lattafa",
    preco: "R$ 279,90",
    precoAntigo: "R$ 359,90",
    categoria: "Perfumes",
    badge: "Kit Exclusivo",
    estoque: 1,
    descricao: "Kit Asad masculino com perfume + miniatura. Notas amadeiradas e especiarias marcantes.",
    imagem: "/images/lattafa_asad_1779845157780.png"
  },

  // ===== PERFUMES =====
  {
    id: 4,
    nome: "9PM",
    marca: "Afnan",
    preco: "R$ 189,90",
    precoAntigo: "R$ 249,90",
    categoria: "Perfumes",
    badge: "Mais Vendido",
    estoque: 4,
    descricao: "Perfume masculino icônico com notas de lavanda, baunilha e âmbar. Ideal para a noite.",
    imagem: "/images/afnan_9pm_perfume_1779844985702.png"
  },
  {
    id: 5,
    nome: "Sabah Al Ward",
    marca: "Wataniah",
    preco: "R$ 159,90",
    precoAntigo: "R$ 219,90",
    categoria: "Perfumes",
    badge: "Novo",
    estoque: 5,
    descricao: "Fragrância feminina floral oriental com notas de rosa, cacau e baunilha.",
    imagem: "/images/wataniah_sabah_1779845184491.png"
  },
  {
    id: 6,
    nome: "Eclaire",
    marca: "Lattafa",
    preco: "R$ 169,90",
    precoAntigo: "R$ 229,90",
    categoria: "Perfumes",
    badge: "Destaque",
    estoque: 4,
    descricao: "Perfume feminino gourmand com frasco rosa elegante. Notas doces e sofisticadas.",
    imagem: "/images/lattafa_eclaire_1779845138182.png"
  },
  {
    id: 7,
    nome: "Fakhar Branco",
    marca: "Lattafa",
    preco: "R$ 149,90",
    precoAntigo: "R$ 199,90",
    categoria: "Perfumes",
    badge: "Importado",
    estoque: 5,
    descricao: "Fragrância fresca e elegante com design sofisticado. Notas cítricas e amadeiradas.",
    imagem: "/images/lattafa_fakhar_1779845072240.png"
  },
  {
    id: 8,
    nome: "Fakhar Preto",
    marca: "Lattafa",
    preco: "R$ 149,90",
    precoAntigo: "R$ 199,90",
    categoria: "Perfumes",
    badge: null,
    estoque: 2,
    descricao: "Versão intensa do Fakhar com notas escuras, especiarias e madeiras nobres.",
    imagem: "/images/lattafa_fakhar_1779845072240.png"
  },
  {
    id: 9,
    nome: "Yara Rose",
    marca: "Lattafa",
    preco: "R$ 179,90",
    precoAntigo: "R$ 249,90",
    categoria: "Perfumes",
    badge: "Mais Vendido",
    estoque: 6,
    descricao: "Fragrância feminina best-seller com notas de orquídea, frutas tropicais e baunilha.",
    imagem: "/images/yara_rose_perfume_1779844972003.png"
  },
  {
    id: 10,
    nome: "Khamrah Preto",
    marca: "Mis Rose",
    preco: "R$ 139,90",
    precoAntigo: "R$ 189,90",
    categoria: "Perfumes",
    badge: "Novo",
    estoque: 3,
    descricao: "Perfume gourmand intenso com notas de tâmara, canela e baunilha.",
    imagem: "/images/khamrah_perfume_1779845197093.png"
  },
  {
    id: 11,
    nome: "Khamrah Qahwa Marom",
    marca: "Mis Rose",
    preco: "R$ 145,90",
    precoAntigo: "R$ 199,90",
    categoria: "Perfumes",
    badge: null,
    estoque: 3,
    descricao: "Fragrância exclusiva com notas de café, especiarias e madeiras orientais.",
    imagem: "/images/khamrah_perfume_1779845197093.png"
  },

  // ===== BODY SPLASH =====
  {
    id: 12,
    nome: "Amber Romance",
    marca: "Victoria's Secret",
    preco: "R$ 99,90",
    precoAntigo: "R$ 149,90",
    categoria: "Body Splash",
    badge: "Mais Vendido",
    estoque: 6,
    descricao: "Body splash com fragrância quente de âmbar, cerejas e açúcar. Um clássico VS.",
    imagem: "/images/vs_amber_romance_1779844997656.png"
  },
  {
    id: 13,
    nome: "Bare Vanilla",
    marca: "Victoria's Secret",
    preco: "R$ 119,90",
    precoAntigo: "R$ 149,90",
    categoria: "Body Splash",
    badge: "Destaque",
    estoque: 6,
    descricao: "Fragrância doce e cremosa com baunilha, âmbar e notas amadeiradas.",
    imagem: "/images/vs_bare_vanilla_1779845095216.png"
  },
  {
    id: 14,
    nome: "Midnight Bloom",
    marca: "Victoria's Secret",
    preco: "R$ 119,90",
    precoAntigo: "R$ 159,90",
    categoria: "Body Splash",
    badge: "Novo",
    estoque: 3,
    descricao: "Body splash floral noturno com moonflower e madeiras cremosas.",
    imagem: "/images/vs_midnight_bloom_1779845112384.png"
  },

  // ===== ELETRÔNICOS =====
  {
    id: 15,
    nome: "iPhone 16 128GB",
    marca: "Apple",
    preco: "R$ 4.000,00",
    precoAntigo: "R$ 4.500,00",
    categoria: "Eletrônicos",
    badge: "Frete Grátis",
    estoque: 1,
    descricao: "iPhone 16 com chip A18, câmera de 48MP, Dynamic Island e bateria de longa duração.",
    imagem: "/images/iphone_16_1779845010068.png"
  },
  {
    id: 16,
    nome: "iPhone 17 Pro 256GB",
    marca: "Apple",
    preco: "R$ 7.500,00",
    precoAntigo: "R$ 8.500,00",
    categoria: "Eletrônicos",
    badge: "Lançamento",
    estoque: 2,
    descricao: "iPhone 17 Pro com design em alumínio unibody, câmera tripla e chip A19 Pro.",
    imagem: "/images/iphone_17_pro_1779845031605.png"
  },
  {
    id: 17,
    nome: "Watch Series 3 40mm",
    marca: "Apple",
    preco: "R$ 1.800,00",
    precoAntigo: "R$ 2.000,00",
    categoria: "Eletrônicos",
    badge: "Promoção",
    estoque: 1,
    descricao: "Apple Watch com monitoramento cardíaco, GPS e resistência à água.",
    imagem: "/images/apple_watch_1779845044719.png"
  },
  {
    id: 18,
    nome: "PC Gamer Ryzen 5 5500",
    marca: "Custom Build",
    preco: "R$ 3.000,00",
    precoAntigo: "R$ 3.499,00",
    categoria: "Eletrônicos",
    badge: "Gamer",
    estoque: 1,
    descricao: "PC Gamer com Ryzen 5 5500, 16GB RAM, 1TB e GTX 1650. Pronto para jogar!",
    imagem: "/images/pc_gamer_1779845058807.png"
  }
];

export default produtos;