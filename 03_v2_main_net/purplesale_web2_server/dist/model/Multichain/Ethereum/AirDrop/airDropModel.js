import { Schema, model } from 'mongoose';
const IAirDropDataSchemaEthereum = new Schema({
    id: Number,
    airdropTitle: String,
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
const IAirDropDataEthereum = model("AirDropDataEthereum", IAirDropDataSchemaEthereum);
export default IAirDropDataEthereum;
//# sourceMappingURL=airDropModel.js.map