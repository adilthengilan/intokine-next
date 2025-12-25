// src/app/admin/content/training-programs/page.tsx
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

type ProgramItem = {
  id: string;
  name: string;
  desc: string;
  order: number;
};

type Program = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
  order: number;
  published: boolean;
  items: ProgramItem[];
  createdAt: string;
  updatedAt: string;
};

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function diffPatch<T extends Record<string, any>>(orig: T, curr: Partial<T>) {
  const patch: Partial<T> = {};
  for (const k of Object.keys(curr)) {
    // @ts-ignore
    if (curr[k] !== (orig as any)[k]) {
      // @ts-ignore
      patch[k] = curr[k];
    }
  }
  return patch;
}

async function cloudinaryUpload(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", PRESET);
  fd.append("folder", "wadada/training-programs");

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
  item: ProgramItem;
  index: number;
  total: number;
  onUpdate: (itemId: string, patch: Partial<ProgramItem>) => Promise<void>;
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

  const dirty = useMemo(() => {
    return (
      form.name !== item.name ||
      form.desc !== item.desc ||
      form.order !== item.order
    );
  }, [form, item]);

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

  const cancel = () => {
    setForm({ name: item.name, desc: item.desc, order: item.order });
  };

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
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-6">
          <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Description
          </label>
          <input
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Move up"
            >
              <MoveUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === total - 1}
              className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Update item"}
        </button>
        <button
          onClick={cancel}
          disabled={!dirty || saving}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

