import { internalMutation } from "./_generated/server";

export const deduplicateUsers = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("users").collect();
    const emailsToKeep = new Map();

    for (const user of allUsers) {
      if (user.email) {
        if (emailsToKeep.has(user.email)) {
          // It's a duplicate, keeping the original
          await ctx.db.delete(user._id);
        } else {
          emailsToKeep.set(user.email, user._id);
        }
      }
    }
    return "Deduplication complete.";
  },
});
