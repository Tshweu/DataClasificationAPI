const api = require('./api.js');
const asser = require('assert');
const User = require('./models/user');

describe('user',()=>{
    describe('register user',()=>{
        it('should save without error',(done)=>{
            let user = new User({'email':'ted@gmail.com',
                                'password':'ted'});
            user.save((err)=>{
                if(err){
                    done(err);
                }else{
                    done();
                }
            })
        })
    })
})

//