import { useState, useEffect } from "react";
import { Product } from "../../app/layout/models/product";
import ProductList from "./ProductList";

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("Http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
