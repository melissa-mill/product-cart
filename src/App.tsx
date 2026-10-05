import { useState } from "react";
import data from "./data/data.json";
import type { Item, CartItem } from "./types/interfaces.ts";
import Dessert from "./components/Dessert";
import Cart from "./components/Cart";
import Modal from "./components/Modal.tsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (
    item: Item
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);

      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, qty: prevItem.qty + 1 } : prevItem,
        );
      }

      return [
        ...prevItems,
        {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          imgUrl: item.imgUrl,
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
                  dessert
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
