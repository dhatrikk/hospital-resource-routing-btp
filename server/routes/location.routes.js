const router = express.Router();

router.get("/",allLocations);
router.get("/nearest",nearestLocations);