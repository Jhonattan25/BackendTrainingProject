let registerFoundDocuments = (req, res) => {
    return res.status(200).json({ 
                            status: 'Successful registerFoundDocuments',
                            numDocumento: req.body.numDocumento,
                            nombreCompleto: req.body.nombreCompleto,
                            cedulaFuncionario: req.body.cedulaFuncionario                        
                          });
  }


module.exports = {
  registerFoundDocuments
}
