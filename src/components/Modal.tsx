import { useEffect, useRef } from "react";
import type { CartItem } from "../types/interfaces.ts";

interface ModalProps {
  items: CartItem[];
  onClose: () => void;
  handleClick: () => void;
}

function Modal({ items, onClose, handleClick }: ModalProps) {
  const orderTotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      aria-labelledby="order-title"
      aria-describedby="order-description"
    >
      <button onClick={onClose}>x</button>
      <h3 id="order-title">Order confirmed</h3>
      <div id="order-description">
        <p>We hope you enjoy your food!</p>
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <img src={item.imgUrl} width={100} alt={`Image of ${item.name}`} />
              <p>{item.name}</p>
              <p>
                <span>{item.qty}x</span>
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
          <p>
            Order Total <span>${orderTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <button onClick={handleClick}>Start New Order</button>
    </dialog>
  );
}

export default Modal;
