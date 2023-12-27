import { Schema, Model, model } from 'mongoose';
import {IDutchAuctionData} from '../../../../types/Launchpads/presaleData.js';

const fairLaunchDataSchemaEthereum: Schema = new Schema<IDutchAuctionData>({
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

const FairLaunchDataSchemaEthereum: Model<IDutchAuctionData> = model<IDutchAuctionData>("dutchAuctionDataEthereum", fairLaunchDataSchemaEthereum);

export default FairLaunchDataSchemaEthereum;
