import passport from "passport";

export const current = passport.authenticate("jwt", { session: false });