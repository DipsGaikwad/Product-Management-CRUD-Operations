import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

function ProductGrid({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <PackageOpen
          size={45}
          className="mx-auto mb-4 text-slate-300"
        />

        <h3 className="text-lg font-semibold text-slate-700">
          No products found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Try another search or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductGrid;