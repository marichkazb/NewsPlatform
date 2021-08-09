import config from "config";
import { ConnectionOptions, connect } from "mongoose";
import * as mongoose from "mongoose";

const connectDB = async () => {

  const DB_URL = `mongodb+srv://user:user@cluster0.dxjsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

  try {
    // const mongoURI: string = config.get("mongoURI");
    // const options: ConnectionOptions = {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    // };
    // await connect(mongoURI, options);

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true, })


    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
