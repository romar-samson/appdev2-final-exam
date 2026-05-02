import { mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

export default mutation({
  handler: async (ctx) => {
    // 1. Hash the password to match your login logic in users.ts
    // Use hashSync to keep the seeder simple or await bcrypt.hash
    const hashedPassword = bcrypt.hashSync("password123", 10);

    // 2. Create the User first to get the ID
    const userId = await ctx.db.insert("users", {
      username: "exam_user",
      password: hashedPassword,
    });

    // 3. Define tasks to be seeded
    const tasks = [
      "Install all dependencies",
      "Configure environment variables",
      "Update relational seeder",
      "Finish the Practical Exam"
    ];

    // 4. Insert tasks with the required userId link
    for (const taskText of tasks) {
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: false,
        userId: userId, // This fixes the TS2345 error
      });
    }

    console.log("Success: Seeded 1 user and 4 linked todos.");
  },
});