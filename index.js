import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import env from 'dotenv';

env.config();


const app = express();
const port = process.env.PORT;
const saltRound = Number(process.env.SALTROUND);

app.use(session({
    secret: process.env.SESSION_SECREAT,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.PG_USER,
    host:  process.env.PG_HOST,
    database:  process.env.PG_DATABASE,
    password:  process.env.PG_PASSWORD,
    port:  process.env.PG_PORT
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("signup.ejs")
});

app.post("/signup", async (req, res)=>{
    
    try{
        const result = await db.query(`SELECT * FROM ${process.env.PG_TABLE} WHERE username = $1`,[req.body.username]);
        if(result.rowCount === 0){
            bcrypt.hash(req.body.password, saltRound, async (err,hash)=>{
                if(err)(console.log("hash err", err));

                await db.query(`INSERT INTO ${process.env.PG_TABLE}(name,username,password,phone) VALUES($1,$2,$3,$4)`,[req.body.name,req.body.username,hash,Number(req.body.phone)]);
                res.render("signup.ejs",{err: "Account Created Successfully"});
            })
        }else{
                res.render("signup.ejs",{err: "username exist try other"})
            }
        

    }catch(err){
        console.log(err)
    }
});

app.get("/home", (req, res)=>{
    if(req.isAuthenticated()){
        res.render("home.ejs",{name: req.user[0].name})
    }else{
        res.redirect("/")
    }
});

app.post("/logout", (req,res)=>{
    req.logout(function(err){
        if(err){console.log(err)}
        res.redirect("/")
    })
})

app.post("/signin",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/"
}));

passport.use(new Strategy(async function verify(username, password, cb){
    const result = await db.query(`SELECT * FROM ${process.env.PG_TABLE} WHERE username = $1`,[username]);
    const user = result.rows;
    if(user.length === 1){
        bcrypt.compare(password, result.rows[0].password, async(err, output)=>{
            if(err){return cb(err)}

            if(output){
                return cb(null,user)
            }else{
                return cb(null, false)
            }
        })

    }else{
        return cb(null, false)
    }
}));

passport.serializeUser((user,cb)=>{
    return cb(null, user);
});

passport.deserializeUser((user, cb)=>{
    return cb(null, user)
});


app.listen(port, ()=>{
    console.log(`Server http://localhost:${port}`)
})