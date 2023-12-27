import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/dbConnection.js";

/* Import your routes */

//Avalanche
import cartRoutesAvalanche from './routes/Multichain/Avalanche/Cards/cardRoutes.js';
import presaleInfoRoutesAvalanche from './routes/Multichain/Avalanche/Launchpad/presaleInfoRoutes.js';
import pinkLockRoutesAvalanche from './routes/Multichain/Avalanche/PinkLock/pinkLockRoutes.js';
import fairLaunchRoutesAvalanche from "./routes/Multichain/Avalanche/Launchpad/fairlaunchInfoRoutes.js";
import pinkLockWeb3RoutesAvalanche from "./routes/Multichain/Avalanche/PinkLock/pinkLockWeb3Routes.js";
import dutchAuctionAvalanche from "./routes/Multichain/Avalanche/Launchpad/dutchAuctionInfoRoutes.js";
import privateSaleAvalanche from "./routes/Multichain/Avalanche/PrivateSale/privateSaleRoutes.js";
import SubscriptionAvalanche from "./routes/Multichain/Avalanche/Launchpad/subscriptionInfoRoutes.js";
import AirdropAvalanche from "./routes/Multichain/Avalanche/Airdrop/airdropRoutes.js";
import presaleInfoRoutesAlphaAvalanche from './routes/Multichain/Avalanche/Alpha/Launchpad/presaleInfoRoutes.js';
import dutchAuctionAlphaAvalanche from "./routes/Multichain/Avalanche/Alpha/Launchpad/dutchAuctionInfoRoutes.js";
import SubscriptionAlphaAvalanche from "./routes/Multichain/Avalanche/Alpha/Launchpad/subscriptionInfoRoutes.js";
import fairLaunchRoutesAlphaAvalanche from "./routes/Multichain/Avalanche/Alpha/Launchpad/fairlaunchInfoRoutes.js";


//Arbitrum
import cartRoutesArbitrum from './routes/Multichain/Arbitrum/Cards/cardRoutes.js';
import presaleInfoRoutesArbitrum from './routes/Multichain/Arbitrum/Launchpad/presaleInfoRoutes.js';
import pinkLockRoutesArbitrum from './routes/Multichain/Arbitrum/PinkLock/pinkLockRoutes.js';
import fairLaunchRoutesArbitrum from "./routes/Multichain/Arbitrum/Launchpad/fairlaunchInfoRoutes.js";
import pinkLockWeb3RoutesArbitrum from "./routes/Multichain/Arbitrum/PinkLock/pinkLockWeb3Routes.js";
import dutchAuctionArbitrum from "./routes/Multichain/Arbitrum/Launchpad/dutchAuctionInfoRoutes.js";
import privateSaleArbitrum from "./routes/Multichain/Arbitrum/PrivateSale/privateSaleRoutes.js";
import SubscriptionArbitrum from "./routes/Multichain/Arbitrum/Launchpad/subscriptionInfoRoutes.js";
import AirdropArbitrum from "./routes/Multichain/Arbitrum/Airdrop/airdropRoutes.js";
import presaleInfoRoutesAlphaArbitrum from './routes/Multichain/Arbitrum/Alpha/Launchpad/presaleInfoRoutes.js';
import dutchAuctionAlphaArbitrum from "./routes/Multichain/Arbitrum/Alpha/Launchpad/dutchAuctionInfoRoutes.js";
import SubscriptionAlphaArbitrum from "./routes/Multichain/Arbitrum/Alpha/Launchpad/subscriptionInfoRoutes.js";
import fairLaunchRoutesAlphaArbitrum from "./routes/Multichain/Arbitrum/Alpha/Launchpad/fairlaunchInfoRoutes.js";


//Ethereum
import cartRoutesEthereum from './routes/Multichain/Ethereum/Cards/cardRoutes.js';
import presaleInfoRoutesEthereum from './routes/Multichain/Ethereum/Launchpad/presaleInfoRoutes.js';
import pinkLockRoutesEthereum from './routes/Multichain/Ethereum/PinkLock/pinkLockRoutes.js';
import fairLaunchRoutesEthereum from "./routes/Multichain/Ethereum/Launchpad/fairlaunchInfoRoutes.js";
import pinkLockWeb3RoutesEthereum from "./routes/Multichain/Ethereum/PinkLock/pinkLockWeb3Routes.js";
import dutchAuctionEthereum from "./routes/Multichain/Ethereum/Launchpad/dutchAuctionInfoRoutes.js";
import privateSaleEthereum from "./routes/Multichain/Ethereum/PrivateSale/privateSaleRoutes.js";
import SubscriptionEthereum from "./routes/Multichain/Ethereum/Launchpad/subscriptionInfoRoutes.js";
import AirdropEthereum from "./routes/Multichain/Ethereum/Airdrop/airdropRoutes.js";
import presaleInfoRoutesAlphaEthereum from './routes/Multichain/Ethereum/Alpha/Launchpad/presaleInfoRoutes.js';
import dutchAuctionAlphaEthereum from "./routes/Multichain/Ethereum/Alpha/Launchpad/dutchAuctionInfoRoutes.js";
import SubscriptionAlphaEthereum from "./routes/Multichain/Ethereum/Alpha/Launchpad/subscriptionInfoRoutes.js";
import fairLaunchRoutesAlphaEthereum from "./routes/Multichain/Ethereum/Alpha/Launchpad/fairlaunchInfoRoutes.js";

