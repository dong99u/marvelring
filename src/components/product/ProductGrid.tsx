import ProductCard, { ProductCardProps } from './ProductCard';

interface ProductGridProps {
  products: ProductCardProps['product'][];
  isLoggedIn?: boolean;
  isApproved?: boolean;
}

export default function ProductGrid({ products, isLoggedIn, isApproved }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isLoggedIn={isLoggedIn}
          isApproved={isApproved}
        />
      ))}
    </div>
  );
}
