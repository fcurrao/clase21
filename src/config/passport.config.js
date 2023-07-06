 
import local from "passport-local";
// import userService from "../model/User.js";
import { createHash, isValidPassword } from "../utils.js";
import GithubStrategy from 'passport-github2'
import userModel from "../DAOs/models/users.model.js"; 
import passport from "passport";  
import { environment } from "../.env/environment.js";
  


 
const LocalStrategy = local.Strategy;
export const initializePassport = () => {
  passport.use(
    'github', new GithubStrategy({
      // '0ca4492e4a909f2f7882bbbe7e0efa9e0dc3d230'
      // 'd63a0b1eba59377a782f8d1e4cc35a74e62cb1a8'
      
      clientID:'Iv1.7b358415b5d0e860', clientSecret:'178874e9f61399ecdb0e8606c9b60ed836f3b297', callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accesToken, refreshToken,profile,done) =>{
      let user = await userModel.findOne({email: profile._json.email } )
      if (!user){
        let newUser  = {
                  first_name: profile._json.name,
                  last_name: 'test' ,
                  email: profile._json.email,
                  age: 18,
                  password:'1234',
                };
          const result = await userModel.create(newUser)
          done ( null, result)

      } else { 
        // done(null,false)
        const result = user
        done(null,result)
      }

    })

  )}

  passport.serializeUser((user,done)=>{
    done(null,user._id)
  })

  passport.deserializeUser(async(id,done)=>{
    let user = await userModel(findById(id))
    done(null,user)
  })
  
 