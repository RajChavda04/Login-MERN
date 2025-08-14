const express = require("express")
const app = express();
require('dotenv').config();
require("./Models/db")
const bodyParser = require("body-parser")
const cors = require("cors")
const Router = require("./Routes/AuthRouter")
const ProductRouter = require("./Routes/ProductRouter")


require('dotenv').config();
require("./Models/db")
const PORT = process.env.PORT || 8080


app.get('/ping',(req,res)=>{
  res.send('PONG')
})


app.use(bodyParser.json());
app.use(cors());
app.use("/auth", Router);
app.use("/product", ProductRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
