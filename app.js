
// Modules Loading 

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const adminRoute = require("./routes/adminRoute")
const path = require('path')
const session = require("express-session")
const flash = require('connect-flash')



// End Modules Loading 


// Configs

            // Body Parser 
                app.use(bodyParser.urlencoded({extended: true}))
                app.use(bodyParser.json())
            // End Body Parser


            //HandleBars
            app.engine('handlebars' , handlebars({defaultLayout : 'main'}))
            app.set('view engine' , 'handlebars')
            // End HandleBars 

            //Session Config 
                app.use(session({
                    secret : 'xbazbq7es4v1',
                    resave : true,
                    saveUninitialized:true

                }))

                app.use(flash())

                    // Midleware Config


                    app.use((req,res,next) => {
                        
                        res.locals.success_msg = req.flash("success_msg")
                        res.locals.error_msg = req.flash("error_msg" )
                        next()
                    })
                
                
                    // End Midleware Config


            // End Session Config 






            //Mongoose 

            mongoose.Promise = global.Promise;
            mongoose.connect("mongodb://localhost/mrsgringa").then(()=>{console.log("[Connected in mrsgringa MongoDB]")}).catch((err) => {console.log("Houve Algum Problema Na Conexao !" + err)})

            // End Config Mongoose



            //





    // Public Path Configuration

        app.use(express.static(path.join(__dirname, "public")))


    // End Public Path Configuration


// End Configs 



// Routes 

    //  Get Routes 
      app.use("/admin" , adminRoute)


    // End Get Routes


// End Routes



// Listen 

    const PORT = 8081
    app.listen(PORT , (req,res) => {
        console.log("[Starting Host ... ]")
        console.log("[Host Loaded]")
    })

// End Listen