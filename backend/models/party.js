import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
    partyId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true },
    symbol: { type: String,required:true }, 
    manifesto: { type: String, required: true },
    voteCount: { type: Number, default: 0 },
});

const Party = mongoose.model("Party", partySchema);
export default Party;
