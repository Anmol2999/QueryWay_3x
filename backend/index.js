import express from 'express'
import dotenv from 'dotenv'
import DBCon from './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import cookieParser from 'cookie-parser'
import BlogsRoutes from './routes/Blog.js'
import DashboardRoutes from './routes/Dashboard.js'
import CommentRoutes from './routes/Comments.js'
import PublicRoutes from './routes/Public.js'
import cors from 'cors'


dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()
const corsOptions={
    origin:true,
    credentials:true
}


//mongoDb connection
DBCon()
app.use('/images', express.static('public/images'))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send(`Hello`)
})
app.use('/auth',AuthRoutes)
app.use('/blog',BlogsRoutes)
app.use('/dashboard',DashboardRoutes)
app.use('/comment',CommentRoutes)
app.use('/public',PublicRoutes)

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})
