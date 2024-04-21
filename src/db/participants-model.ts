import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: [true, "Habit is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Participant ||
  mongoose.model("Participant", participantSchema);
