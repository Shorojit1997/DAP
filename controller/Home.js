const CreateTable=require('../database/CreateTable')


const home = async (req, res, next) => {

    try {
        CreateTable();
    }
    catch (e) {

        console.log(e);

    }
    res.send("Hello from doctor")
}


module.exports = { home }