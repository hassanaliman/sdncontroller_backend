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
    "/api/content/app",
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

  app.post(
    "/api/content/portconfig",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.portconfig
  );

  app.get(
    "/api/content/config",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.getConfig
  );

  app.post(
    "/api/content/portdelete",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.portdelete
  );

  app.post(
    "/api/content/vplsconfig",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.vplsconfig
  );

  app.post(
    "/api/content/vplsportconfig",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.vplsportconfig
  );

  app.get(
    "/api/content/vpls",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.vplsList
  );

  app.post(
    "/api/content/delvpls",
    authJwt.verifyTokenPost, 
    authJwt.isAdmin,
    controller.delVpls
  );
};