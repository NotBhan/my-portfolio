import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
        <header className="w-full flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </header>
        <main className="w-full max-w-[810px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">{children}</main>
        <Toaster />
    </div>
  );
}
