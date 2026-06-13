import express from 'express'
import {addBlog, addComment, deleteBlogById, generateContext, getAllBlogs, getBlogById, getBlogComments, togglePublish} from '../controllers/blogController.js'
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add",upload.single('image'),auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/generate',auth,generateContext)
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete', auth ,deleteBlogById);
blogRouter.post('/toggle-publish',auth, togglePublish);
blogRouter.post('/add-comment',addComment);
blogRouter.post('/comments',getBlogComments);




export default blogRouter;