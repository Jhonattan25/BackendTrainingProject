let registerLostDocuments = (req, res) => {
    return res.status(200).json({ 
                            status: 'Successful registerLostDocuments',
                            numDocumento: req.body.numDocumento,
                            nombreCompleto: req.body.nombreCompleto,
                            cedulaFuncionario: req.body.cedulaFuncionario                        
                          });
  }


module.exports = {
registerLostDocuments
}
