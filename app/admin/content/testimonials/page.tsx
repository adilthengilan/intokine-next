// src/app/admin/content/testimonials/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Trash2, MoveUp, MoveDown, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type Item = {
  id: string;
  name: string;
  title: string;
  quote: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

function diffPatch<T extends Record<string, any>>(orig: T, curr: Partial<T>) {
  const patch: Partial<T> = {};
  for (const k of Object.keys(curr)) {
    // @ts-ignore
    if (curr[k] !== (orig as any)[k]) patch[k] = curr[k];
  }
  return patch;
}

function ItemCard({
  item,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: Item;
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<Item>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
}) {
  const [form, setForm] = useState({
    name: item.name,
    title: item.title,
    quote: item.quote,
    order: item.order,
    published: item.published,
  });
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      form.name !== item.name ||
      form.title !== item.title ||
      form.quote !== item.quote ||
      form.order !== item.order ||
      form.published !== item.published,
    [form, item]
  );

  const doSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.quote.trim()) return toast.error("Quote is required");
    const patch = diffPatch(item, form);
    if (!Object.keys(patch).length) return;
    setSaving(true);
    try {
      await onUpdate(item.id, patch);
      toast.success("Updated");
    } finally {
      setSaving(false);
    }
  };

  const doCancel = () =>
    setForm({
      name: item.name,
      title: item.title,
      quote: item.quote,
      order: item.order,
      published: item.published,
    });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        {/* Header: Name + Visibility */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>

          {/* Visibility toggle */}
          <div className="mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={async (e) => {
                  const next = e.target.checked;
                  setForm((f) => ({ ...f, published: next }));
                  try {
                    await onUpdate(item.id, { published: next });
                    toast.success("Visibility updated");
                  } catch {
                    setForm((f) => ({ ...f, published: item.published }));
                    toast.error("Failed to update visibility");
                  }
                }}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                {form.published ? "Published" : "Hidden"}
              </span>
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. Marathon Runner"
          />
        </div>

        {/* Quote */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quote
          </label>
          <textarea
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={3}
            placeholder="The testimonial text…"
          />
        </div>

        {/* Order controls */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
            Order
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              title="Move up"
            >
              <MoveUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === total - 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              title="Move down"
            >
              <MoveDown className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
              }
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={doSave}
            disabled={!dirty || saving}
            className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50 hover:bg-gray-800"
          >
            {saving ? "Saving..." : "Update"}
          </button>
          <button
            onClick={doCancel}
            disabled={!dirty || saving}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <div className="ml-auto">
            <button
              onClick={() => onDelete(item.id)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createItem = async () => {
    if (!name.trim() || !title.trim() || !quote.trim()) {
      return alert("Name, title and quote are required");
    }
    setBusy(true);
    try {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, quote, published: true }),
      });

      setName("");
      setTitle("");
      setQuote("");
      nameRef.current?.focus();

      toast.success("Testimonial added");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const updateItem = async (id: string, patch: Partial<Item>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it))
    );
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Update failed, reloading...");
      await load();
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      toast.success("Testimonial deleted");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const moveUp = async (i: number) => {
    if (i <= 0) return;
    const a = sorted[i],
      b = sorted[i - 1];
    setItems((prev) => {
      const arr = [...prev];
      const ai = arr.findIndex((x) => x.id === a.id);
      const bi = arr.findIndex((x) => x.id === b.id);
      [arr[ai].order, arr[bi].order] = [arr[bi].order, arr[ai].order];
      return arr;
    });
    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  const moveDown = async (i: number) => {
    if (i >= sorted.length - 1) return;
    const a = sorted[i],
      b = sorted[i + 1];
    setItems((prev) => {
      const arr = [...prev];
      const ai = arr.findIndex((x) => x.id === a.id);
      const bi = arr.findIndex((x) => x.id === b.id);
      [arr[ai].order, arr[bi].order] = [arr[bi].order, arr[ai].order];
      return arr;
    });
    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage testimonials for the public site
        </p>
      </div>

      {/* Create */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Add New Testimonial</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              ref={nameRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Author name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g. Marathon Runner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Quote</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="The testimonial text…"
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={createItem}
            disabled={busy || !name || !title || !quote}
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            <Upload className="h-4 w-4" />
            {busy ? "Creating..." : "Create Testimonial"}
          </button>
        </div>
      </div>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Testimonials ({loading ? "..." : items.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-40 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No testimonials yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first testimonial above
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((it, i, arr) => (
              <ItemCard
                key={it.id}
                item={it}
                index={i}
                total={arr.length}
                onUpdate={updateItem}
                onDelete={deleteItem}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
