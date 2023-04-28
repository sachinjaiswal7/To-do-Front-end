import jwt from "jsonwebtoken";
import axios from "axios";
import { createCookie } from "../utils/createCookie.js"

const url = 'https://nodejs-todoapp-z0qr.onrender.com'








// function to register to the website
export const registerHandler =  async(req ,res) => {
    try{
        
    const {name , email , password} = req.body;
    const {data} = await axios.post( url + "/api/v1/users/new",{name,email,password},{
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const {success,_id} = data
    if(success){
        createCookie(_id, req, res);
        res.redirect(`/logout?data=${name}`);
    }
   
}
catch(err){
    res.render("register.ejs" , {msg : err.response.data.message});
   
}
}

// render login page 
export const renderLogin = (req,res) => {
    res.render("login.ejs");
}

// function to login through making api call to backend 
export const loginHandler = async (req,res) => {
try{
    const {email , password} = req.body;
    const {data} = await axios.post(url + "/api/v1/users/login",{email,password},{
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const {success, _id,name} = data
    if(success){
     createCookie(_id,req,res)
     res.redirect(`/logout?data=${name}`);
    }
    else{
        res.render("login,ejs",{msg : "Invalid something"});
    }
        
    }
    catch(err){
        res.render("login.ejs",{msg : err.response.data.message});
        // res.render("login.ejs",{msg : err.message})
    }
}

// function to render the logout page if user is already logged in 
export const renderLogout = async (req,res) => {
    try{
        const {data} = req.query;
        const {token} = req.cookies;
        if(!token){
            res.redirect("/");
        }
        else{
            const {_id} = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
            const information = await (await axios.get(url + `/api/v1/task/all?data=${_id}`)).data
            const {err} = req.query;
            res.render("logout.ejs", {data : data.toUpperCase(),tasks : information.tasks,msg : ((err)?err:undefined)});
        }
    }
    catch(err){
        res.cookie("token", null, {
            expires : new Date(Date.now()),
        })
        res.redirect("/");
    }
}

// function to logout from the page and remove the cookie 
export const logoutHandler = (req,res) => {
    res.cookie("token",null, {
        expires : new Date(Date.now()),
    })
    res.redirect("/");
}

// function to add a task through making api call to backend to add the task 
export const addTaskHandler = async (req,res) => {
    const {token} = req.cookies;
    if(!token){
        res.redirect("/login")
        res.render("login.ejs",{msg : "login first"});
        return;
    }
    const {_id} = jwt.verify(token , process.env.JWT_PRIVATE_KEY);
    try{
    const {title , description} = req.body
         await axios.post(url + "/api/v1/task/new",{title,description,_id},{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const {data} = await axios.get(url + `/api/v1/users/me?id=${_id}`);
        res.redirect(`/logout?data=${data.data.name}`);
        
}
catch(err){
    const {data} = await axios.get(url + `/api/v1/users/me?id=${_id}`);
    res.redirect(`/logout?data=${data.data.name}&err=${err.response.data.message}`);
}
    
}


// function to remove a task through making api call to backend 
export const removeTaskHandler = async (req,res) => {
    const {index} = req.query;
    let {_id} = jwt.verify(req.cookies.token,process.env.JWT_PRIVATE_KEY);
    const {data} = await axios.get(url + `/api/v1/users/me?id=${_id}`);
    const information = await (await axios.get(url + `/api/v1/task/all?data=${_id}`)).data
    const {tasks} = information;
    console.log(_id);
    _id = tasks[index]._id
    await axios.delete(url + `/api/v1/task/${_id}`);
    res.redirect(`/logout?data=${data.data.name}`);

}








