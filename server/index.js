const express = require('express')
const app = express()
const port = 5000


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')

const {User} = require("./models/User")
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
//application/cookie-parser
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', async (req,res) => {
//회원 가입 시 필요한 정보를 client에서 가져오면, DB에 넣음
    const user = new User(req.body)
  
    try {
      await user.save();
      return res.status(200).json({success:true})
    } catch (err) {
      return res.json({success:false, err})
    }
})

app.post('/api/users/login', (req, res)=>{
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

      //비밀번호가 맞다면, 토큰을 생성함
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        //토큰을 쿠키에 저장함
        res.cookie("x_auth",user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  }).catch((err)=>{
    return res.status(400).send(err);
  })
})

app.get("/api/users/auth", auth, (req, res) => {    // auth middleware : endpoint에서 request를 받은 후 callback 함수를 호출하기 전에 기능을 추가해줌
  // middleware를 통과해왔음!
  // = Authentication이 True

  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false: true,   
      // user의 권한 : role !== 0이면 관리자
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image 
  })
})  // get request

app.get("/api/users/logout", auth, (req, res) => {
  console.log('req.user', req.user);
  User.findOneAndUpdate( //유저를 찾아서 토큰을 지우고 유저 정보를 업데이트함
      {_id: req.user._id}, {token: ""}).then(user=>{
          return res.status(200).send({success: true});
  }).catch((err)=>{
    return res.json({success: false, err});
  })
});

app.get("/api/hello",(req, res)=>{
  res.send('안녕하세요!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
