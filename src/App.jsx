import Routing from "./routing";
import { CartProvider } from "./context/CartContext";
import CartOverlay from "./components/Cart/CartOverlay";
import { useCart } from "./context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";

function AppContent() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Routing />
      <CartOverlay isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
