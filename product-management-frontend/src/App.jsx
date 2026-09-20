import { useEffect, useMemo, useState } from "react";

import {
  Search,
  RefreshCw,
  Package,
  TrendingUp,
} from "lucide-react";

import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Toast from "./components/Toast";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteProductData, setDeleteProductData] =
    useState(null);

  const [toast, setToast] = useState(null);

  // --------------------------------
  // Fetch products
  // --------------------------------

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.data);
    } catch (error) {
      showToast(
        "error",
        "Could not connect to the FastAPI backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --------------------------------
  // Toast
  // --------------------------------

  const showToast = (type, message) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // --------------------------------
  // Filter products
  // --------------------------------

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  // --------------------------------
  // Open Add Modal
  // --------------------------------

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  // --------------------------------
  // Open Edit Modal
  // --------------------------------

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // --------------------------------
  // Save Product
  // --------------------------------

  const handleSaveProduct = async (productData) => {
    try {
      setSaving(true);

      if (selectedProduct) {
        await updateProduct(
          selectedProduct.id,
          productData
        );

        showToast(
          "success",
          "Product updated successfully!"
        );
      } else {
        await createProduct(productData);

        showToast(
          "success",
          "Product added successfully!"
        );
      }

      setModalOpen(false);
      setSelectedProduct(null);

      await loadProducts();
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.detail ||
          "Could not save the product."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Ask for Delete Confirmation
  // --------------------------------

  const handleDeleteRequest = (product) => {
    setDeleteProductData(product);
  };

  // --------------------------------
  // Delete Product
  // --------------------------------

  const handleConfirmDelete = async () => {
    if (!deleteProductData) {
      return;
    }

    try {
      setDeleting(true);

      await deleteProduct(deleteProductData.id);

      showToast(
        "success",
        "Product deleted successfully!"
      );

      setDeleteProductData(null);

      await loadProducts();
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.detail ||
          "Could not delete the product."
      );
    } finally {
      setDeleting(false);
    }
  };

  // --------------------------------
  // Statistics
  // --------------------------------

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar onAddProduct={handleAddProduct} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}

        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl sm:p-8">

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
              <TrendingUp size={14} />
              Product Dashboard
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Manage your products
              <span className="text-slate-400"> effortlessly.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Create, update, search and manage your product
              inventory from one clean dashboard.
            </p>

          </div>

        </section>

        {/* Statistics */}

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Products
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalProducts}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <Package size={22} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inventory Value
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  ₹{totalValue.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingUp size={22} />
              </div>

            </div>

          </div>

        </section>

        {/* Search */}

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

          </div>

          <button
            onClick={loadProducts}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>

        </section>

        {/* Results heading */}

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

        </div>

        {/* Product Grid */}

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteRequest}
          />
        )}

      </main>

      {/* Add/Edit Modal */}

      <ProductModal
        isOpen={modalOpen}
        product={selectedProduct}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSaveProduct}
        loading={saving}
      />

      {/* Delete Modal */}

      <DeleteConfirmModal
        product={deleteProductData}
        onClose={() => {
          if (!deleting) {
            setDeleteProductData(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      {/* Toast */}

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default App;