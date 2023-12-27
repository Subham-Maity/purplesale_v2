import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaArbitrum = new Schema({
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
const FairLaunchDataSchemaArbitrum = model("dutchAuctionDataArbitrum", fairLaunchDataSchemaArbitrum);
export default FairLaunchDataSchemaArbitrum;
//# sourceMappingURL=dutchAuctionModel.js.map