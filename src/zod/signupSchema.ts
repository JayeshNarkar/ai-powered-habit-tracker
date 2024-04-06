import { z } from "zod";

export default z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
