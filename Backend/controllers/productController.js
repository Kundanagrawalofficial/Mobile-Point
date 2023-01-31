const { addListener } = require("../app");
const Product =require("../models/productModel");
const ErrorHandler = require("../utils/errorhandle");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
 

// }}}}}}}}}}}}}}}ADMIN{{{{{{{{{{{{{{}}}}}}}}}}}}}}
exports.createProduct= catchAsyncErrors(
  async(req,res,next)=>{
    const product = await Product.create(req.body);
      res.status(201).json({
        success:true,
        product,
      })
  }
)
//// GET ALL PRODDUVTS
exports.getAllProducts= catchAsyncErrors(
  async(req,res)=>{ 
    const products =await Product.find();
  
    res.status(200).json({
      success:true,
      products}
    )
  }
)
//GET PRODUCT DETAILS
exports.getProductDetails=catchAsyncErrors(
  async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
      return next(new ErrorHandler("Product NOT FOUND",404));
    }
    res.status(200).json(
      {success:true,
      product
  
      }
    )
  }
)
/////update by admin
exports.updateProduct= catchAsyncErrors(async(req,res,next)=>{
  let product =await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("Product NOT FOUND",404));
  }
  
  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    });
    res.status(200).json({
      success:true,
      product

    })
});
////// delete Product
exports.deleteProduct=catchAsyncErrors(
  async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
      return next(new ErrorHandler("Product NOT FOUND",404));
    }
    await product.remove();
    res.status(200).json(
      {success:true,
        message:"Product Delete Succesfully"
  
      }
    )
  }
)