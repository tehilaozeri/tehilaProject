import React, { useState } from "react";
import ShoppingPage from "./pages/ShoppingPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderResultPage from "./pages/OrderResultPage";
import { useSelector } from "react-redux";

export default function App() {
  const [screen, setScreen] = useState("shop");
  const last = useSelector((s) => s.order.lastOrderResponse);

  if (screen === "shop") {
    return <ShoppingPage onProceed={() => setScreen("checkout")} />;
  }

  if (screen === "checkout") {
    return (
      <CheckoutPage
        onBackToShop={() => setScreen("shop")}
        onOrderDone={() => setScreen("done")}
      />
    );
  }

  return (
    <OrderResultPage
      orderId={last?.orderId}
      onNewOrder={() => setScreen("shop")}
    />
  );
}
