import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import locationRoutes from "./routes/location.routes.js";
import userRoutes from "./routes/user.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";


const app =  express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://main.d2hq3ta0u12dgn.amplifyapp.com",
    "http://localhost:3000",
    "https://main.d3vhubercu3jih.amplifyapp.com/",
    "https://main.d33b18ju9ag449.amplifyapp.com/"
  ],
  credentials: true,
}));
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/locations",locationRoutes);
app.use("/user",userRoutes);
app.use("/hospital",hospitalRoutes);





app.listen(PORT, ()=>{
    console.log(`Backend running on ${PORT}`)
});