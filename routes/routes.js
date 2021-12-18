const Home=require('./home')


let routes=[
    {
        path:'/doctor',
        handeler:Home
    },
    {
        path:'/',
        handeler:(req,res,next)=>{ res.send("Hello")}
    },

]

module.exports=(app)=>{

    routes.map((route)=>{
        if(route.path=='/'){
            app.get(route.path,route.handeler);
        }
        else{
            app.use(route.path,route.handeler);
        }
    })

}