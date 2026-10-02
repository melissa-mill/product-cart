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
    <div>
      <div>
        <img src={imgUrl} alt={`Image of ${name}`} width={250} loading="lazy" />
      </div>
      {qty ? (
        <div>
          {qty === 1 ? (
            <button
              aria-label={`Remove ${name}`}
              onClick={() => handleRemoveItem(id)}
            >
              -
            </button>
          ) : (
            <button
              aria-label={`Decrease ${name}`}
              onClick={() => decreaseCartItem(id)}
            >
              -
            </button>
          )}
          <span>{qty}</span>
          <button
            aria-label={`Add to cart ${name}`}
            onClick={() => handleAddToCart(name, description, price, imgUrl)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          aria-label={`Add to cart ${name}`}
          onClick={() => handleAddToCart(name, description, price, imgUrl)}
        >
          Add to cart
        </button>
      )}

      <p>{name}</p>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}

export default Dessert;
