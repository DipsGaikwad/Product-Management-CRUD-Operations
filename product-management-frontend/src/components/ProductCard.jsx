import {
  Edit3,
  Trash2,
  ImageOff,
} from "lucide-react";

function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = product.image_url?.trim();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-52 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className={`${
            imageUrl ? "hidden" : "flex"
          } absolute inset-0 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200`}
        >
          <div className="text-center text-slate-400">
            <ImageOff className="mx-auto mb-2" size={35} />
            <p className="text-sm">No image available</p>
          </div>
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          ID #{product.id}
        </div>
      </div>

      <div className="p-5">

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
            {product.name}
          </h3>

          <p className="whitespace-nowrap text-lg font-bold text-slate-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
        </div>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {product.description || "No description available."}
        </p>

        <div className="flex gap-2 border-t border-slate-100 pt-4">

          <button
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Edit3 size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;