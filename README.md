# 🎂 Doce Encanto - E-commerce de Bolos

Sistema completo de e-commerce para vendas de bolos artesanais com integração WhatsApp.

## 🌟 Funcionalidades

- **Catálogo de Produtos**: Visualização de bolos com filtros por categoria
- **Carrinho de Compras**: Adicionar, remover e gerenciar quantidades
- **Checkout via WhatsApp**: Finalização de pedidos enviados diretamente para WhatsApp
- **Design Responsivo**: Interface otimizada para mobile e desktop
- **Tema de Confeitaria**: Cores e design pensados para o segmento

## 🚀 Como executar em sua máquina

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Passo a passo

1. **Clone ou baixe o projeto**
```bash
git clone <seu-repositorio>
cd doce-encanto
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o número do WhatsApp (opcional)**
   
   Crie um arquivo `.env` na raiz do projeto:
```env
VITE_WHATSAPP_NUMBER=5511999999999
```
   
   Substitua pelo seu número do WhatsApp (com código do país, sem espaços ou símbolos).

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
   
   Abra: http://localhost:5000

## 📁 Estrutura do projeto

```
doce-encanto/
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes da interface
│   │   ├── contexts/    # Context do carrinho
│   │   ├── lib/         # Utilitários e WhatsApp
│   │   └── pages/       # Páginas da aplicação
├── server/          # Backend Express
│   ├── index.ts     # Servidor principal
│   ├── routes.ts    # Rotas da API
│   └── storage.ts   # Armazenamento em memória
├── shared/          # Tipos compartilhados
└── package.json
```

## 🛒 Como funciona o carrinho e checkout

1. **Navegue pelos produtos** na página inicial
2. **Adicione bolos ao carrinho** clicando no botão "Adicionar ao Carrinho"
3. **Abra o carrinho** clicando no ícone no canto superior direito
4. **Ajuste quantidades** usando os botões + e -
5. **Finalize o pedido** clicando em "Finalizar Pedido via WhatsApp"
6. **Preencha seus dados** no formulário de checkout
7. **Envie o pedido** - será aberto o WhatsApp com a mensagem formatada

## 🎨 Personalização

### Cores do tema
As cores podem ser alteradas no arquivo `client/src/index.css`:

```css
:root {
  --bakery-brown: hsl(20, 60%, 27%);
  --bakery-orange: hsl(26, 100%, 63%);
  --bakery-cream: hsl(36, 100%, 97%);
  /* ... outras cores */
}
```

### Produtos
Os produtos são definidos em `server/storage.ts`. Para adicionar novos bolos, edite o array `sampleProducts`.

### Número do WhatsApp
Configure sua variável de ambiente `VITE_WHATSAPP_NUMBER` com seu número do WhatsApp.

## 🔧 Scripts disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção

## 📱 Funcionalidade WhatsApp

Quando o cliente finaliza um pedido, é gerada uma mensagem formatada contendo:

- Dados do cliente (nome, telefone, endereço)
- Lista de produtos e quantidades
- Valor total do pedido
- Data de entrega desejada
- Observações (se houver)

A mensagem é enviada automaticamente via WhatsApp Web para o número configurado.

## 🆘 Solução de problemas

**Erro de porta em uso:**
```bash
# Mate processos na porta 5000
npx kill-port 5000
```

**Dependências não instaladas:**
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

**WhatsApp não abre:**
- Verifique se o número está correto no formato: 5511999999999
- Certifique-se de que o WhatsApp Web está funcionando no seu navegador

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.