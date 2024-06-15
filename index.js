import express from "express";
import { config } from "dotenv";
import blog from "./blog.js";
config();
const PORT = process.env.PORT | 3000;
const HOSTNAME = "localhost";
const app = express();

app.set("view engine","ejs"); //take ejs as template engine
app.set("views","./views");//take folder ./views as template engine folder
app.use(express.static('public')); //make public folder as static

//render home page in '/' route
app.get('/' , (request,response) => {
    response.render('home.ejs',
        {
            date : new Date(),
            blog 
        }
    );
});
app.get('/addPage' , (request,response) => {
    response.render('add.ejs');
})

app.listen(PORT , () => {
    console.log(`Server running on http://${HOSTNAME}:${PORT}`);    
})
