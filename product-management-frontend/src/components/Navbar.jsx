import { Package, Plus } from "lucide-react";

function Navbar({ onAddProduct }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
            <Package size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              ProductHub
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Product Management
            </p>
          </div>
        </div>

        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 active:scale-95"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Product</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;