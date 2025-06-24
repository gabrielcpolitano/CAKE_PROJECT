# Doce Encanto - E-commerce de Bolos

## Project Overview
Complete e-commerce platform for selling artisanal cakes with WhatsApp integration. Built with React frontend, Express backend, and in-memory storage.

## Recent Changes
- 2024-12-23: Created complete cake e-commerce platform
- 2024-12-23: Fixed Windows compatibility issues with NODE_ENV
- 2024-12-23: Added WhatsApp checkout integration
- 2024-12-23: Implemented shopping cart functionality

## Project Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Storage**: In-memory storage (MemStorage class)
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for cart
- **Integration**: WhatsApp Web API for order processing

### Key Features
- Product catalog with 8 sample cakes
- Category filtering (chocolate, fruits, wedding, birthday, gourmet)
- Shopping cart with quantity management
- WhatsApp checkout integration
- Responsive design with bakery theme
- Form validation with react-hook-form + zod

### Technical Stack
- React Query for API calls
- Drizzle ORM for schema definitions
- Vite for bundling
- Express for API server
- TypeScript throughout

## User Preferences
- User is Brazilian Portuguese speaker
- Prefers straightforward explanations
- Working on Windows environment
- Needs Windows-compatible commands

## Environment Configuration
- VITE_WHATSAPP_NUMBER: WhatsApp number for order processing (format: 5511999999999)
- NODE_ENV: development/production

## Windows Compatibility Notes
- Use `set NODE_ENV=development` instead of `NODE_ENV=development` 
- Provided start-windows.bat for easy execution
- Cross-env package installed for cross-platform compatibility