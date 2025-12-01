// src/app/admin/content/coaches/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  User,
} from "lucide-react";
import { toast } from "sonner";

type Item = {
  id: string;
  name: string;
  specialty: string;
  description: string | null;
  publicId: string;
  imageUrl: string;
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
    name: item.name,
    specialty: item.specialty,
    description: item.description ?? "",
    order: item.order,
    published: item.published,
  });
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      form.name !== item.name ||
      form.specialty !== item.specialty ||
      (form.description ?? "") !== (item.description ?? "") ||
      form.order !== item.order ||
      form.published !== item.published,
    [form, item]
  );

  const doSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.specialty.trim()) return toast.error("Specialty is required");

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
      name: item.name,
      specialty: item.specialty,
      description: item.description ?? "",
      order: item.order,
      published: item.published,
    });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image */}
        <div className="relative w-full lg:w-64 h-48 flex-shrink-0">
          <img
            src={item.imageUrl}
            alt={item.name}
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

        {/* Fields */}
        <div className="flex-1 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Coach name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </label>
              <input
                value={form.specialty}
                onChange={(e) =>
                  setForm((f) => ({ ...f, specialty: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Trail Running"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full min-h-[80px] border border-gray-300 rounded-lg px-3 py-2 text-sm resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Short bio or what this coach focuses on in training"
            />
            <p className="mt-1 text-xs text-gray-400">
              Keep it crisp (1–3 lines). This can show on the public coaches
              section.
            </p>
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

          {/* Image replace */}
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

        {/* Danger zone */}
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

export default function AdminCoachesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/coaches", { cache: "no-store" });
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
    if (!name.trim() || !specialty.trim() || !file) {
      return alert("Name, specialty and image are required");
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      fd.append("folder", "wadada/coaches");

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

      await fetch("/api/admin/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          specialty,
          description: description || null,
          publicId: upJson.public_id,
          imageUrl: upJson.secure_url,
          published: true,
        }),
      });

      setName("");
      setSpecialty("");
      setDescription("");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      nameRef.current?.focus();

      toast.success("Coach added");
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
      await fetch(`/api/admin/coaches/${id}`, {
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
    if (!confirm("Delete this coach?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/coaches/${id}`, { method: "DELETE" });
      toast.success("Coach deleted");
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
        <h2 className="text-2xl font-bold text-gray-900">Coaches</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage the coaches shown on the public site
        </p>
      </div>

      {/* Create form */}
      <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 border border-rose-100">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-gray-900">Add New Coach</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              ref={nameRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Coach name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Specialty
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g. Speed & Sprint"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-vertical focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Short bio or what this coach helps you achieve"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-red-700 hover:file:bg-rose-100"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={createItem}
            disabled={busy || !name || !specialty || !file}
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            <Upload className="h-4 w-4" />
            {busy ? "Uploading..." : "Create Coach"}
          </button>

          {preview && (
            <div className="p-2 bg-white rounded-lg border border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>
            Images are uploaded to Cloudinary folder{" "}
            <code className="bg-white px-1.5 py-0.5 rounded">
              wadada/coaches
            </code>
          </span>
        </p>
      </div>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Coaches ({loading ? "..." : items.length})
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
            <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No coaches yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first coach above
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((it, i) => (
              <ItemCard
                key={it.id}
                item={it}
                index={i}
                total={sorted.length}
                onUpdate={updateItem}
                onDelete={deleteItem}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                onReplaceImage={async (id, file) => {
                  setBusy(true);
                  try {
                    const fd = new FormData();
                    fd.append("file", file);
                    fd.append("upload_preset", PRESET);
                    fd.append("folder", "wadada/coaches");

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
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
