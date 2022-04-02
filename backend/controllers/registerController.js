const db = require("../connection");
const bcrypt = require("bcrypt");

//@desc     Register
//@route    POST /register
//@access   Public

const registerController = async (req, res) => {
  const { userName, password } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = { U_NAME: userName, PASSWORD: hashedPassword };
  const sql = `INSERT INTO user SET ?`;
  const response = await db.query(sql, user, (err, results) => {
    if (err) throw err;
    //   res.status(200).json({
    //     message: `INSERT Sucessful ${result}`,
  });
  // });
  console.log(response);

  res.status(200).json({
    userName,
    password,
  });
};

module.exports = registerController;
