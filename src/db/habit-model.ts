import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    habitName: {
      type: String,
      required: [true, "Please give a name for the habit."],
      minlength: 2,
      maxlength: 50,
    },
    habitType: {
      type: String,
      required: [true, "Please select an habit type."],
    },
    doc: {
      type: Date,
      required: [true, "A starting date is required."],
    },
    makePublic: {
      type: Boolean,
      default: false,
    },
    madeBy: {
      type: String,
      required: [true, "Please provide an ID for the creator."],
    },
    participants: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Habit || mongoose.model("Habit", habitSchema);
