const postPost = (req, res) => {
    try {
        console.log(req.body);
      // Send a success response
      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { postPost }
