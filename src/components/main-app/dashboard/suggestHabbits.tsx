import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const habitSuggestion = [
  {
    habitName: "Jogging",
  },
  {
    habitName: "Walking",
  },
];

export default function SuggestHabbits() {
  return (
    <div>
      <div className="border-b-2 border-black p-2">
        <h1 className="font-bold text-l">Habit Suggestions:</h1>
      </div>
      <div className="flex mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Habit Name</TableHead>
              <TableHead>Join?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habitSuggestion.map((habit, index) => {
              return (
                <TableRow key={habit.habitName}>
                  <TableCell>{habit.habitName}</TableCell>
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
