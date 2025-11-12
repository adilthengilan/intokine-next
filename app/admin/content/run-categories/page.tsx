// src/app/admin/content/run-categories/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

type Item = {
  id: string;
  title: string;
  publicId: string;
  imageUrl: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function diffPatch<T extends Record<string, any>>(orig: T, curr: Partial<T>) {
  const patch: Partial<T> = {};
  for (const k of Object.keys(curr)) {
    // @ts-ignore
    if (curr[k] !== (orig as any)[k]) patch[k] = curr[k] as any;
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
  onReplaceImage,
}: {
  item: Item;
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<Item>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
  onReplaceImage: (id: string, file: File) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: item.title,
    order: item.order,
    published: item.published,
  });
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      form.title !== item.title ||
      form.order !== item.order ||
      form.published !== item.published,
    [form, item]
  );

  const doSave = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
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
      title: item.title,
      order: item.order,
      published: item.published,
    });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-64 h-48 flex-shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2">
            {form.published ? (
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                <Eye className="h-3 w-3" /> Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                <EyeOff className="h-3 w-3" /> Hidden
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Tempo Runs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      await onUpdate(item.id, { published: next });
                      toast.success("Visibility updated");
                    } catch {
                      setForm((f) => ({ ...f, published: item.published }));
                      toast.error("Failed to update visibility");
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <MoveUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === total - 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move down"
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
                if (f) await onReplaceImage(item.id, f);
                e.currentTarget.value = "";
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={doSave}
              disabled={!dirty || saving}
              className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              {saving ? "Saving..." : "Update"}
            </button>
            <button
              onClick={doCancel}
              disabled={!dirty || saving}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <button
            onClick={() => onDelete(item.id)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRunCategoriesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/run-categories", { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const createItem = async () => {
    if (!title.trim() || !file) return alert("Title and image required");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      fd.append("folder", "wadada/branding"); // same folder as branding

      const upRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/auto/upload`,
        { method: "POST", body: fd }
      );
      const upJson = await upRes.json();
      if (!upJson?.secure_url || !upJson?.public_id) {
        console.error(upJson);
        alert("Cloudinary upload failed");
        return;
      }

      await fetch("/api/admin/run-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          publicId: upJson.public_id,
          imageUrl: upJson.secure_url,
          published: true,
        }),
      });

      setTitle("");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      titleRef.current?.focus();

      toast.success("Run category added");
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
      await fetch(`/api/admin/run-categories/${id}`, {
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
    if (!confirm("Delete this run category?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/run-categories/${id}`, { method: "DELETE" });
      toast.success("Run category deleted");
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
    const a = sorted[i];
    const b = sorted[i - 1];
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
    const a = sorted[i];
    const b = sorted[i + 1];
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

  const replaceImage = async (id: string, f: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("upload_preset", PRESET);
      fd.append("folder", "wadada/branding"); // same folder

      const upRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/auto/upload`,
        { method: "POST", body: fd }
      );
      const upJson = await upRes.json();
      if (!upJson?.secure_url || !upJson?.public_id) {
        console.error(upJson);
        alert("Cloudinary upload failed");
        return;
      }
      await updateItem(id, {
        imageUrl: upJson.secure_url,
        publicId: upJson.public_id,
      });
      toast.success("Image replaced");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Run Categories</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage category tiles displayed in the Run Categories section
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Add New Category</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              ref={titleRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g. Trail Running"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2 flex items-end">
            <button
              onClick={createItem}
              disabled={busy || !title || !file}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {busy ? "Uploading..." : "Create Category"}
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

        <p className="text-xs text-gray-500 mt-3 flex items-start gap-2">
          <ImageIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>
            Images are uploaded to Cloudinary folder{" "}
            <code className="bg-white px-1.5 py-0.5 rounded">
              wadada/branding
            </code>
          </span>
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Categories ({loading ? "..." : sorted.length})
        </h3>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-64 h-48 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-4">
                    <div className="h-10 bg-gray-200 rounded-lg w-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-gray-200 rounded-lg" />
                      <div className="h-10 bg-gray-200 rounded-lg" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full" />
                    <div className="flex gap-2">
                      <div className="h-10 bg-gray-200 rounded-lg w-24" />
                      <div className="h-10 bg-gray-200 rounded-lg w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                onReplaceImage={replaceImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
