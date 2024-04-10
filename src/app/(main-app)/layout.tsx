import SideBar from "@/components/main-app/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-full min-h-screen grid grid-cols-10">
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap"
        rel="stylesheet"
      ></link>
      <div className="col-span-3 md:col-span-2 p-3 flex flex-col space-y-3 overflow-auto">
        <SideBar />
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      />
      <div
        className="col-span-7 md:col-span-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}
