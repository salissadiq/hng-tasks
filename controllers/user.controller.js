const getUser = async (request, response, next) => {
    response.json({
        message: "Ftech User"
    })
}

module.exports = {getUser}