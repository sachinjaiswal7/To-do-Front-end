import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import authRouter from "./routes/regAndLoginAndLogout.js"
import taskRouter from "./routes/taskRouting.js"





const app = express();
// middlewares
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(),"public")))
dotenv.config({
    path : "./private/config.env"
})

// routers
app.use("/",authRouter)
app.use("/",taskRouter)


app.get("/" , (req, res) => {
    res.render("register.ejs")
})



app.listen(8384 , () => {
    console.log("Listening on the port 8384");
})