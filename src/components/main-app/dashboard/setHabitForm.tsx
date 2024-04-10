"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Book,
  CalendarIcon,
  Heart,
  MoreHorizontalIcon,
  SmileIcon,
  Users,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  habitName: z.string().min(2).max(50),
  habitType: z.string({
    required_error: "Please select an habit type.",
  }),
  doc: z.date({
    required_error: "A starting date is required.",
  }),
  makePublic: z.boolean().default(false).optional(),
});

export default function SetHabitForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habitName: "",
      makePublic: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-3">
        <FormField
          control={form.control}
          name="habitName"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Habit Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jogging, running, etc..."
                  {...field}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="habitType"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Habit Type:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <SelectValue placeholder="Select a type for your habit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Health">
                    <div className="flex items-center">
                      <Heart className="mr-2" /> Health
                    </div>
                  </SelectItem>
                  <SelectItem value="Social">
                    <div className="flex items-center">
                      <Users className="mr-2" />
                      Social
                    </div>
                  </SelectItem>
                  <SelectItem value="Intellectual">
                    <div className="flex items-center">
                      <Book className="mr-2" />
                      Intellectual
                    </div>
                  </SelectItem>
                  <SelectItem value="Emotional">
                    <div className="flex items-center">
                      <SmileIcon className="mr-2" />
                      Emotional
                    </div>
                  </SelectItem>
                  <SelectItem value="Other">
                    <div className="flex items-center">
                      <MoreHorizontalIcon className="mr-2" />
                      Other
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doc"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the day you started or plan on starting your new habit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="makePublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center rounded-md border mb-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="ml-2">
                <FormLabel>Public:</FormLabel>
                <FormDescription>
                  Would you like to make this habit public?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" variant={"secondary"}>
          <Book />
          Track Habit
        </Button>
      </form>
    </Form>
  );
}
