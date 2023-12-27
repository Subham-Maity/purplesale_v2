import { Schema, model } from 'mongoose';
const fairLaunchDataSchema = new Schema({
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
const FairLaunchDataSchema = model("FairLaunchData", fairLaunchDataSchema);
export default FairLaunchDataSchema;
//# sourceMappingURL=fairlaunchInfoModel.js.map