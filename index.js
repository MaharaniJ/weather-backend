const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
const PORT = 8000;
const router = require('./router/country-router')
require('./config/db')

app.use(cors({
    origin: "*",
}))

app.use('/',router)


app.listen(PORT,()=>{
    console.log("listening on port " + PORT )
})