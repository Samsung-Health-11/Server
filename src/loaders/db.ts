import mongoose from "mongoose";
import config from "../config";
import Health from "../models/Health";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set("autoCreate", true);

    console.log("Mongoose Connected ...");

    Health.createCollection().then(function (collection) {
      console.log("Health Collection is created!");
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
