import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaAlphaArbitrum = new Schema({
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
const FairLaunchDataSchemaAlphaArbitrum = model("FairLaunchDataAlphaArbitrum", fairLaunchDataSchemaAlphaArbitrum);
export default FairLaunchDataSchemaAlphaArbitrum;
//# sourceMappingURL=fairlaunchInfoModel.js.map