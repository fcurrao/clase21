import { Router } from "express";
import userModel from "../DAOs/models/users.model.js";   
import { createHash, isValidPassword } from "../utils.js";
import passport from 'passport'

const router = Router()

router.post('/register', async (req,res)=>{
    const {first_name, last_name, email,age,password} = req.body
    const exist = await userModel.findOne({email})
    if(exist) return res.status(400).send({status: 'error', message:'usuario ya registrado'})
    let result = await userModel.create( {first_name, last_name, email,age,password})
    res.send({status: 'succes', message:'usuario registrado'})

}) 
 
router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


router.post('/restartPassword', async (req,res) => {
    const { email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send({status: 'error', message:'usuario no encontrado'}) 
    const newPasswordHashed = createHash(password)
    await userModel.updateOne({_id: user._id},{$set:{password: newPasswordHashed}})
    res.send({status: 'success'})  

})


  router.post('/login', async (req,res) =>{
const { email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send({status: 'error', message:'usuario no encontrado'}) 
    const newPasswordHashed = createHash(password)
    await userModel.updateOne({_id: user._id},{$set:{password: newPasswordHashed}})
    req.session.user = {
                name: user.first_name + user.last_name,
                email: user.email,
                age: user.age,
            }
    res.send({status: 'success'})  
})
router.get( "/github",
    passport.authenticate("github", { scope: "user:email" }),
    (req, res) => {}
  );
  
  router.get('/githubcallback',passport.authenticate('github', {failureRedirect: '/'}),async (req, res)=>{
    console.log('exito')
    req.session.user = req.user
    res.redirect('/')
  } )


 


export default router