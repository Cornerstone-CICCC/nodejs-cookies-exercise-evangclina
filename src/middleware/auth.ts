import { Request, Response, NextFunction } from 'express'

// Check authentication for my account
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authToken } = req.signedCookies
  if (authToken === 'authenticated') {
    next()
  } else {
    res.redirect('/login')
  }
}

export const checkLoginAuth = (req: Request, res: Response, next: NextFunction) =>{
    const { authToken } = req.signedCookies
    if(authToken === "authenticated"){
        res.redirect("/my-account")
    }else{
        next()
    }
}