const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{  
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

//bcrypt를 통해 비밀번호 암호화시킴
const bcrypt =require('bcrypt')
const saltRounds = 10
userSchema.pre('save', function(next){ 
    //userSchema를 save하기 전에 function을 실행함
    //next() 실행 시, save 문으로 돌아감

    //index.js에서 user.save를 통해 save가 호출되었기 때문에, this=>user를 가리킴 
    var user = this;

    if(user.isModified('password')){ //password가 변경된 경우에만 다음 코드 실행함
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            //user.password를 암호화한 버전이 hash에 들어감
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)

                user.password = hash
                next()
            })
        })
    }
    
})
const User = mongoose.model('User', userSchema)
module.exports = {User}