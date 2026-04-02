import { userAgent } from "next/server";
import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
      
    // Check if we already have a user with this email or token.
    let user = null;
    
    if (identity.email) {
      user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", identity.email))
        .first();
    }

    if (!user) {
      user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .unique();
    }

    if (user !== null) {
      if (
        user.name !== identity.name || 
        user.email !== identity.email || 
        user.image !== identity.pictureUrl ||
        user.tokenIdentifier !== identity.tokenIdentifier
      ) {
        await ctx.db.patch(user._id, { 
            name: identity.name,
            email: identity.email,
            image: identity.pictureUrl,
            tokenIdentifier: identity.tokenIdentifier
        });
      }
      return user._id;
    }
    
    // If it's a completely new user
    return await ctx.db.insert("users", {
      name: identity.name,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email,
      image: identity.pictureUrl,
    });
  },
});

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return null;
      return await ctx.db
        .query("users")
        .withIndex("by_token", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .unique();
    },
});
