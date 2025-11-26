import { Route, Routes } from "react-router-dom"
import Navbar from "./components/nav-bar"
import Home from "./components/home"
import ItemListContainer from "./components/itemlist-container"
import ItemDetailContainer from "./components/item-detail-container"
import Cart from "./components/cart"
import NotFound from "./components/not-found"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          <Route path="/producto/:itemId" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
