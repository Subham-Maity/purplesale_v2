import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/dbConnection.js";

/* Import your routes */
import cartRoutes from './routes/Cards/cardRoutes.js';
import presaleInfoRoutes from './routes/Launchpad/presaleInfoRoutes.js';
import pinkLockRoutes from './routes/PinkLock/pinkLockRoutes.js';
import fairLaunchRoutes from "./routes/Launchpad/fairlaunchInfoRoutes.js";
import pinkLockWeb3Routes from "./routes/PinkLock/pinkLockWeb3Routes.js";
import dutchAuction from "./routes/Launchpad/dutchAuctionInfoRoutes.js";
import privateSale from "./routes/PrivateSale/privateSaleRoutes.js";
import Subscription from "./routes/Launchpad/subscriptionInfoRoutes.js";
import Airdrop from "./routes/Airdrop/airdropRoutes.js";
import presaleInfoRoutesAlpha from './routes/Alpha/Launchpad/presaleInfoRoutes.js';
import dutchAuctionAlpha from "./routes/Alpha/Launchpad/dutchAuctionInfoRoutes.js";
import SubscriptionAlpha from "./routes/Alpha/Launchpad/subscriptionInfoRoutes.js";
import fairLaunchRoutesAlpha from "./routes/Alpha/Launchpad/fairlaunchInfoRoutes.js";
/* CONFIG */
dotenv.config();
const server: Application = express();
server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
server.use(morgan("common"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());

/* MONGOOSE SETUP */
const PORT: string | number = process.env.PORT || 8000;
server.get("/", (req: Request, res: Response) => {
    res.send("Yes, you are connected to the server! ✅");
});

/* Use your routes */

server.use('/', cartRoutes);
server.use('/', presaleInfoRoutes);
server.use('/', fairLaunchRoutes);
server.use("/", pinkLockRoutes);
server.use("/", dutchAuction);
server.use("/", Subscription);
server.use("/", privateSale);
server.use("/", Airdrop);
server.use("/", pinkLockWeb3Routes);
server.use("/", presaleInfoRoutesAlpha);
server.use("/", dutchAuctionAlpha);
server.use("/", SubscriptionAlpha);
server.use("/", fairLaunchRoutesAlpha);



(async () => {
    await connectDB()
        .then(() => {
            server.listen(PORT, () => {
                console.log(`Server live on: ` + `http://localhost:${PORT}`);
            });
        })
        .catch((err: Error) => {
            console.log("Error: ", err);
            throw new Error(err.message);
        });
})();
