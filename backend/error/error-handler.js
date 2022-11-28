const errorHandeler = ((req, res, next)=>{
    const error = new Error('Routes do not exist');
    error.status =  404;
    next(error)
    res.status(error.status || 500)
    res.json({
        error:{
            statusbar: 404,
            message: error.message
        }
    })
})
  module.exports = errorHandeler