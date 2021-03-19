import React from "react";
import Product from "../components/Product";
import bench from "../img/bench.jpg";

const Strength = ({ products }) => {
  const productsArray = products.map((product) => <Product data={product} />);

  return productsArray;
};

export default Strength;
