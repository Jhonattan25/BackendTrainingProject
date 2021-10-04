const mysqlConnection = require("../config/mysql");

let consultDocuments = (req, res) => {
    let category = req.header("category");
    let select =  `SELECT * FROM ${process.env.TABLE_DOCUMENT_REPORT} WHERE category=?`;
    let query = mysqlConnection.format(select, [category]);

    mysqlConnection.query(query, (error, result) => {
        if (error) throw error;
        return res.status(200).json({
            status: "Token ok",
            auth: true,
            documents: result
        });
    });
};

module.exports = {
  consultDocuments,
};
