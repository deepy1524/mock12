const express = require("express");
const PostModel = require("../model/post.model");

const app = express.Router();
app.get("/", async (req, res) => {
    const query = req.query;
    try{
    if(query.sort==="low_date"){
        const data=await PostModel.find().sort({date:1});
        res.send(data);
    }else if(query.sort==="high_date"){
        const data=await PostModel.find().sort({date:-1});
        res.send(data);
    }else if(query.category==="clothing"){
        const data=await PostModel.find({category:"clothing"});
        res.send(data);
    }
    else if(query.category==="electronics"){
        const data=await PostModel.find({category:"electronics"});
        res.send(data);
    }
    else if(query.category==="furniture"){
        const data=await PostModel.find({category:"furniture"});
        res.send(data);
    } else if(query.category==="other"){
        const data=await PostModel.find({category:"other"});
        res.send(data);
    }
    
    else{
        const data=await PostModel.find(query);
        res.send(data);
    }
}
   catch(err){
        console.error(err);
        res.send(err.message);
    }
});

app.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send("created successfully");
  } catch (err) {
    console.log(err);
    res.send("error creating");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await PostModel.findOne({ _id: id });
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send("Delete successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});
module.exports = app;
