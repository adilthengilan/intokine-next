// src/app/admin/content/layout.tsx
import type { ReactNode } from "react";
import AdminContentNav from "@/components/admin/AdminContentNav";
import { Toaster } from "sonner";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <AdminContentNav />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
