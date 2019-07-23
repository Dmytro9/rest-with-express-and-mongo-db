const express = require("express");
const auth = require('../middleware/auth')
const router = express.Router();


// Get All
router.post("/", auth, async (req, res) => {
  // res.status(401).send('Unauthorized');

  // const {
  //   error
  // } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);


});


module.exports = router;