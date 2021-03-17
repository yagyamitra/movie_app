const express=require("express")
const request=require('request')
const app=express()

//Middlewares
// tellin which templating engine we are using
app.set("view engine", "ejs")


// Routing 
app.get('/', (req, res)=>{
   // res.send('Home page from yagyamitra')
   res.render("home")
})




app.get('/result', (req, res)=>{
    console.log(req.query)
    // res.send(`You searched for ${req.query.movieName}`)
const url=`http://www.omdbapi.com/?apikey=79a75949&s=${req.query.movieName}`
request(url, function (error, response, body){
    if(!error && response.statusCode===200){
        const data=JSON.parse(body)
       // res.send(data)
       res.render('result', {moviesDump: data})
    }else{
        res.send('Something went wrong')
    }
       
  })
})

app.get('/result/:id', (req, res)=>{
    const url=`http://www.omdbapi.com/?apikey=79a75949&i=${req.params.id}`
   request(url, function (error, response, body){
    if(!error && response.statusCode===200){
        const data=JSON.parse(body)
    //    res.send(data)
       res.render('detail', {data: data})
    }else{
        res.send('Something went wrong')
    }
       
 })
})

app.get('*', (req, res)=>{
    res.send('404 not found!')
})

app.listen(3000, ()=>{
    console.log("Server has started")
})