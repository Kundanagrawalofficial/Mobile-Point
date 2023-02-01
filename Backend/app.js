const express= require("express");
const app= express();
const cookieParser= require("cookie-parser");
const errorMiddleware =require("./middleware/error")
app.use(express.json())
const product =require("./routes/productRoute");
const user =require("./routes/userRoute");
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use(express.json())
app.use(cookieParser())
app.get("/set-cookie", (req, res) => {
    res.cookie("jwt", "your-token-value");
    res.send("Cookie set");
  });
  
app.get("/get-cookie", (req, res) => {
 const token = req.cookies.jwt;
    if (!token) {
      return res.send("Cookie not found");
    }
  
    res.send(`Cookie value: ${token}`);
  });
  
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
//middle ware
app.use(errorMiddleware)
module.exports=app