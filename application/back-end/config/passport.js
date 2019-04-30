const passport = require('passport');
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null , user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id,(err, user)=>{
  	done(err, user);
  });
});

//register standard user
passport.use('register',
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true,
	},(req, email, loginPassword, done) =>{
		User.sync().then(()=>{
			User.findOrCreate({
				where: {
					email: email
				},
				defaults:{
					password: loginPassword,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					isAdmin: false,
				}
			}).then((user, created)=>{
				if(!created){
				 console.log("user email already exists");
				 return done(null,false,{message: 'user email exists'});
				}
				//console.log(`user created ${user.email} ${user.username} ${user.password}`)
				return done(null,user);
			});
		});		
	}
));



// //login user
// passport.use('login',
// 	new LocalStrategy({
// 		usernameField: 'email',
// 		passwordField: 'password',
// 		passReqToCallback : true,
// 	},(req, email, loginPassword, done) =>{
// 			
// 	}
// ));