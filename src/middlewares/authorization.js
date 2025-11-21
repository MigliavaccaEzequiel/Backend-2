import passport from "passport";

export const authorization = (roles = []) => {
  return async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) return res.status(500).json({ error: "Error de autenticación" });

      if (!user) {
        return res.status(401).json({ error: "No hay usuario autenticado" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};