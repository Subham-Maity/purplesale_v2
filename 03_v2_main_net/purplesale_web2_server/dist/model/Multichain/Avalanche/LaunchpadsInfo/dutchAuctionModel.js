import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaAvalanche = new Schema({
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
const FairLaunchDataSchemaAvalanche = model("dutchAuctionDataAvalanche", fairLaunchDataSchemaAvalanche);
export default FairLaunchDataSchemaAvalanche;
//# sourceMappingURL=dutchAuctionModel.js.map