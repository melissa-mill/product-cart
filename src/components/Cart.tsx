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
    <div>
      <h3>Your cart ({totalItems})</h3>
      {items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <span>{item.name}</span>
              <span>{item.qty}x</span>
              <span>
                @ ${item.price.toFixed(2)} ${(item.price * item.qty).toFixed(2)}
              </span>
              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => handleRemoveItem(item.id)}
              >
                x
              </button>
            </div>
          ))}
          <div>
            Total ${cartTotal.toFixed(2)}
            <button aria-label="Confirm order" onClick={handleConfirmOrder}>
              Confirm order
            </button>
          </div>
        </div>
      ) : (
        <div>Your added items will appear here</div>
      )}
    </div>
  );
}

export default Cart;
