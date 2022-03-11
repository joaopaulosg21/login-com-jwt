import User from "../database/User.js";
import jsonwebtoken from "jsonwebtoken";

export default class UserController{

    async newUser(req,res){
        try{
            const {username,password,name} = req.body;
            const result = await User.create({
                username,
                password,
                name
            });
            res.status(201).json(result);
        }catch(error){
            res.status(400).json({msg:"Username ja utilizado"});
        }
    }

    async viewUsers(req,res){
        try{
            const result = await User.findAll()
            res.status(200).json(result);
        }catch(error){
            res.status(404).json(error);
        }
    }

    async login(req,res){
        try{
            const {username,password} = req.body;
            const user = await User.findOne({where:{username:username,password:password}});
            if(user){
                const secret = "teste";
                const token = jsonwebtoken.sign({id:user.id},secret,{expiresIn:'1h'});
                res.status(200).json({msg:`Usuario logado ${token}`})
            }else{
                res.status(404).json({msg:"Usuario não existe"})
            }
        }catch(error){
            res.status(404).json(error)
        }
    }

    async updateUser(req,res){
        const token= req.headers['authorization'].split(' ')[1];
        const secret = "teste";
        const decoded = jsonwebtoken.verify(token,secret);
        const {name,password} = req.body;
        const user = await User.findOne({where:{id:decoded.id}});
        if(user){
            await User.update({name:name,password:password},{where:{id:user.id}});
            res.status(200).json({msg:`O usuario foi atualizado`})
        }else{
            res.status(404).json({msg:`O usuario não existe`});
        }
    }
}