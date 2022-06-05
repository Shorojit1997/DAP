

const signUpValidation = (data) => {
    let error = {}
    if (!data.username) {
        error.email = "Please give your username..."
    }
    if (!data.email) {
        error.email = "Please give your email..."
    }
    if (!data.user_type) {
        error.user_type = "Please select..."
    }
    if(!data.password){
        error.password="Please give your password..."
    }
    if(!data.confirm_password){
        error.confirm_password="Please give your confirm password..."
    }
    if(data.confirm_password!=data.password){
        error.confirm_password="Password does not match..."
    }

    return error;

}


const adminSignUpValidation = (data) => {
    let error = {}
    if (!data.firstname || !data.lastname) {
        error.email = "Please give your name..."
    }
    if (!data.email) {
        error.email = "Please give your email..."
    }
    if(!data.password){
        error.password="Please give your password..."
    }
    if(!data.confirm_password){
        error.confirm_password="Please give your confirm password..."
    }
    if(data.confirm_password!=data.password){
        error.confirm_password="Password does not match..."
    }

    return error;

}

module.exports = { signUpValidation,adminSignUpValidation }