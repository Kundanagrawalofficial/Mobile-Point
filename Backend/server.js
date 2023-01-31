const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/databse")
//handling uncaught Exception
process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

//
dotenv.config({path:"Backend/config/config.env"})
connectDatabase()
const server = app.listen(process.env.PORT,()=>{
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
// console.log(kundan)
//unhandle promise handle
process.on("unhandledRejection",err=>{
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to umhandled Promise Rejection`);
   server.close(()=>{
    process.exit(1);
   });
});


