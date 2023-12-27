import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaEthereum = new Schema({
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
const FairLaunchDataSchemaEthereum = model("dutchAuctionDataEthereum", fairLaunchDataSchemaEthereum);
export default FairLaunchDataSchemaEthereum;
//# sourceMappingURL=dutchAuctionModel.js.map