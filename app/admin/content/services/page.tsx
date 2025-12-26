// src/app/admin/content/services/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Category = { id: string; title: string };

type ServiceItem = { id: string; name: string; desc: string; order: number };

type Service = {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
  order: number;
  published: boolean;
  items: ServiceItem[];
  createdAt: string;
  updatedAt: string;
};

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function diffPatch<T extends Record<string, any>>(orig: T, curr: Partial<T>) {
  const patch: Partial<T> = {};
  for (const k of Object.keys(curr)) {
    // @ts-ignore
    if (curr[k] !== (orig as any)[k]) patch[k] = curr[k];
  }
  return patch;
}

async function cloudinaryUpload(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", PRESET);
  fd.append("folder", "wadada/services");

  const upRes = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/auto/upload`,
    {
      method: "POST",
      body: fd,
    }
  );

  const upJson = await upRes.json();
  if (!upJson?.secure_url || !upJson?.public_id) {
    console.error(upJson);
    throw new Error("Cloudinary upload failed");
  }
  return {
    imageUrl: upJson.secure_url as string,
    publicId: upJson.public_id as string,
  };
}

function ItemRow({
  item,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: ServiceItem;
  index: number;
  total: number;
  onUpdate: (itemId: string, patch: Partial<ServiceItem>) => Promise<void>;
  onDelete: (itemId: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
}) {
  const [form, setForm] = useState({
    name: item.name,
    desc: item.desc,
    order: item.order,
  });
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      form.name !== item.name ||
      form.desc !== item.desc ||
      form.order !== item.order,
    [form, item]
  );

  const save = async () => {
    if (!form.name.trim() || !form.desc.trim()) {
      toast.error("Item name and description required");
      return;
    }
    const patch = diffPatch(item, form);
    if (!Object.keys(patch).length) return;

    setSaving(true);
    try {
      await onUpdate(item.id, patch);
      toast.success("Item updated");
    } finally {
      setSaving(false);
    }
  };

  const cancel = () =>
    setForm({ name: item.name, desc: item.desc, order: item.order });

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-4">
          <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Item name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-6">
          <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Description
          </label>
          <input
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Order
          </label>
          <div className="mt-1 flex items-center gap-2">
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50"
              title="Move up"
            >
              <MoveUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === total - 1}
              className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50"
              title="Move down"
            >
              <MoveDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update item"}
        </button>
        <button
          onClick={cancel}
          disabled={!dirty || saving}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete item
        </button>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  categories,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onReplaceImage,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onMoveItemUp,
  onMoveItemDown,
}: {
  service: Service;
  categories: Category[];
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<Service>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
  onReplaceImage: (id: string, file: File) => Promise<void>;
  onAddItem: (
    serviceId: string,
    payload: { name: string; desc: string }
  ) => Promise<void>;
  onUpdateItem: (itemId: string, patch: Partial<ServiceItem>) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
  onMoveItemUp: (serviceId: string, itemIndex: number) => Promise<void>;
  onMoveItemDown: (serviceId: string, itemIndex: number) => Promise<void>;
}) {
  const [form, setForm] = useState({
    categoryId: service.categoryId,
    title: service.title,
    subtitle: service.subtitle,
    imageUrl: service.imageUrl,
    color: service.color,
    order: service.order,
    published: service.published,
  });

  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", desc: "" });
  const [addingItem, setAddingItem] = useState(false);

  const dirty = useMemo(() => {
    return (
      form.categoryId !== service.categoryId ||
      form.title !== service.title ||
      form.subtitle !== service.subtitle ||
      form.imageUrl !== service.imageUrl ||
      form.color !== service.color ||
      form.order !== service.order ||
      form.published !== service.published
    );
  }, [form, service]);

  const doSave = async () => {
    if (
      !form.categoryId ||
      !form.title.trim() ||
      !form.subtitle.trim() ||
      !form.imageUrl.trim()
    ) {
      toast.error("Category, title, subtitle and image are required");
      return;
    }
    const patch = diffPatch(service, form);
    if (!Object.keys(patch).length) return;

    setSaving(true);
    try {
      await onUpdate(service.id, patch);
      toast.success("Service updated");
    } finally {
      setSaving(false);
    }
  };

  const doCancel = () => {
    setForm({
      categoryId: service.categoryId,
      title: service.title,
      subtitle: service.subtitle,
      imageUrl: service.imageUrl,
      color: service.color,
      order: service.order,
      published: service.published,
    });
  };

  const sortedItems = useMemo(() => {
    return [...(service.items ?? [])].sort((a, b) => a.order - b.order);
  }, [service.items]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-72 h-48 flex-shrink-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2">
            {form.published ? (
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                <Eye className="h-3 w-3" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                <EyeOff className="h-3 w-3" />
                Hidden
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoryId: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </label>
              <input
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                Visibility
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={async (e) => {
                    const next = e.target.checked;
                    setForm((f) => ({ ...f, published: next }));
                    try {
                      await onUpdate(service.id, { published: next });
                      toast.success("Visibility updated");
                    } catch {
                      setForm((f) => ({ ...f, published: service.published }));
                      toast.error("Failed to update visibility");
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
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
                >
                  <MoveUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === total - 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <MoveDown className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      order: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gradient Color
              </label>
              <input
                value={form.color}
                onChange={(e) =>
                  setForm((f) => ({ ...f, color: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              Replace Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const f = e.currentTarget.files?.[0];
                if (f) await onReplaceImage(service.id, f);
                e.currentTarget.value = "";
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={doSave}
              disabled={!dirty || saving}
              className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update"}
            </button>
            <button
              onClick={doCancel}
              disabled={!dirty || saving}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Service Items</h4>
              <span className="text-xs text-gray-500">
                ({sortedItems.length})
              </span>
            </div>

            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="grid gap-3 md:grid-cols-12">
                <div className="md:col-span-4">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    New item name
                  </label>
                  <input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem((s) => ({ ...s, name: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-8">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    New item desc
                  </label>
                  <input
                    value={newItem.desc}
                    onChange={(e) =>
                      setNewItem((s) => ({ ...s, desc: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={async () => {
                    if (!newItem.name.trim() || !newItem.desc.trim()) {
                      toast.error("Item name and description required");
                      return;
                    }
                    setAddingItem(true);
                    try {
                      await onAddItem(service.id, {
                        name: newItem.name.trim(),
                        desc: newItem.desc.trim(),
                      });
                      setNewItem({ name: "", desc: "" });
                      toast.success("Item added");
                    } finally {
                      setAddingItem(false);
                    }
                  }}
                  disabled={addingItem}
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  {addingItem ? "Adding..." : "Add item"}
                </button>
                <button
                  onClick={() => setNewItem({ name: "", desc: "" })}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-white"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {sortedItems.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No items yet. Add a few bullet points.
                </p>
              ) : (
                sortedItems.map((it, i) => (
                  <ItemRow
                    key={it.id}
                    item={it}
                    index={i}
                    total={sortedItems.length}
                    onUpdate={onUpdateItem}
                    onDelete={onDeleteItem}
                    onMoveUp={(idx) => onMoveItemUp(service.id, idx)}
                    onMoveDown={(idx) => onMoveItemDown(service.id, idx)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <button
            onClick={() => onDelete(service.id)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [color, setColor] = useState("from-gray-800 to-black");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  async function loadAll() {
    setLoading(true);
    try {
      const [catRes, svcRes] = await Promise.all([
        fetch("/api/admin/run-categories", { cache: "no-store" }),
        fetch("/api/admin/services", { cache: "no-store" }),
      ]);
      const cats = await catRes.json();
      const svcs = await svcRes.json();

      const catItems: Category[] = (cats.items ?? []).map((c: any) => ({
        id: c.id,
        title: c.title,
      }));
      setCategories(catItems);

      setServices(svcs.items ?? []);
      if (!categoryId && catItems[0]?.id) setCategoryId(catItems[0].id);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setPreview(null);
  }, [file]);

  const sorted = useMemo(
    () => [...services].sort((a, b) => a.order - b.order),
    [services]
  );

  const createService = async () => {
    if (!categoryId || !title.trim() || !subtitle.trim() || !file) {
      toast.error("Category, title, subtitle and image required");
      return;
    }
    setBusy(true);
    try {
      const { imageUrl } = await cloudinaryUpload(file);

      await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          title: title.trim(),
          subtitle: subtitle.trim(),
          imageUrl,
          color: color.trim() || "from-gray-800 to-black",
          published: true,
        }),
      });

      setTitle("");
      setSubtitle("");
      setColor("from-gray-800 to-black");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      toast.success("Service created");
      await loadAll();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create service");
    } finally {
      setBusy(false);
    }
  };

  const updateService = async (id: string, patch: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? ({ ...s, ...patch } as Service) : s))
    );
    try {
      await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Update failed, reloading...");
      await loadAll();
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      toast.success("Service deleted");
      await loadAll();
    } finally {
      setBusy(false);
    }
  };

  const replaceServiceImage = async (id: string, f: File) => {
    setBusy(true);
    try {
      const { imageUrl } = await cloudinaryUpload(f);
      await updateService(id, { imageUrl });
      toast.success("Image replaced");
    } finally {
      setBusy(false);
    }
  };

  const moveUp = async (i: number) => {
    if (i <= 0) return;
    const a = sorted[i];
    const b = sorted[i - 1];

    setServices((prev) => {
      const arr = [...prev];
      const ai = arr.findIndex((x) => x.id === a.id);
      const bi = arr.findIndex((x) => x.id === b.id);
      [arr[ai].order, arr[bi].order] = [arr[bi].order, arr[ai].order];
      return arr;
    });

    await Promise.all([
      updateService(a.id, { order: b.order }),
      updateService(b.id, { order: a.order }),
    ]);
  };

  const moveDown = async (i: number) => {
    if (i >= sorted.length - 1) return;
    const a = sorted[i];
    const b = sorted[i + 1];

    setServices((prev) => {
      const arr = [...prev];
      const ai = arr.findIndex((x) => x.id === a.id);
      const bi = arr.findIndex((x) => x.id === b.id);
      [arr[ai].order, arr[bi].order] = [arr[bi].order, arr[ai].order];
      return arr;
    });

    await Promise.all([
      updateService(a.id, { order: b.order }),
      updateService(b.id, { order: a.order }),
    ]);
  };

  const addItem = async (
    serviceId: string,
    payload: { name: string; desc: string }
  ) => {
    await fetch(`/api/admin/services/${serviceId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await loadAll();
  };

  const updateItem = async (itemId: string, patch: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => ({
        ...s,
        items: s.items.map((it) =>
          it.id === itemId ? { ...it, ...patch } : it
        ),
      }))
    );

    try {
      await fetch(`/api/admin/services/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Item update failed, reloading...");
      await loadAll();
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/services/items/${itemId}`, { method: "DELETE" });
    toast.success("Item deleted");
    await loadAll();
  };

  const moveItemUp = async (serviceId: string, itemIndex: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const list = [...service.items].sort((a, b) => a.order - b.order);
    if (itemIndex <= 0) return;

    const a = list[itemIndex];
    const b = list[itemIndex - 1];

    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              items: s.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
          : s
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  const moveItemDown = async (serviceId: string, itemIndex: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const list = [...service.items].sort((a, b) => a.order - b.order);
    if (itemIndex >= list.length - 1) return;

    const a = list[itemIndex];
    const b = list[itemIndex + 1];

    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              items: s.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
          : s
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Services</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage Services (separate from Training Programs)
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Service</h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Service Title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Short subtitle"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Gradient Color
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-mono text-xs"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="from-gray-800 to-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2 flex items-end md:col-span-2 lg:col-span-5">
            <button
              onClick={createService}
              disabled={busy || !categoryId || !title || !subtitle || !file}
              className="w-full rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 hover:bg-gray-800"
            >
              {busy ? "Uploading..." : "Create Service"}
            </button>
          </div>
        </div>

        {preview && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3">
          Images upload to Cloudinary folder{" "}
          <code className="bg-white px-1.5 py-0.5 rounded">
            wadada/services
          </code>
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Services ({sorted.length})
        </h3>

        <div className="space-y-4">
          {sorted.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              categories={categories}
              index={i}
              total={sorted.length}
              onUpdate={updateService}
              onDelete={deleteService}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              onReplaceImage={replaceServiceImage}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onDeleteItem={deleteItem}
              onMoveItemUp={moveItemUp}
              onMoveItemDown={moveItemDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
