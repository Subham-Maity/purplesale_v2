import { Schema, Model, model } from 'mongoose';
import {IDutchAuctionData} from '../../../../types/Launchpads/presaleData.js';

const fairLaunchDataSchemaPolygon: Schema = new Schema<IDutchAuctionData>({
    id: Number,
    logoUrl: String,
    bgLogoUrl: String,
    websiteUrl: String,
    facebook: String,
    twitter: String,
    github: String,
    instagram: String,
    discord: String,
    reddit: String,
    youtube: String,
    description: String,
});

const FairLaunchDataSchemaPolygon: Model<IDutchAuctionData> = model<IDutchAuctionData>("dutchAuctionDataPolygon", fairLaunchDataSchemaPolygon);

export default FairLaunchDataSchemaPolygon;
