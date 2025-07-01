const produtos = [
  // PEQUENOS
  { nome: "Bolo de Fubá Pequeno", preco: 14.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 5 pessoas", estrela: 5, vendas: 37, imagem: "./imgs/fuba.jpg" },
  { nome: "Bolo de Cenoura Pequeno", preco: 17.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 6 pessoas", estrela: 4, vendas: 91, imagem: "imgs/cenoura.jpg" },
  { nome: "Bolo de Leite Ninho Pequeno", preco: 21.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 7 pessoas", estrela: 5, vendas: 64, imagem: "imgs/leite.png" },
  { nome: "Bolo de Iogurte Pequeno", preco: 17.50, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 5 pessoas", estrela: 4, vendas: 58, imagem: "imgs/limao.png" },
  { nome: "Bolo de Maracujá Pequeno", preco: 18.90, categoria: "gourmet", descricao: "Serve aproximadamente 4 a 6 pessoas", estrela: 5, vendas: 43, imagem: "imgs/maracuja.jpg" },
  { nome: "Bolo de Churros Pequeno", preco: 21.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 7 pessoas", estrela: 5, vendas: 73, imagem: "imgs/churros.jpg" },
  { nome: "Bolo de Paçoca Pequeno", preco: 21.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 5 pessoas", estrela: 4, vendas: 26, imagem: "imgs/pacoca.jpeg" },
  { nome: "Bolo Vulcão Pequeno", preco: 22.90, categoria: "tradicional", descricao: "Serve aproximadamente 4 a 6 pessoas", estrela: 5, vendas: 85, imagem: "imgs/vulcao.png" },

  // MÉDIOS
  { nome: "Bolo de Fubá Médio", preco: 24.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 9 pessoas", estrela: 5, vendas: 60, imagem: "./imgs/fuba.jpg" },
  { nome: "Bolo de Cenoura Médio", preco: 29.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 10 pessoas", estrela: 4, vendas: 84, imagem: "imgs/cenoura.jpg" },
  { nome: "Bolo de Leite Ninho Médio", preco: 35.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 11 pessoas", estrela: 5, vendas: 51, imagem: "imgs/leite.png" },
  { nome: "Bolo de Iogurte Médio", preco: 28.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 9 pessoas", estrela: 4, vendas: 33, imagem: "imgs/limao.png" },
  { nome: "Bolo de Maracujá Médio", preco: 31.90, categoria: "gourmet", descricao: "Serve aproximadamente 8 a 10 pessoas", estrela: 5, vendas: 95, imagem: "imgs/maracuja.jpg" },
  { nome: "Bolo de Churros Médio", preco: 35.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 11 pessoas", estrela: 5, vendas: 67, imagem: "imgs/churros.jpg" },
  { nome: "Bolo de Paçoca Médio", preco: 35.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 9 pessoas", estrela: 4, vendas: 47, imagem: "imgs/pacoca.jpeg" },
  { nome: "Bolo Vulcão Médio", preco: 36.90, categoria: "tradicional", descricao: "Serve aproximadamente 8 a 10 pessoas", estrela: 5, vendas: 71, imagem: "imgs/vulcao.png" },
  { nome: "Cueca Virada", preco: 19.90, categoria: "doces", descricao: "15 unidades", estrela: 5, vendas: 30, imagem: "imgs/cuecavirada.webp" },
  { nome: "Beijo de Mulata", preco: 21.90, categoria: "doces", descricao: "15 unidades", estrela: 5, vendas: 62, imagem: "imgs/beijo-de-mulata.jpg" },

  // GRANDES
  { nome: "Bolo de Fubá Grande", preco: 38.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 13 pessoas", estrela: 5, vendas: 142, imagem: "./imgs/fuba.jpg" },
  { nome: "Bolo de Cenoura Grande", preco: 48.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 14 pessoas", estrela: 4, vendas: 118, imagem: "imgs/cenoura.jpg" },
  { nome: "Bolo de Leite Ninho Grande", preco: 59.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 13 pessoas", estrela: 5, vendas: 107, imagem: "imgs/leite.png" },
  { nome: "Bolo de Iogurte Grande", preco: 48.50, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 14 pessoas", estrela: 4, vendas: 54, imagem: "imgs/limao.png" },
  { nome: "Bolo de Maracujá Grande", preco: 52.90, categoria: "gourmet", descricao: "Serve aproximadamente 12 a 13 pessoas", estrela: 5, vendas: 52, imagem: "imgs/maracuja.jpg" },
  { nome: "Bolo de Churros Grande", preco: 59.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 14 pessoas", estrela: 5, vendas: 67, imagem: "imgs/churros.jpg" },
  { nome: "Bolo de Paçoca Grande", preco: 59.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 13 pessoas", estrela: 4, vendas: 22, imagem: "imgs/pacoca.jpeg" },
  { nome: "Bolo Vulcão Grande", preco: 61.90, categoria: "tradicional", descricao: "Serve aproximadamente 12 a 14 pessoas", estrela: 5, vendas: 50, imagem: "imgs/vulcao.png" },
  { nome: "Cueca Virada", preco: 25.90, categoria: "doces", descricao: "25 unidades", estrela: 5, vendas: 50, imagem: "imgs/cuecavirada.webp" },
  { nome: "Beijo de Mulata", preco: 27.90, categoria: "doces", descricao: "25 unidades", estrela: 5, vendas: 50, imagem: "imgs/beijo-de-mulata.jpg" }
];
