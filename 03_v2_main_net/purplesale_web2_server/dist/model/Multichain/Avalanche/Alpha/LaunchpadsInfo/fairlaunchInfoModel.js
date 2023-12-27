import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaAlphaAvalanche = new Schema({
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
const FairLaunchDataSchemaAlphaAvalanche = model("FairLaunchDataAlphaAvalanche", fairLaunchDataSchemaAlphaAvalanche);
export default FairLaunchDataSchemaAlphaAvalanche;
//# sourceMappingURL=fairlaunchInfoModel.js.map