function ProgramCard({
  program,
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
  program: Program;
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<Program>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
  onReplaceImage: (id: string, file: File) => Promise<void>;
  onAddItem: (
    programId: string,
    payload: { name: string; desc: string }
  ) => Promise<void>;
  onUpdateItem: (itemId: string, patch: Partial<ProgramItem>) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
  onMoveItemUp: (programId: string, itemIndex: number) => Promise<void>;
  onMoveItemDown: (programId: string, itemIndex: number) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: program.title,
    subtitle: program.subtitle,
    imageUrl: program.imageUrl,
    color: program.color,
    order: program.order,
    published: program.published,
  });

  const [saving, setSaving] = useState(false);

  const [newItem, setNewItem] = useState({ name: "", desc: "" });
  const [addingItem, setAddingItem] = useState(false);

  const dirty = useMemo(() => {
    return (
      form.title !== program.title ||
      form.subtitle !== program.subtitle ||
      form.imageUrl !== program.imageUrl ||
      form.color !== program.color ||
      form.order !== program.order ||
      form.published !== program.published
    );
  }, [form, program]);

  const doSave = async () => {
    if (!form.title.trim() || !form.subtitle.trim() || !form.imageUrl.trim()) {
      toast.error("Title, subtitle and image are required");
      return;
    }
    const patch = diffPatch(program, form);
    if (!Object.keys(patch).length) return;

    setSaving(true);
    try {
      await onUpdate(program.id, patch);
      toast.success("Program updated");
    } finally {
      setSaving(false);
    }
  };

  const doCancel = () => {
    setForm({
      title: program.title,
      subtitle: program.subtitle,
      imageUrl: program.imageUrl,
      color: program.color,
      order: program.order,
      published: program.published,
    });
  };

  const sortedItems = useMemo(() => {
    return [...(program.items ?? [])].sort((a, b) => a.order - b.order);
  }, [program.items]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image */}
        <div className="relative w-full lg:w-72 h-48 flex-shrink-0">
          <img
            src={program.imageUrl}
            alt={program.title}
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

        {/* Fields */}
        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
                placeholder="Personal Training"
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
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="One-on-One Coaching"
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
                      await onUpdate(program.id, { published: next });
                      toast.success("Visibility updated");
                    } catch {
                      setForm((f) => ({ ...f, published: program.published }));
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

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gradient Color
              </label>
              <input
                value={form.color}
                onChange={(e) =>
                  setForm((f) => ({ ...f, color: e.target.value }))
                }
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="from-blue-600 to-blue-900"
              />
              <p className="mt-1 text-xs text-gray-400">
                Tailwind gradient classes (example:{" "}
                <span className="font-mono">from-blue-600 to-blue-900</span>)
              </p>
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
                const input = e.currentTarget;
                const f = input.files?.[0];
                if (f) {
                  await onReplaceImage(program.id, f);
                  input.value = "";
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Save / Cancel */}
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

          {/* Items */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Program Items</h4>
              <span className="text-xs text-gray-500">
                ({sortedItems.length})
              </span>
            </div>

            {/* Add item */}
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
                    placeholder="Outdoor Batch Training"
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
                    placeholder="Group sessions in scenic locations"
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
                      await onAddItem(program.id, {
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
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
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

            {/* Items list */}
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
                    onMoveUp={(idx) => onMoveItemUp(program.id, idx)}
                    onMoveDown={(idx) => onMoveItemDown(program.id, idx)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Dangerous */}
        <div className="flex lg:flex-col gap-2">
          <button
            onClick={() => onDelete(program.id)}
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

export default function AdminTrainingProgramsPage() {
  const [items, setItems] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // create form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [color, setColor] = useState("from-gray-800 to-black");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/training-programs", {
        cache: "no-store",
      });
      const json = await res.json();
      setItems(json.items ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setPreview(null);
  }, [file]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const createProgram = async () => {
    if (!title.trim() || !subtitle.trim() || !file) {
      toast.error("Title, subtitle and image required");
      return;
    }
    setBusy(true);
    try {
      const { imageUrl } = await cloudinaryUpload(file);

      await fetch("/api/admin/training-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      titleRef.current?.focus();

      toast.success("Program created");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create");
    } finally {
      setBusy(false);
    }
  };

  const updateProgram = async (id: string, patch: Partial<Program>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? ({ ...it, ...patch } as Program) : it))
    );

    try {
      await fetch(`/api/admin/training-programs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch (e) {
      toast.error("Update failed, reloading...");
      await load();
    }
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/training-programs/${id}`, { method: "DELETE" });
      toast.success("Program deleted");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const replaceProgramImage = async (id: string, file: File) => {
    setBusy(true);
    try {
      const { imageUrl } = await cloudinaryUpload(file);
      await updateProgram(id, { imageUrl });
      toast.success("Image replaced");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to replace image");
    } finally {
      setBusy(false);
    }
  };

  // reorder programs (swap order numbers)
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
      updateProgram(a.id, { order: b.order }),
      updateProgram(b.id, { order: a.order }),
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
      updateProgram(a.id, { order: b.order }),
      updateProgram(b.id, { order: a.order }),
    ]);
  };

  // items CRUD
  const addItem = async (
    programId: string,
    payload: { name: string; desc: string }
  ) => {
    // optimistic: just reload after create to keep it simple
    await fetch(`/api/admin/training-programs/${programId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await load();
  };

  const updateItem = async (itemId: string, patch: Partial<ProgramItem>) => {
    // Optimistic update inside nested state
    setItems((prev) =>
      prev.map((p) => ({
        ...p,
        items: p.items.map((it) =>
          it.id === itemId ? { ...it, ...patch } : it
        ),
      }))
    );

    try {
      await fetch(`/api/admin/training-programs/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Item update failed, reloading...");
      await load();
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/training-programs/items/${itemId}`, {
      method: "DELETE",
    });
    toast.success("Item deleted");
    await load();
  };

  const moveItemUp = async (programId: string, itemIndex: number) => {
    const program = sorted.find((p) => p.id === programId);
    if (!program) return;

    const list = [...program.items].sort((a, b) => a.order - b.order);
    if (itemIndex <= 0) return;

    const a = list[itemIndex];
    const b = list[itemIndex - 1];

    // swap in UI
    setItems((prev) =>
      prev.map((p) =>
        p.id === programId
          ? {
              ...p,
              items: p.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
          : p
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  const moveItemDown = async (programId: string, itemIndex: number) => {
    const program = sorted.find((p) => p.id === programId);
    if (!program) return;

    const list = [...program.items].sort((a, b) => a.order - b.order);
    if (itemIndex >= list.length - 1) return;

    const a = list[itemIndex];
    const b = list[itemIndex + 1];

    setItems((prev) =>
      prev.map((p) =>
        p.id === programId
          ? {
              ...p,
              items: p.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
          : p
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Training Programs</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage your /services Training Programs section (live data).
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Add New Program</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              ref={titleRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Personal Training"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="One-on-One Coaching"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Gradient Color
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
              placeholder="from-blue-600 to-blue-900"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2 flex items-end md:col-span-2 lg:col-span-4">
            <button
              onClick={createProgram}
              disabled={busy || !title || !subtitle || !file}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {busy ? "Uploading..." : "Create Program"}
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
            wadada/training-programs
          </code>
        </p>
      </div>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Programs ({loading ? "..." : sorted.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-10 bg-gray-200 rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-600 font-medium">No programs yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Create your first program above
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((p, i) => (
              <ProgramCard
                key={p.id}
                program={p}
                index={i}
                total={sorted.length}
                onUpdate={updateProgram}
                onDelete={deleteProgram}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                onReplaceImage={replaceProgramImage}
                onAddItem={addItem}
                onUpdateItem={updateItem}
                onDeleteItem={deleteItem}
                onMoveItemUp={moveItemUp}
                onMoveItemDown={moveItemDown}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
