import { DataTypes } from "sequelize";
import sequelize from "./conexao.js";

const User = sequelize.define('users',{
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
});/* .sync({force:true}); */

export default User;