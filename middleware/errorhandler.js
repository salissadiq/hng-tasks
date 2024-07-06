const errorHandler = (err, req, res, next)=> {
    if (err.name == "SequelizeUniqueConstraintError") 
        return res.status(422).json({
            errors: [
                {
                field: err.errors[0].path ,
                message: err.errors[0].message
                },
            ]
        })
    
  res.status(500).json({ error: err });
}

module.exports = errorHandler;