import express from "express";
import dotenv from "dotenv";

const app =  express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/location",);
app.use("/appointment",);




app.listen(PORT, ()=>{
    console.log(`Backend running on ${PORT}`)
});