# SahanStore Documentation

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [Authentication System](#3-authentication-system)
4. [Shopping Cart System](#4-shopping-cart-system)
5. [API Endpoints](#5-api-endpoints)
6. [Setup and Installation](#6-setup-and-installation)
7. [Environment Variables](#7-environment-variables)
8. [Firebase Integration](#8-firebase-integration)
9. [Best Practices](#9-best-practices)

## 1. Project Overview

### 1.1 Architecture
- **Frontend**: React Native/Expo mobile application
- **Backend**: Node.js/Express.js server
- **Database**: Firebase (Authentication and Realtime Database)
- **State Management**: React Context API

### 1.2 Technology Stack
#### Frontend
- React Native/Expo
- TypeScript
- React Navigation
- AsyncStorage
- Firebase Client SDK

#### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- CORS
- Environment Variables

## 2. Project Structure

### 2.1 Frontend (SahanStore)
```
SahanStore/
├── src/
│   ├── app/           
│   ├── assets/       
│   ├── components/    
│   ├── contexts/      
│   ├── navigation/    
│   ├── screens/       
│   ├── theme/         
│   └── types/         
├── app.tsx            
└── package.json       
```

### 2.2 Backend
```
backend/
├── src/
│   ├── config/        
│   ├── controllers/   
│   ├── middleware/    
│   └── routes/       
├── index.js          
├── products.js        
└── package.json     
```

## 3. SahanStore Frontend Implementation

### 3.1 Project Structure
```
src/
├── app/           # Main application logic
├── assets/        # Static resources (images, fonts, etc.)
├── components/    # Reusable UI components
│   └── common/    # Common components used across the app
├── contexts/      # React Context providers and hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
│   ├── Auth/     # Authentication screens
│   ├── Cart/     # Shopping cart screens
│   ├── Home/     # Home and product listing screens
│   └── Product/  # Product detail screens
├── theme/         # Styling and theming
└── types/         # TypeScript type definitions
```

### 3.2 Key Features

#### 3.2.1 Authentication
- User login and registration
- Session management
- Protected routes

#### 3.2.2 Product Management
- Product listing
- Product details
- Search and filtering
- Category navigation

#### 3.2.3 Shopping Cart
- Add/remove products
- Quantity management
- Cart total calculation
- Checkout process

### 3.3 State Management
- React Context API for global state
- Local state management with useState
- AsyncStorage for persistent data

### 3.4 Navigation
- Stack navigation for screen transitions
- Tab navigation for main app sections
- Protected route handling

### 3.5 Styling
- Theme-based styling system
- Consistent color palette
- Responsive layouts
- Component-specific styles

### 3.6 API Integration
- RESTful API communication
- Error handling
- Loading states
- Data caching

## 4. Authentication System

### 4.1 AuthContext
```typescript
interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
}
```

### 4.2 Usage
```typescript
// In components
const { user, login, logout, loading } = useAuth();

// Login example
const handleLogin = async (email: string, password: string) => {
  await login({
    id: '123',
    email: email,
    name: 'User Name'
  });
};
```

## 5. Shopping Cart System

### 5.1 CartContext
```typescript
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

### 5.2 Usage
```typescript
const { cartItems, addToCart, removeFromCart, total } = useCart();
```

## 6. API Endpoints

### 6.1 Product Endpoints
- `GET /products` - Get all products
  - Query parameters:
    - `search`: Search products
    - `sortBy`: Sort field (price, name)
    - `sortOrder`: Sort direction (asc, desc)
- `GET /products/:id` - Get single product

### 6.2 Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

## 7. Setup and Installation

### 7.1 Frontend Setup
```bash
# Install dependencies
cd SahanStore
npm install

# Start development server
npx expo start
```

### 7.2 Backend Setup
```bash
# Install dependencies
cd backend
npm install

# Start server
npm start
```

## 8. Environment Variables

### 8.1 Frontend (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_FIREBASE_CONFIG={...}
```

### 8.2 Backend (.env)
```
PORT=8080
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

## 9. Firebase Integration

### 9.1 Authentication
- Email/Password authentication
- User session management
- Secure token handling

### 9.2 Database
- Real-time data synchronization
- Product data storage
- User data management

## 10. Best Practices

### 10.1 Code Organization
- Use TypeScript for type safety
- Follow component-based architecture
- Implement proper error handling
- Use async/await for asynchronous operations

### 10.2 Security
- Implement proper authentication
- Use environment variables for sensitive data
- Validate user input
- Implement CORS properly


