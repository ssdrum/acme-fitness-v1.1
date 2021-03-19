import React from "react";
import Product from "../components/Product";

const Strength = ({ products }) => {
  const productsArray = products.map((product) => <Product data={product} />);

  return productsArray;
};

export default Strength;
