import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import Product from './components/Product'
import './App.css'

function App() {

  return (
    <>
    <h2>React Query Tutorial</h2>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />}/>
    </Routes>
    </>
  )
}

export default App
