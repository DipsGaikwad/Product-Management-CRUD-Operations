import { useEffect, useState } from "react";
import {
  X,
  Image as ImageIcon,
  Save,
} from "lucide-react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image_url: "",
};

function ProductModal({
  isOpen,
  product,
  onClose,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image_url: product.image_url || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Enter a valid price.";
    }

    if (form.image_url && !form.image_url.startsWith("http")) {
      newErrors.image_url = "Enter a valid image URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image_url: form.image_url.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? `Update product #${product.id}`
                : "Add a new product to your inventory"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* Image Preview */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

            {form.image_url ? (
              <img
                src={form.image_url}
                alt="Preview"
                className="h-56 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-56 flex-col items-center justify-center text-slate-400">
                <ImageIcon size={40} />
                <p className="mt-2 text-sm">
                  Image preview
                </p>
              </div>
            )}

          </div>

          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the product..."
              className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                errors.description
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price
            </label>

            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                errors.price
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.price && (
              <p className="mt-1 text-xs text-red-500">
                {errors.price}
              </p>
            )}
          </div>

          {/* Image URL */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Image URL
            </label>

            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                errors.image_url
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.image_url && (
              <p className="mt-1 text-xs text-red-500">
                {errors.image_url}
              </p>
            )}
          </div>

          <div className="flex gap-3 border-t border-slate-100 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />

              {loading
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Add Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ProductModal;