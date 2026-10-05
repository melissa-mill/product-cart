import "../styles/Dessert.css";
import { CircleMinus, CirclePlus, ShoppingCartPlus } from "lucide-react";
import type { Item } from "../types/interfaces.ts";

interface DessertProps extends Item {
  qty: number;
  handleAddToCart: (
    name: string,
    desc: string,
    price: number,
    img: string,
  ) => void;
  handleRemoveItem: (id: number) => void;
  decreaseCartItem: (id: number) => void;
}

function Dessert({
  id,
  name,
  description,
  price,
  imgUrl,
  qty,
  handleAddToCart,
  handleRemoveItem,
  decreaseCartItem,
}: DessertProps) {
  return (
    <div className="dessert">
      <div className={`dessert__img-container ${qty ? "item__in-cart" : ""}`}>
        <img
          className="dessert__img"
          src={imgUrl}
          alt={`Image of ${name}`}
          width={230}
          loading="lazy"
        />
      </div>
      {qty ? (
        <span className="btn btn__add-to-cart">
          {qty === 1 ? (
            <button
              className="btn-cart"
              aria-label={`Remove ${name}`}
              onClick={() => handleRemoveItem(id)}
            >
              <CircleMinus size={18} color="#fff" />
            </button>
          ) : (
            <button
              className="btn-cart"
              aria-label={`Decrease ${name}`}
              onClick={() => decreaseCartItem(id)}
            >
              <CircleMinus size={18} color="#fff" />
            </button>
          )}
          <span>{qty}</span>
          <button
            className="btn-cart"
            aria-label={`Add to cart ${name}`}
            onClick={() => handleAddToCart(name, description, price, imgUrl)}
          >
            <CirclePlus size={18} color="#fff" />
          </button>
        </span>
      ) : (
        <button
          className="btn btn__add-to-cart btn-add"
          aria-label={`Add to cart ${name}`}
          onClick={() => handleAddToCart(name, description, price, imgUrl)}
        >
          <ShoppingCartPlus size={18} color="#d2691e" /> Add to cart
        </button>
      )}

      <p className="item-title">{name}</p>
      <p className="item-description">{description}</p>
      <p className="item-price">${price.toFixed(2)}</p>
    </div>
  );
}

export default Dessert;
