"use client";
import HabitsList from "@/components/main-app/dashboard/habitsList";
import SetHabitForm from "@/components/main-app/dashboard/setHabitForm";
import WeekOverview from "@/components/main-app/dashboard/weekOverview";
import { useSession } from "next-auth/react";

export default function DashBoard() {
  const { data: session, status } = useSession();
  return (
    <div className="lg:grid lg:grid-rows-6 lg:grid-cols-5 gap-4 min-h-screen p-3">
      <div className="lg:row-span-4 lg:col-span-3 bg-gray-200 rounded-md p-3 mb-3 lg:mb-0">
        <SetHabitForm />
      </div>
      <div className="lg:col-span-2 lg:row-span-4 bg-gray-200 rounded-md p-3 mb-3 lg:mb-0">
        <HabitsList />
      </div>
      <div className="lg:row-span-2 lg:col-span-5 bg-gray-200 rounded-md p-3 mb-3 lg:mb-0">
        <WeekOverview />
      </div>
    </div>
  );
}
