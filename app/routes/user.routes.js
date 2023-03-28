const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/content/all", controller.allAccess);

  app.get(
    "/api/content/monitoring",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/content/config",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.adminBoard
  );

  app.post(
    "/api/content/activate",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.activateApp
  );

  app.post(
    "/api/content/deactivate",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.deActivateApp
  );

  app.get(
    "/api/content/device",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.getDevice
  );
};