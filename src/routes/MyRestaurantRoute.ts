import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
 
router.patch("/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus);


router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantOrders
);


// /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);
router.put(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant
);

router.post("/",upload.single("imageFile"),validateMyRestaurantRequest, jwtCheck, jwtParse,  MyRestaurantController.createMyRestaurant);
export default router;