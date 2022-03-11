import jsonwebtoken from "jsonwebtoken";

export default function checkToken(req,res,next){
    if(req.headers['authorization']){
        const secret = "teste";
        const token= req.headers['authorization'].split(' ')[1];
        try{
            const decoded = jsonwebtoken.verify(token,secret);
            next()
        }catch(error){
            res.status(400).json({msg:"Token invalido"});
        }
    }else{
        res.status(400).json({msg:"Você não está logado"});
    }

}