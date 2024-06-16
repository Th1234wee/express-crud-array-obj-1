import express, { response } from "express";
import { config } from "dotenv";
import blog from "./blog.js";
config();
const PORT = process.env.PORT | 3000;
const HOSTNAME = "localhost";
const app = express();

app.use(express.urlencoded({extended : true})); //parse the body from form-data
//app.use(express.json());
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
});
app.get('/editPage/:id' , (request,response) => {
    const id = request.params.id;
    const foundBlog = blog.find(blog => blog.id == id);

    response.render('edit.ejs' ,
        {
            editedBlog : foundBlog
        }
    )
})
app.post('/blog/createBlog' , (request,response) => {
    const {title , desc , status} = request.body;
    const newBlog = {
        id : blog.length + 1,
        title : title,
        description : desc,
        status : status
    }
    blog.push(newBlog);
    response.redirect('/');
});
app.post('/blog/removeBlog/:id',(request,response) => {
    const id = request.params.id;
    const foundBlogID = blog.findIndex(blog => blog.id == id);

    if(foundBlogID != -1){
        blog.splice(foundBlogID,1);
    }
    response.redirect('/');
});
app.post('/blog/updateBlog/:id' , (request,response) => {
    const id  =  request.params.id;
    const foundBlogID = blog.findIndex(blog => blog.id == id);
    const { title , desc , status } = request.body;
    const updatedBlog = {
        id,
        title,
        description : desc,
        status
    }
    if(foundBlogID != -1){
        blog[foundBlogID] = updatedBlog;
    }
    response.redirect('/');
})
app.listen(PORT , () => {
    console.log(`Server running on http://${HOSTNAME}:${PORT}`);    
})
