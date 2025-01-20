import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
  description: string;
};

const showProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data as Product
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
};

const Product = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <h3>Product ID is missing</h3>;
  }

  const { isLoading, error, data: product } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => showProduct(id),
    staleTime: 8000,
  });

  const mutation = useMutation<Product, unknown, Partial<Product>>({
    mutationFn: async (newProduct: Partial<Product>): Promise<Product> => {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        newProduct
      );
      return response.data as Product;
    },
  });

  if (mutation.status === "pending") {
    return <h3>Updating...</h3>;
  }

  if (mutation.status === "error") {
    const mutationError = mutation.error;
    if (mutationError instanceof Error) {
      return <h3>Error while updating: {mutationError.message}</h3>;
    }
    return <h3>Error while updating</h3>;
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error instanceof Error) {
    return <h3>Error: {error.message}</h3>;
  }

  if (!product) {
    return <h3>Product not found</h3>;
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
            <div>
            <p className="text-lg font-medium text-gray-900">
              Price: ${product.price}
            </p>
            <p className="text-sm text-yellow-500 font-semibold mt-2">
              ⭐ {product.rating}
            </p>
            </div>
          </CardFooter>
        </Card>

        <Button
          className="mt-4"
          onClick={() => {
            mutation.mutate({ title: "Product Update via PUT" });
          }}
        >
          Update Product
        </Button>
      </div>
    </div>
  );
};

export default Product;
