import { CheckCircle2, XCircle, X } from "lucide-react";

function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const success = toast.type === "success";

  return (
    <div className="fixed right-4 top-20 z-[60] w-[calc(100%-2rem)] max-w-sm">

      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">

        {success ? (
          <CheckCircle2
            className="shrink-0 text-emerald-500"
            size={22}
          />
        ) : (
          <XCircle
            className="shrink-0 text-red-500"
            size={22}
          />
        )}

        <div className="flex-1">
          <p className="font-semibold text-slate-900">
            {success ? "Success" : "Error"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
}

export default Toast;