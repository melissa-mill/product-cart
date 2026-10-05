import { useEffect, useRef } from "react";
import "../styles/Modal.css";
import { CircleX } from "lucide-react";
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
      className="modal"
      ref={dialogRef}
      onCancel={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <button className="btn-cart btn__remove" onClick={onClose}>
        <CircleX size={18} color="#949c9c" />
      </button>
      <h3 id="modal-title">Order confirmed</h3>
      <div id="modal-content" className="modal__content">
        <p>We hope you enjoy your food!</p>
        <div className="order__description">
          {items.map((item) => (
            <div className="order__item" key={item.id}>
              <div className="order__item">
                <span className="order__img-container">
                  <img
                    src={item.imgUrl}
                    width={60}
                    alt={`Image of ${item.name}`}
                  />
                </span>
                <div>
                  <p className="order__text cart-item__description">
                    {item.description}
                  </p>
                  <p className="order__text cart-item__price">
                    <span className="cart-item__qty">{item.qty}x</span>$
                    {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="order__text cart-item__total-price">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
          <p className="cart__total">
            Order Total
            <span className="cart__total-price">${orderTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <button
        aria-label="Close order confirmation"
        className="btn btn-cart__confirm-order"
        onClick={handleClick}
      >
        Start New Order
      </button>
    </dialog>
  );
}

export default Modal;
