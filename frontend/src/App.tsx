// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Header from './components/Header'
import CartPage    from './pages/CartPage';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart"   element={<CartPage    />} />
    </Routes>
  </>
)

export default App
