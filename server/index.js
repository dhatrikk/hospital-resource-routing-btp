import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import locationRoutes from "./routes/location.routes.js";
import userRoutes from "./routes/appointment.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";


const app =  express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/locations",locationRoutes);
app.use("/appointment",userRoutes);
app.use("/appointment",hospitalRoutes);





app.listen(PORT, ()=>{
    console.log(`Backend running on ${PORT}`)
});