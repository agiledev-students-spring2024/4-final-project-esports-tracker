const assert = require('assert');
const { default: mongoose } = require('mongoose');
const Post = mongoose.model('post')





const postPost = async(req, res) => {
    try {
      // assert(typeof req.body.caption === 'string', 'Invalid or missing "content" value in the request body');


      const caption = req.body.caption
      const image = req.file.path
      if(!caption){
        res.status(422).json({error: "missing caption"})
      }

      const postUser = {
        _id: req.user._id,
        username: req.user.username,
      }
      const new_post = await Post.create({
        caption,
        image,
        postedBy: postUser
      })

      // console.log(new_post)

      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// const postLike = (req, res) => {
// }

const getAllPosts = (req, res) =>{
  Post.find()
  .populate('postedBy', '_id username')
  .then((allPosts)=>{
    const modifiedPosts = allPosts.map(
      post => {
        return {
          _id: post._id,
          caption: post.caption,
          image: `${req.protocol}://${req.get('host')}/${post.image}`,
          likeCount: post.likeCount,
          comments: post.comments,
          postedBy: post.postedBy
        }
      }
    )
    res.json({allPosts: modifiedPosts})
  })
  .catch((error) =>{
      console.log(error)
  })
}

const getUserPosts = (req, res) => {
  console.log(req.user._id)
  Post.find({postedBy: req.user._id})
  .populate('postedBy', '_id username')
  .then((myPosts)=>{
    res.json({myPosts})
  })
  .catch((error) =>{
      console.log(error)
  })
}
  
  module.exports = { postPost, getAllPosts, getUserPosts }
