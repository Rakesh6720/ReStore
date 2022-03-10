import { Product } from "../../app/models/product";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

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

  if (loading) return <LoadingComponent message="Loading product..." />;

  if (!product) return <NotFound />;

  return <Typography variant="h2">{product.name}</Typography>;
}
