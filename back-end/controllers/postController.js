const assert = require('assert');

const postPost = (req, res) => {
    try {
      assert(typeof req.body.image === 'string', 'Invalid or missing "image" value in the request body');
      assert(typeof req.body.caption === 'string', 'Invalid or missing "content" value in the request body');
        console.log(req.body);
      // Send a success response
      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { postPost }