//Polygon
import cartRoutesPolygon from './routes/Multichain/Polygon/Cards/cardRoutes.js';
import presaleInfoRoutesPolygon from './routes/Multichain/Polygon/Launchpad/presaleInfoRoutes.js';
import pinkLockRoutesPolygon from './routes/Multichain/Polygon/PinkLock/pinkLockRoutes.js';
import fairLaunchRoutesPolygon from "./routes/Multichain/Polygon/Launchpad/fairlaunchInfoRoutes.js";
import pinkLockWeb3RoutesPolygon from "./routes/Multichain/Polygon/PinkLock/pinkLockWeb3Routes.js";
import dutchAuctionPolygon from "./routes/Multichain/Polygon/Launchpad/dutchAuctionInfoRoutes.js";
import privateSalePolygon from "./routes/Multichain/Polygon/PrivateSale/privateSaleRoutes.js";
import SubscriptionPolygon from "./routes/Multichain/Polygon/Launchpad/subscriptionInfoRoutes.js";
import AirdropPolygon from "./routes/Multichain/Polygon/Airdrop/airdropRoutes.js";
import presaleInfoRoutesAlphaPolygon from './routes/Multichain/Polygon/Alpha/Launchpad/presaleInfoRoutes.js';
import dutchAuctionAlphaPolygon from "./routes/Multichain/Polygon/Alpha/Launchpad/dutchAuctionInfoRoutes.js";
import SubscriptionAlphaPolygon from "./routes/Multichain/Polygon/Alpha/Launchpad/subscriptionInfoRoutes.js";
import fairLaunchRoutesAlphaPolygon from "./routes/Multichain/Polygon/Alpha/Launchpad/fairlaunchInfoRoutes.js";


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
//Avalanche
server.use('/', cartRoutesAvalanche );
server.use('/', presaleInfoRoutesAvalanche );
server.use('/', fairLaunchRoutesAvalanche );
server.use("/", pinkLockRoutesAvalanche );
server.use("/", dutchAuctionAvalanche );
server.use("/", SubscriptionAvalanche );
server.use("/", privateSaleAvalanche );
server.use("/", AirdropAvalanche );
server.use("/", pinkLockWeb3RoutesAvalanche );
server.use("/", presaleInfoRoutesAlphaAvalanche );
server.use("/", dutchAuctionAlphaAvalanche );
server.use("/", SubscriptionAlphaAvalanche );
server.use("/", fairLaunchRoutesAlphaAvalanche );


//Arbitrum
server.use('/', cartRoutesArbitrum );
server.use('/', presaleInfoRoutesArbitrum );
server.use('/', fairLaunchRoutesArbitrum );
server.use("/", pinkLockRoutesArbitrum );
server.use("/", dutchAuctionArbitrum );
server.use("/", SubscriptionArbitrum );
server.use("/", privateSaleArbitrum );
server.use("/", AirdropArbitrum );
server.use("/", pinkLockWeb3RoutesArbitrum );
server.use("/", presaleInfoRoutesAlphaArbitrum );
server.use("/", dutchAuctionAlphaArbitrum );
server.use("/", SubscriptionAlphaArbitrum );
server.use("/", fairLaunchRoutesAlphaArbitrum );


//Ethereum
server.use('/', cartRoutesEthereum );
server.use('/', presaleInfoRoutesEthereum );
server.use('/', fairLaunchRoutesEthereum );
server.use("/", pinkLockRoutesEthereum );
server.use("/", dutchAuctionEthereum );
server.use("/", SubscriptionEthereum );
server.use("/", privateSaleEthereum );
server.use("/", AirdropEthereum );
server.use("/", pinkLockWeb3RoutesEthereum );
server.use("/", presaleInfoRoutesAlphaEthereum );
server.use("/", dutchAuctionAlphaEthereum );
server.use("/", SubscriptionAlphaEthereum );
server.use("/", fairLaunchRoutesAlphaEthereum );

//Polygon
server.use('/', cartRoutesPolygon);
server.use('/', presaleInfoRoutesPolygon);
server.use('/', fairLaunchRoutesPolygon);
server.use("/", pinkLockRoutesPolygon);
server.use("/", dutchAuctionPolygon);
server.use("/", SubscriptionPolygon);
server.use("/", privateSalePolygon);
server.use("/", AirdropPolygon);
server.use("/", pinkLockWeb3RoutesPolygon);
server.use("/", presaleInfoRoutesAlphaPolygon);
server.use("/", dutchAuctionAlphaPolygon);
server.use("/", SubscriptionAlphaPolygon);
server.use("/", fairLaunchRoutesAlphaPolygon);



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
