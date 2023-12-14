import express,{Request,Response,NextFunction} from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp } from '../controllers';
import { Authenticate } from '../middlewares';
const router = express.Router();

/**------------------- Sign up/ Create Customer -------------------*/
router.post("/signup",CustomerSignUp)

/**------------------- Login -------------------*/
router.post("/login",CustomerLogin)

//Authentication
// router.use(Authenticate)

/**------------------- Verify Customer Account -------------------*/
router.patch("/verify", CustomerVerify);

/**------------------- OTP/Requesting OTP -------------------*/
router.get("/otp",RequestOtp);

//testing for without buying Twilio service for OTP sms ** actually should be at top level **
router.use(Authenticate)
/**------------------- Profile -------------------*/
router.get("/profile",GetCustomerProfile);

router.patch("/profile", EditCustomerProfile);

//Cart
//Order
//Payment
export {router as CustomerRoute}