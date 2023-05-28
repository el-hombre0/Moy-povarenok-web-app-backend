import jwt from "jsonwebtoken";

export default (roles) => {
  return function (req, res, next) {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      try {
        const { roles: userRoles } = jwt.verify(token, "secret123");
        let hasRole = false;

        /** Перебор ролей пользователя */
        userRoles.forEach((role) => {
          /** Если у пользователя есть роль, также содержащаяся в массиве разрешённых ролей */
          if (roles.includes(role)) {
            hasRole = true;
          }
        });
        if (!hasRole) {
          return res.status(403).json({
            message: "Access denied",
          });
        }
        next();
      } catch (error) {
        console.log(error);
        return res.status(403).json({
          message: "Access denied",
        });
      }
    } else {
      return res.status(403).json({
        message: "Authentication faild! Try again later",
      });
    }
  };
};
