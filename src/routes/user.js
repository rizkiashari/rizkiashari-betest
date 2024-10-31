const { Router } = require("express");

const UserController = require("../controllers/user.js");
const AuthService = require("../services/auth.js");

const router = Router();

router.get("/", UserController.getUsers);
router.post("/sign-up", UserController.createUser);

router.get(
  "/:accountNumber",
  AuthService.verifyToken,
  UserController.getUserByAccountNumber
);
router.get(
  "/identity/:identityNumber",
  AuthService.verifyToken,
  UserController.getUserByIdentityNumber
);
router.put(
  "/:accountNumber",
  AuthService.verifyToken,
  UserController.updateUser
);
router.delete(
  "/:accountNumber",
  AuthService.verifyToken,
  UserController.deleteUser
);

module.exports = router;
