import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

export const adminLogin = async (req , res) =>{
    try {
        const {email,password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false , message : "Invalid Credentials"})
        }

        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({success : true,token})

    } catch (error) {
        res.json({success :false,message:error.message})
    }
}

export const getDashboard = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        const comments = await Comment.find({})

        const dashboardData = {
            blogs: blogs.length,
            comments: comments.length,
            drafts: blogs.filter(b => !b.isPublished).length,
            recentBlogs: await Blog.find({})
                .sort({ createdAt: -1 })
                .limit(5)
        }

        res.json({ success: true, dashboard: dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({})
            .populate('blog', 'title')  // blog title bhi aaye
            .sort({ createdAt: -1 })
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndDelete(id)
        res.json({ success: true, message: 'Comment deleted' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndUpdate(id, { isApproved: true })
        res.json({ success: true, message: 'Comment approved' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}







