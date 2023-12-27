import { Schema, model } from 'mongoose';
const presaleDataSchemaAvalanche = new Schema({
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
const PresaleDataAvalanche = model("PresaleDataAvalanche", presaleDataSchemaAvalanche);
export default PresaleDataAvalanche;
//# sourceMappingURL=presaleInfoModel.js.map