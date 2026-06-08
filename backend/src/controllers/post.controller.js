import {Post} from "../models/post.model.js"

const createPost = async (req, res) =>{
  try {
    const {name, description, age} = req.body;
    if(!name || !description || !age) return res.status(400).json({
      message: "all fields required"
    })
    const post = await Post.create({name, description, age})
    return res.status(200).json({
      message: "post created successfuly", post 
    })
  } catch (error) {
    return res.status(500).json({
      message: "internal service error "
    })
  }
}
const getPosts = async (req, res)=>{
  try {
    const posts = await Post.find()
    if(!posts) return res.status(404).json({
      message: "post not found "
    })

     return res.status(200).json(posts)
  } catch (error) {
     return res.status(500).json({
      message: "internal service error ", error
    })
  }
}
const updatePost = async (req, res)=>{
  try {
   
    if(Object.keys(req.body).length === 0) return res.status(400).json({
      message: "body cant be empty"
    }) 
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!post) return res.status(400).json({
      message: "post not found"
    })

    return res.status(200).json({
      message: "post updated successfully", post
    })
  } catch (error) {
     return res.status(500).json({
      message: "internal service error ", error
    }) 
  }
}

const deletePost = async (req, res)=>{
  try {
     const deleted = await Post.findByIdAndDelete(req.params.id)
   if(!deleted) return res.status(400).json({
      message: "post not found"
    })
    return  res.status(200).json({
      message: "post deleted successfully "
    })
  } catch (error) {
    return res.status(500).json({
      message: "internal service error"
    })
  }
 
}

export {
  createPost,
  getPosts,
  updatePost,
  deletePost
}
// const updatePost = async (req, res) 