import { Product } from "../../app/layout/models/product";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.details(parseInt(id))
      .then((response) => setProduct(response))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found!</h3>;

  return <Typography variant="h2">{product.name}</Typography>;
}
