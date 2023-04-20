const errorHandler = (err, req, res, next) => {
    console.log('err :: '+err.message);
    console.log('err :: '+err.stack);
    console.log('Code :: '+res.statusCode);

    switch(err.statusCode){
        case 404 : res.json({
            status: 404,
            message: "not Found"
        });
        default: res.json({
            status: err.statusCode,
            message: err.message,
            stackTrace: err.stackTrace
        });
    }
}

module.exports = errorHandler;