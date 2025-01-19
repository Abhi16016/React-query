import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductList = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
  description: string;
};

function Product() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductList | null>(null);

  useEffect(() => {
    const showProducts = async () => {
      try {
        setIsloading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setIsloading(false);
      } catch (err) {
        if (err instanceof Error) {
          let errorMsg = err.message;
          setError(errorMsg);
        }
      } finally {
        setIsloading(false);
      }
    };
    showProducts();
  }, [id]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Card>
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              alt={product.title}
              src={product.thumbnail}
              className="w-full rounded-md object-cover"
            />
            <p className="text-lg text-gray-700 mt-4">{product.description}</p>
          </CardContent>
          <CardFooter>
            <p className="text-lg font-medium text-gray-900">
              Price: ${product.price}
            </p>
            <p className="text-sm text-yellow-500 font-semibold mt-2">
              ⭐ {product.rating}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Product;
