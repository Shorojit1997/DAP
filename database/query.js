
const connection = require('./Database');
const _query =  (query) => {
    return new Promise((resolve,reject)=>{
        connection.query(query,(error,result, field)=>{
            if(result){
                resolve(result);
            }
            else if(error){
                reject(error);
            }
        })
    })
}

module.exports=_query;