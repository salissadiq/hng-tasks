const signup = async(request, response, next) => {
    const { body } = request.body
    
}

const login = async(request, response, next) => {
    response.json({
        message: "Login success"
    })
}

module.exports = {signup, login}