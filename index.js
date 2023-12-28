const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require("./models/User")

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bala:sal804567@cluster0.mgtsxs3.mongodb.net/?retryWrites=true&w=majority',{
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!!')
})

app.post('/register', async (req,res) => {
//회원 가입 시 필요한 정보를 client에서 가져오면, DB에 넣음
    const user = new User(req.body)
  
    try {
      await user.save();
      return res.status(200).json({success:true})
    } catch (err) {
      return res.json({success:false, err})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})