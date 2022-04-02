const db = require("../connection");
const bcrypt = require("bcrypt");

//@desc     Login
//@route    POST /login
//@access   Public

const loginController = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  var result;
  const sql = `SELECT * FROM user WHERE U_NAME = '${userName}'`;
  const response = await db.query(sql, async (err, results) => {
    if (err) throw err;
    console.log(results);
    if (results.length > 0) {
      const testPassword = await bcrypt.compare(password, results[0].PASSWORD);
      console.log(testPassword);
      res.status(200).json({
        result: results,
      });
    } else {
      res.status(400).json({
        message: "Login failed",
      });
    }
  });
};

module.exports = loginController;
