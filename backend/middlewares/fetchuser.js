const jwt = require("jsonwebtoken");
const JWT_SECRET = "samrudhi$@mon";

const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Use correct Authentication token"});
    }
    else{
        try {
            //we have used {user:{id:user.id}} generating the authtoken , so it will return the same using jwt.verify
            const data = jwt.verify(token,JWT_SECRET);
            req.user = data.user;   

            next();
        } catch (error) {
            res.status(401).send({error:"Use correct Authentication token"});
        }
       

    }


}


module.exports = fetchuser;