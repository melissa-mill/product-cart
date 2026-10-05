import { useState } from "react";
import data from "./data/data.json";
import type { CartItem } from "./types/interfaces.ts";
import Dessert from "./components/Dessert";
import Cart from "./components/Cart";
import Modal from "./components/Modal.tsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (
    id: number,
    name: string,
    desc: string,
    price: number,
    img: string,
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [
        ...prevItems,
        {
          id,
          name,
          description: desc,
          price,
          imgUrl: img,
          qty: 1,
        },
      ];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const decreaseCartItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  const handleNewOrder = () => {
    setIsModalOpen(false);
    setCartItems([]);
  };

  return (
    <>
      <div className="desserts">
        <h1>Desserts</h1>
        <div className="desserts-grid">
          {data.desserts.map((dessert) => (
            <Dessert
              key={dessert.id}
              id={dessert.id}
              name={dessert.name}
              description={dessert.description}
              price={dessert.price}
              imgUrl={dessert.imgUrl}
              qty={cartItems.find((item) => item.id === dessert.id)?.qty ?? 0}
              handleAddToCart={() =>
                handleAddToCart(
                  dessert.id,
                  dessert.name,
                  dessert.description,
                  dessert.price,
                  dessert.imgUrl,
                )
              }
              handleRemoveItem={handleRemoveItem}
              decreaseCartItem={decreaseCartItem}
            />
          ))}
        </div>
      </div>
      <Cart
        items={cartItems}
        handleConfirmOrder={() => setIsModalOpen(true)}
        handleRemoveItem={handleRemoveItem}
      />
      {isModalOpen && (
        <Modal
          items={cartItems}
          onClose={() => setIsModalOpen(false)}
          handleClick={handleNewOrder}
        />
      )}
    </>
  );
}

export default App;
