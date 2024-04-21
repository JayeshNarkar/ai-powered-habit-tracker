import HabitsList from "@/components/main-app/dashboard/habitsList";
import SuggestHabbits from "@/components/main-app/dashboard/suggestHabbits";
import WeekOverview from "@/components/main-app/dashboard/weekOverview";

export default function DashBoard() {
  return (
    <div className="md:grid gap-4 min-h-screen p-3 md:grid-rows-5 md:max-h-screen">
      <div className="md:grid grid-cols-4 row-span-3">
        <div className="bg-gray-200 rounded-md p-3 mb-3 md:mb-0 md:mr-4 md:col-span-1">
          <SuggestHabbits />
        </div>
        <div className="md:flex-grow bg-gray-200 rounded-md p-3 mb-3 md:mb-0 md:col-span-3 overflow-y-auto">
          <HabitsList />
        </div>
      </div>
      <div className="bg-gray-200 rounded-md p-3 mb-3 md:mb-0 row-span-2">
        <WeekOverview />
      </div>
    </div>
  );
}
