
let lostDocuments = (req, res) => {
    return res.status(200).json({ 
                           Status: "Token ok",
                           auth: true,
                          });
  }


module.exports = {
    lostDocuments
}
