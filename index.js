const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require("./models/User")
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
const { userInfo } = require('os')
mongoose.connect(config.mongoURI,{
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

app.post('/login', (req, res)=>{
  //요청된 이메일을 DB에서 찾음
  User.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청한 이메일이 DB에 있다면, 비밀번호가 일치한지 확인함
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({
        loginSuccess:false,
        message: "비밀번호가 틀렸습니다."
      })

      return res.json({
        loginSuccess: true,
        message: "로그인에 성공했습니다!"
      })
    })
  }).catch((err)=>{
    return res.status(400).send(err);
  })
  //비밀번호까지 맞다면, user를 위한 token을 생성함
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})