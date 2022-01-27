import { Product } from "../../models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}
export default function Catalogue({ products, addProduct }: Props) {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>
  );
}
