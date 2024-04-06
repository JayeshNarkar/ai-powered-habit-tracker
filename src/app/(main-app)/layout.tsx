import SideBar from "@/components/main-app/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-full min-h-screen grid grid-cols-10">
      <div className="col-span-3 md:col-span-2 p-3 flex flex-col space-y-3 overflow-auto">
        <SideBar />
      </div>
      <div className="col-span-7 md:col-span-8">
        <p>Layout</p>
        {children}
      </div>
    </div>
  );
}
