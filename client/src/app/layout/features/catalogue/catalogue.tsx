import {
  Button,
} from "@mui/material";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

interface Props {
  products: Product[];
  addProduct: () => void;
}
export default function Catalogue({ products, addProduct }: Props) {
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
}
