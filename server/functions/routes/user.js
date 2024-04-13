const router=require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/",async(req,res)=>{
    return res.send("Inside the user router")
})

router.get("/jwtVerification",async(req,res) =>{
    if (!req.headers.authorization){
        return res.status(500).send({msg:"No token provided"});
    }
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)
    try{
        const decodedValue=await admin.auth().verifyIdToken(token);
        if(!decodedValue){
            return res.status(500).json({success:false,msg:"Unauthorized access"});
        }
        return res.status(200).json({success:true,data:decodedValue});
    }
    catch(err){
        return res.send({success:false,msg:`Error in extracting the token:${err}`});
    }
}
);

const listAllUsers = async (nextpagetoken) => {
    admin
      .auth()
      .listUsers(1000, nextpagetoken)
      .then((listuserresult) => {
        listuserresult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listuserresult.pageToken) {
          listAllUsers(listuserresult.pageToken);
        }
      })
      .catch((er) => console.log(er));
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
  router.get("/all", async (req, res) => {
    listAllUsers();
    try {
      return res
        .status(200)
        .send({ success: true, data: data, dataCount: data.length });
    } catch (er) {
      return res.send({
        success: false,
        msg: `Error in listing users :,${er}`,
      });
    }
  });
  





module.exports=router;