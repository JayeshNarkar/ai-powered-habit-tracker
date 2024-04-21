import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const habits = [
  {
    habitName: "Running",
    habitType: "Exercise",
    doc: new Date(),
    makePublic: true,
    madeBy: "141546762",
    participants: [
      {
        id: "141546762",
        dates: [
          new Date("2022-01-01"),
          new Date("2022-01-02"),
          new Date("2022-01-03"),
          new Date(),
        ],
        type: "private",
        onGoing: true,
      },
    ],
  },
];

const calculateStreaks = (dates: Date[]) => {
  // Sort dates in ascending order
  dates.sort((a, b) => a - b);

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  for (const date of dates) {
    if (!previousDate) {
      previousDate = date;
      currentStreak = 1;
      longestStreak = 1;
      continue;
    }

    const diff = (date - previousDate) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentStreak++;
    } else if (diff > 1) {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    previousDate = date;
  }

  // Reset current streak if the habit wasn't maintained yesterday or today
  const lastDate = dates[dates.length - 1];
  if (
    lastDate.getDate() !== today.getDate() &&
    lastDate.getDate() !== yesterday.getDate()
  ) {
    currentStreak = 0;
  }

  return { longestStreak, currentStreak };
};

export default function HabitsList() {
  const currentDate = new Date();
  return (
    <div>
      <div className="border-b-2 border-black p-2">
        <h1 className="font-bold text-l">Current Habits:</h1>
      </div>
      <div className="flex mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Habit Name</TableHead>
              <TableHead>Longest Streak</TableHead>
              <TableHead>Current Streak</TableHead>
              <TableHead>{currentDate.toLocaleDateString("en-CA")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habits.map((habit, index) => {
              const { longestStreak, currentStreak } = calculateStreaks(
                habit.participants[0].dates
              );
              return (
                <TableRow key={habit.habitName}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{habit.habitName}</TableCell>
                  <TableCell className="text-center">{longestStreak}</TableCell>
                  <TableCell className="text-center">{currentStreak}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
