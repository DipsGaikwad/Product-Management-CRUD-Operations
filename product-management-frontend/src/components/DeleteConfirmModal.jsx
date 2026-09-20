import { AlertTriangle, X, Trash2 } from "lucide-react";

function DeleteConfirmModal({
  product,
  onClose,
  onConfirm,
  loading,
}) {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle size={24} />
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Delete Product?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">
            {product.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={18} />

            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmModal;