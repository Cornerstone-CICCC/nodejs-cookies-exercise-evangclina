import express from 'express'
import pageRouter from './routes/page.routes'
import cookieParser from 'cookie-parser'
import path from "path"
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express()

// Middleware
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../src/views"))
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use("/", pageRouter)

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})