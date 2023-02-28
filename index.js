const express=require("express");
const connection=require("./config/db");
const PostRouter=require("./routes/post.route");

require("dotenv").config();
const cors=require("cors");
const app=express();
app.use(cors({
    origin:"*",
}))

app.use(express.json());

app.use("/post",PostRouter);


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connection established");
    }catch(e){
        res.send("something went wrong");
        console.log(err);
    }
    console.log(`listening on port ${process.env.PORT}`);
})