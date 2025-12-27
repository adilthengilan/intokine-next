// src/app/admin/content/experiences/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  Plus,
  Image as ImgIcon,
} from "lucide-react";
import { toast } from "sonner";

type ExperienceItem = {
  id: string;
  experienceId: string;
  name: string;
  desc: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

type Experience = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  publicId?: string | null;
  imageUrl?: string | null;
  layout: "left" | "right" | string;
  order: number;
  published: boolean;
  items: ExperienceItem[];
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

function cldFill(url: string, w: number, h: number) {
  try {
    if (!url || !url.includes("/upload/")) return url;
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`
    );
  } catch {
    return url;
  }
}

function BulletRow({
  item,
  onUpdate,
  onDelete,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  item: ExperienceItem;
  onUpdate: (id: string, patch: Partial<ExperienceItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => Promise<void>;
  onMoveDown: () => Promise<void>;
}) {
  const [form, setForm] = useState({
    name: item.name,
    desc: item.desc ?? "",
    order: item.order,
  });
  const [saving, setSaving] = useState(false);

  const dirty =
    form.name !== item.name ||
    (form.desc ?? "") !== (item.desc ?? "") ||
    form.order !== item.order;

  const doSave = async () => {
    if (!form.name.trim()) return toast.error("Item name is required");
    const patch = diffPatch(item, {
      name: form.name,
      desc: form.desc ?? "",
      order: form.order,
    });
    if (!Object.keys(patch).length) return;

    setSaving(true);
    try {
      await onUpdate(item.id, patch);
      toast.success("Item updated");
    } finally {
      setSaving(false);
    }
  };

  const doCancel = () =>
    setForm({ name: item.name, desc: item.desc ?? "", order: item.order });

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-white">
      <div className="grid md:grid-cols-[1fr_1.5fr_auto] gap-3 items-start">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Mobility drills"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </label>
          <input
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Optional short detail"
          />
        </div>

        <div className="flex gap-2 md:justify-end pt-6">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title="Move up"
          >
            <MoveUp className="h-4 w-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title="Move down"
          >
            <MoveDown className="h-4 w-4" />
          </button>
          <button
            onClick={doSave}
            disabled={!dirty || saving}
            className="px-3 py-2 rounded-lg bg-black text-white disabled:opacity-50 hover:bg-gray-800"
          >
            {saving ? "..." : "Save"}
          </button>
          <button
            onClick={doCancel}
            disabled={!dirty || saving}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            title="Delete item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  onMoveItemUp,
  onMoveItemDown,
}: {
  exp: Experience;
  index: number;
  total: number;
  onUpdate: (id: string, patch: Partial<Experience>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMoveUp: (i: number) => Promise<void>;
  onMoveDown: (i: number) => Promise<void>;
  onCreateItem: (
    experienceId: string,
    payload: { name: string; desc: string }
  ) => Promise<void>;
  onUpdateItem: (
    itemId: string,
    patch: Partial<ExperienceItem>
  ) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
  onMoveItemUp: (experienceId: string, itemIndex: number) => Promise<void>;
  onMoveItemDown: (experienceId: string, itemIndex: number) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: exp.title,
    subtitle: exp.subtitle ?? "",
    description: exp.description ?? "",
    layout: (exp.layout === "right" ? "right" : "left") as "left" | "right",
    order: exp.order,
    published: exp.published,
  });

  const [saving, setSaving] = useState(false);

  const [newItem, setNewItem] = useState({ name: "", desc: "" });
  const [addingItem, setAddingItem] = useState(false);

  const [uploadingImg, setUploadingImg] = useState(false);

  const dirty =
    form.title !== exp.title ||
    (form.subtitle ?? "") !== (exp.subtitle ?? "") ||
    (form.description ?? "") !== (exp.description ?? "") ||
    form.layout !== (exp.layout === "right" ? "right" : "left") ||
    form.order !== exp.order ||
    form.published !== exp.published;

  const doSave = async () => {
    if (!form.title.trim()) return toast.error("Title is required");

    const patch = diffPatch(exp, {
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      layout: form.layout,
      order: form.order,
      published: form.published,
    });

    if (!Object.keys(patch).length) return;

    setSaving(true);
    try {
      await onUpdate(exp.id, patch);
      toast.success("Experience updated");
    } finally {
      setSaving(false);
    }
  };

  const doCancel = () =>
    setForm({
      title: exp.title,
      subtitle: exp.subtitle ?? "",
      description: exp.description ?? "",
      layout: (exp.layout === "right" ? "right" : "left") as "left" | "right",
      order: exp.order,
      published: exp.published,
    });

  const sortedItems = useMemo(
    () => [...(exp.items ?? [])].sort((a, b) => a.order - b.order),
    [exp.items]
  );

  const addBullet = async () => {
    if (!newItem.name.trim()) return toast.error("Item name is required");
    setAddingItem(true);
    try {
      await onCreateItem(exp.id, {
        name: newItem.name.trim(),
        desc: newItem.desc.trim(),
      });
      setNewItem({ name: "", desc: "" });
      toast.success("Item added");
    } finally {
      setAddingItem(false);
    }
  };

  const uploadImage = async (file: File) => {
    setUploadingImg(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/admin/experiences/${exp.id}/image`, {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Upload failed");

      // update parent state immediately
      await onUpdate(exp.id, {
        imageUrl: json.item.imageUrl,
        publicId: json.item.publicId,
      } as any);

      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploadingImg(false);
    }
  };

  const removeImage = async () => {
    try {
      await onUpdate(exp.id, { imageUrl: null, publicId: null } as any);
      toast.success("Image removed");
    } catch {
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-5">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                  {exp.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cldFill(exp.imageUrl, 160, 160)}
                      alt={exp.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImgIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>

                {/* Upload + remove */}
                <label className="cursor-pointer">
                  <div className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-center border border-gray-300">
                    {uploadingImg
                      ? "Uploading..."
                      : exp.imageUrl
                      ? "Replace"
                      : "Upload"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingImg}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      uploadImage(file);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>

                {exp.imageUrl ? (
                  <button
                    onClick={removeImage}
                    className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-300"
                  >
                    Remove
                  </button>
                ) : null}

                <p className="text-[10px] text-gray-500 text-center">
                  Recommended: 3:4 (timeline cards)
                </p>
              </div>

              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Calisthenics Training"
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
                        await onUpdate(exp.id, { published: next });
                        toast.success("Visibility updated");
                      } catch {
                        setForm((f) => ({ ...f, published: exp.published }));
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

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtitle (optional)
                </label>
                <input
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subtitle: e.target.value }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Short tagline"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Layout
                </label>
                <select
                  value={form.layout}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, layout: e.target.value as any }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
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
                placeholder="Short paragraph shown in timeline"
              />
            </div>
          </div>

          {/* Order + actions */}
          <div className="lg:w-64">
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
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-center"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
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

              <button
                onClick={() => onDelete(exp.id)}
                className="ml-auto flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bullet items */}
        <div className="border-t pt-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">Bullet Items</h4>
              <p className="text-sm text-gray-600">
                Optional points for this experience (shown under description or
                can be used to build it).
              </p>
            </div>
          </div>

          {/* Add item */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
            <div className="grid md:grid-cols-[1fr_1.5fr_auto] gap-3 items-end">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </label>
                <input
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Strength, control, creativity"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </label>
                <input
                  value={newItem.desc}
                  onChange={(e) =>
                    setNewItem((s) => ({ ...s, desc: e.target.value }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional detail"
                />
              </div>
              <button
                onClick={addBullet}
                disabled={addingItem || !newItem.name.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2.5 font-medium disabled:opacity-50 hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                {addingItem ? "Adding..." : "Add"}
              </button>
            </div>
          </div>

          {/* Existing items */}
          {sortedItems.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <Sparkles className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-700 font-medium">No bullet items</p>
              <p className="text-sm text-gray-500 mt-1">
                Add points above if you want.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedItems.map((it, idx) => (
                <BulletRow
                  key={it.id}
                  item={it}
                  onUpdate={onUpdateItem}
                  onDelete={onDeleteItem}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < sortedItems.length - 1}
                  onMoveUp={() => onMoveItemUp(exp.id, idx)}
                  onMoveDown={() => onMoveItemDown(exp.id, idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  // create form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [layout, setLayout] = useState<"left" | "right">("left");

  const titleRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/experiences", { cache: "no-store" });
    const json = await res.json();
    setItems(
      (json.items ?? []).map((x: any) => ({ ...x, items: x.items ?? [] }))
    );
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createExperience = async () => {
    if (!title.trim()) return toast.error("Title is required");
    setBusy(true);
    try {
      await fetch("/api/admin/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle: subtitle || null,
          description: description || null,
          layout,
          published: true,
        }),
      });

      setTitle("");
      setSubtitle("");
      setDescription("");
      setLayout("left");
      titleRef.current?.focus();

      toast.success("Experience created");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const updateExperience = async (id: string, patch: Partial<Experience>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? ({ ...it, ...patch } as any) : it))
    );
    try {
      await fetch(`/api/admin/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {
      toast.error("Update failed, reloading...");
      await load();
    }
  };

  const deleteExperience = async (id: string) => {
    if (
      !confirm(
        "Delete this experience? This will also delete its bullet items."
      )
    )
      return;
    setBusy(true);
    try {
      await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
      toast.success("Experience deleted");
      await load();
    } finally {
      setBusy(false);
    }
  };

  // items CRUD
  const createItem = async (
    experienceId: string,
    payload: { name: string; desc: string }
  ) => {
    setBusy(true);
    try {
      await fetch(`/api/admin/experiences/${experienceId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const updateItem = async (itemId: string, patch: Partial<ExperienceItem>) => {
    // optimistic update
    setItems((prev) =>
      prev.map((e) => ({
        ...e,
        items: (e.items ?? []).map((it) =>
          it.id === itemId ? { ...it, ...patch } : it
        ),
      }))
    );

    try {
      await fetch(`/api/admin/experiences/items/${itemId}`, {
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
    if (!confirm("Delete this bullet item?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/experiences/items/${itemId}`, {
        method: "DELETE",
      });
      toast.success("Item deleted");
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
      updateExperience(a.id, { order: b.order } as any),
      updateExperience(b.id, { order: a.order } as any),
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
      updateExperience(a.id, { order: b.order } as any),
      updateExperience(b.id, { order: a.order } as any),
    ]);
  };

  const moveItemUp = async (experienceId: string, itemIndex: number) => {
    const exp = sorted.find((x) => x.id === experienceId);
    if (!exp) return;
    const list = [...(exp.items ?? [])].sort((a, b) => a.order - b.order);
    if (itemIndex <= 0) return;

    const a = list[itemIndex];
    const b = list[itemIndex - 1];

    // optimistic swap
    setItems((prev) =>
      prev.map((e) =>
        e.id !== experienceId
          ? e
          : {
              ...e,
              items: e.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  const moveItemDown = async (experienceId: string, itemIndex: number) => {
    const exp = sorted.find((x) => x.id === experienceId);
    if (!exp) return;
    const list = [...(exp.items ?? [])].sort((a, b) => a.order - b.order);
    if (itemIndex >= list.length - 1) return;

    const a = list[itemIndex];
    const b = list[itemIndex + 1];

    setItems((prev) =>
      prev.map((e) =>
        e.id !== experienceId
          ? e
          : {
              ...e,
              items: e.items.map((it) =>
                it.id === a.id
                  ? { ...it, order: b.order }
                  : it.id === b.id
                  ? { ...it, order: a.order }
                  : it
              ),
            }
      )
    );

    await Promise.all([
      updateItem(a.id, { order: b.order }),
      updateItem(b.id, { order: a.order }),
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Experiences</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage timeline experiences shown on the public site
        </p>
      </div>

      {/* Create */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-gray-900" />
          <h3 className="font-semibold text-gray-900">Add New Experience</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              ref={titleRef}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Martial Arts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Subtitle (optional)
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Short tagline"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Short paragraph shown in timeline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Layout</label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={createExperience}
            disabled={busy || !title.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-6 py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            <Upload className="h-4 w-4" />
            {busy ? "Creating..." : "Create Experience"}
          </button>
        </div>
      </div>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Existing Experiences ({loading ? "..." : items.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-40 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No experiences yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first experience above
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {sorted.map((exp, i, arr) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                total={arr.length}
                onUpdate={updateExperience}
                onDelete={deleteExperience}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                onCreateItem={createItem}
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
