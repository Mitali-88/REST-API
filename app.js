const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({
extended:true
}));
mongoose.connect("mongodb://localhost:27017/helloDb");
const helloSchema={
    content:String
};
const Hello=mongoose.model("Hello",helloSchema);

app.route("/hello")
.get(function(req,res){
 Hello.find(function(err,foundHello){
    if(!err){
        res.send(foundHello);
    }else{
        res.send(err);
    }
 }); 
})
.post(function(req,res){
    const newHello=new Hello({
        content:req.body.content
    });
    newHello.save(function(err){
        if(!err){
            res.send("successfully added a new hello");
        }else{
            res.send(err);
        }
    });
})
.patch(function(req,res){
Hello.updateMany(
    {$set:req.body},
    
   
    function(err){
        if(!err){
            res.send("Successfully updated the Hello Content");
        }
    }
);
})
.delete(function(req,res){
    Hello.deleteOne(function(err){
        if(!err){
            res.send("Successfully deleted hello");
        }else{
            res.send(err);
        }
    });
})








app.listen(3000,function(){
    console.log("server is started at port 3000");
});