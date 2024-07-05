const signup = async(request, response, next) => {
    response.json({
        message: "Success"
    })
}

const login = async(request, response, next) => {
    response.json({
        message: "Login success"
    })
}

module.exports = {signup, login}