import { Router, Request, Response } from "express"
import { checkAuth } from "../middleware/auth"

const pageRouter = Router()

//in memory data base
let users: User[] = [
    { username: "admin", password: "admin12345" }
]

//routes

//home
pageRouter.get('/', (req: Request, res: Response) => {
    res.status(200).render("index")
})

//login
pageRouter.get('/login', (req: Request, res: Response) => {
    res.status(200).render('login')
})

pageRouter.post("/login", (req: Request <{}, {}, User>, res: Response) => {
    const { username, password } = req.body
    const found = users.find((user) => user.username === username && user.password === password)
    if(found){
        res.cookie("authToken", "authenticated", {
            maxAge: 3 * 60 * 1000, //3 minutes
            httpOnly: true,
            signed: true  
        })
        res.cookie("user_info", JSON.stringify({
            username: found.username
        }), {
            maxAge: 3 * 60 * 1000, 
            httpOnly: true
        })
        res.redirect("/my-profile")
    }else{
        res.redirect("/login")
    }
})

//my profile 
pageRouter.get('/my-profile', checkAuth, (req: Request, res: Response) => {
    const { username } = JSON.parse(req.cookies.user_info)
    res.status(200).render("my_profile", { username })
})

//logout 
pageRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie("user_info")
    res.clearCookie('authToken')
    res.status(200).redirect("/")
})

//fallback
pageRouter.use((req: Request, res: Response) => {
    res.status(404).render("404")
})

export default pageRouter