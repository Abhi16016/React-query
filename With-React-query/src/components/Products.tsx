 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ProductList = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
};

type ProductResData = {
  products: ProductList[]
}

  const showProducts = async (): Promise<ProductList[]> => {
    try{
      const response = await axios.get<ProductResData>("https://dummyjson.com/products");
      return response.data.products
    }catch(error){
      throw new Error("Failed to fetch data")
    }

  };

const Products = () => {

   const {isLoading,
   error,
   data: products} = useQuery({queryKey: ["products"],  queryFn: showProducts, staleTime: 8000})


  if (isLoading) {
    return <h3>Loading...</h3>;
  }
 
  if (error instanceof Error) {
    return <h3>Error: {error?.message}</h3>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
                  <div>
                    <p className="text-sm  text-gray-900 font-bold">
                      ${product.price}
                    </p>
                    <br/>
                    <p className="text-sm text-yellow-500 font-medium">
                      ⭐️ {product.rating}
                    </p>
                  </div>
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
