import React from "react";
import MainContent from "../components/layout/MainContent";
import Purchases from "../components/PurchaseHistory/PurchaseHistory";

const PurchaseHistoryPage = () => {
  return (
    <MainContent showMenu={false}>
      <Purchases />
    </MainContent>
  );
};

export default PurchaseHistoryPage;
