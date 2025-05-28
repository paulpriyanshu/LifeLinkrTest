import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import { getSession } from "./utils/getSession.js"
const app=express()
const port=8000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "https://d1tep2bf3wpllv.cloudfront.net",
  credentials: true,              
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes)
app.use("/session",getSession)
app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:"hello"
    })
})

app.listen(port,()=>{
    console.log(`Started server at ${port}`)
})