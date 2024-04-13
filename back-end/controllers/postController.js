const assert = require('assert');
const { default: mongoose } = require('mongoose');
const Post = mongoose.model('post')


const postPost = async(req, res) => {
    try {
      assert(typeof req.body.image === 'string', 'Invalid or missing "image" value in the request body');
      assert(typeof req.body.caption === 'string', 'Invalid or missing "content" value in the request body');

      const{caption, image} = req.body
      if(!caption){
        res.status(422).json({error: "missing caption"})
      }


      const new_post = await Post.create({
        caption,
        image,
        postedBy: req.user._id,
        username: req.user.username,
      })

      console.log(new_post)


      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { postPost }
