import express from "express";
import { registerController, loginController, test, forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

// router Object
const router = express.Router()

//routing
//register post method
router.post('/register', registerController)
//login post
router.post('/login', loginController)

//forget password
router.post('/forget-password', forgetPasswordController)

// for testing
//middleware hamesa url ke baad controller ke pahele kitna bhi middleware daal sakte hai
// router.get('/test', requireSignin, test)

// in this token and admin also check firs check requir then isadmin
router.get('/test', requireSignin, isAdmin, test)

// protected rout auth for check authontication user route
router.get("/user-auth", requireSignin, (req, resp) => {
    resp.status(200).send({ ok: true });
})

// protected rout auth for check authontication of admin route
router.get("/admin-auth", requireSignin, isAdmin, (req, resp) => {
    resp.status(200).send({ ok: true });
})

//update profile of user
router.put("/profile", requireSignin, updateProfileController);

//see all orderd ordered by users
router.get("/orders", requireSignin, getOrdersController);

//all orders which show in admin for change state of orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);


// order status update by admin
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatusController);

export default router;