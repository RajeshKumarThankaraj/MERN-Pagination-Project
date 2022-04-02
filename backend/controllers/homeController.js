const db = require("../connection");

//@desc     User Home Page
//@route    GET /home
//@access   Private

// No. of projects to show on each page
const resultsPerPage = 2;

const homeController = (req, res) => {
  let sql = "SELECT * FROM project";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const noOfResults = result.length;
    const noOfPages = Math.ceil(noOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;

    const startingLimit = (page - 1) * resultsPerPage;
    console.log(req.query);
    const findOrderBy = (order) => {
      if (order === "userName") {
        return "U.U_NAME";
      }
      if (order === "cName") {
        return "C.C_NAME";
      }
      if (order === "pTitle") {
        return "P.P_TITLE";
      }
      if (order === "cDate") {
        return "P.CREATE_DATE";
      }
    };
    let orderBy = findOrderBy(req.query.orderBy);
    sql = `select P.P_ID, P.P_Title, U.U_name,C.C_NAME from project P JOIN user U on P.U_id = U.U_id RIGHT join categories C on C.C_id = p.C_id ORDER BY ${orderBy} LIMIT ${startingLimit}, ${resultsPerPage}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= noOfPages ? iterator + 9 : page + (noOfPages - page);
      if (endingLink < page + 4) {
        let paging = page + 4;
        iterator -= paging - noOfPages;
        if (iterator <= 0) {
          iterator = 1;
        }
      }
      console.log(result);
      res.status(200).json({
        data: result,
        page,
        iterator,
        endingLink,
        noOfPages,
      });
    });
  });
};

module.exports = homeController;
