// src/app/admin/content/locations/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Trash2, MoveUp, MoveDown, MapPin } from "lucide-react";
import { toast } from "sonner";

type Item = {
  id: string;
  city: string;
  place: string;
  time: string;
  description?: string | null;
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
    city: item.city,
    place: item.place,
    time: item.time,
    description: item.description ?? "",
    order: item.order,
    published: item.published,
  });
  const [saving, setSaving] = useState(false);

  const dirty =
    form.city !== item.city ||
    form.place !== item.place ||
    form.time !== item.time ||
    (form.description ?? "") !== (item.description ?? "") ||
    form.order !== item.order ||
    form.published !== item.published;

  const doSave = async () => {
    if (!form.city.trim()) return toast.error("City is required");
    if (!form.place.trim()) return toast.error("Place is required");
    if (!form.time.trim()) return toast.error("Time is required");
    const patch = diffPatch(item, {
      ...form,
      description: form.description || null,
    });
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
      city: item.city,
      place: item.place,
      time: item.time,
      description: item.description ?? "",
      order: item.order,
      published: item.published,
    });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </label>
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Dubai"
            />
          </div>

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
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {form.published ? "Published" : "Hidden"}
              </span>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Place
            </label>
            <input
              value={form.place}
              onChange={(e) =>
                setForm((f) => ({ ...f, place: e.target.value }))
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Dubai Mall"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </label>
            <input
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Sat 6:00 AM"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description (optional)
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Short details about the meet-up"
          />
        </div>

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

export default function AdminLocationsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const cityRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/locations", { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createItem = async () => {
    if (!city.trim() || !place.trim() || !time.trim()) {
      return alert("City, Place and Time are required");
    }
    setBusy(true);
    try {
      await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          place,
          time,
          description: description || null,
          published: true,
        }),
      });
      setCity("");
      setPlace("");
      setTime("");
      setDescription("");
      cityRef.current?.focus();
      toast.success("Location added");
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
      await fetch(`/api/admin/locations/${id}`, {
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
    if (!confirm("Delete this location?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
      toast.success("Location deleted");
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
        <h2 className="text-2xl font-bold text-gray-900">Locations</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage run meet-up locations shown on the public site
        </p>
      </div>

      {/* Create */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Add New Location</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              ref={cityRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Dubai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Place</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Dubai Mall"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Sat 6:00 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Short details about the group/route/meet point"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={createItem}
            disabled={busy || !city || !place || !time}
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            <Upload className="h-4 w-4" />
            {busy ? "Creating..." : "Create Location"}
          </button>
        </div>
      </div>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Locations ({loading ? "..." : items.length})
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
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No locations yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first location above
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
