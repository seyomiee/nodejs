import mongoose from "mongoose";
import passportlocalMongoose from "passport-local-mongoose";

const UserSchema= new mongoose.Schema({
    name:String,
    email: String,
    avataUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Video"
    }]
});

UserSchema.plugin(passportlocalMongoose, {usernameField: "email"});

const model= mongoose.model("User",UserSchema);
export default model;