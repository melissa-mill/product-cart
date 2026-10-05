import "../styles/Cart.css";
import { CakeSlice, CircleX } from "lucide-react";
import type { CartItem } from "../types/interfaces.ts";

interface CartProps {
  items: CartItem[];
  handleConfirmOrder: () => void;
  handleRemoveItem: (id: number) => void;
}

function Cart({ items, handleConfirmOrder, handleRemoveItem }: CartProps) {
  const totalItems = items.reduce((total, item) => total + item.qty, 0);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  return (
    <div className="cart">
      <h3 className="cart__title">Your cart ({totalItems})</h3>
      {items.length > 0 ? (
        <div className="cart__content">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div >
                <p className="cart-item__description">{item.description}</p>
                <p className="cart-item__price">
                  <span className="cart-item__qty">{item.qty}x</span>
                  <span>@ ${item.price.toFixed(2)}</span>
                  <span className="cart-item__total-price">${(item.price * item.qty).toFixed(2)}</span>
                </p>
              </div>
              <button
                className="btn-cart btn__remove"
                aria-label={`Remove ${item.name}`}
                onClick={() => handleRemoveItem(item.id)}
              >
                <CircleX size={18} color="#949c9c" />
              </button>
            </div>
          ))}
          <div>
            <p className="cart__total">
              Order Total <span className="cart__total-price">${cartTotal.toFixed(2)}</span>
            </p>
            <button
              className="btn btn-cart__confirm-order"
              aria-label="Confirm order"
              onClick={handleConfirmOrder}
            >
              Confirm order
            </button>
          </div>
        </div>
      ) : (
        <div className="cart__content cart__empty">
          <CakeSlice size={72} color="#d2691e" />
          <p>Your added items will appear here</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
