import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

type ProductList = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
};

function Products() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductList[]>([]);

  useEffect(() => {
    const showProducts = async () => {
      try {
        setIsloading(true);
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
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
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product/${product.id}`}>
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover"
                />
              </CardContent>
              <CardFooter>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                    ⭐️ {product.rating}
                  </p>
              </CardFooter>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
