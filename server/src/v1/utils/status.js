exports.errorResponse = function (Message, response,code=400) {
    response.status(code).send({
        status: false,
        message: Message,
    });
}

exports.successResponse = function (Data, response,code=200) {    
    response.status(code).json({
        status: true,
        data: Data,
    })
}