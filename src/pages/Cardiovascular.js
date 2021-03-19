import React from "react";
import Product from "../components/Product";
import treadmill from "../img/treadmill.jpg";

const Cardiovascular = ({ products }) => {
  const productsArray = products.map((product) => <Product data={product} />);

  return productsArray;
};

export default Cardiovascular;
