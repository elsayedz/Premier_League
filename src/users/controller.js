const res = require('express');
const service = require('./service')



async function create(req, res){
    console.log("Create called");
    const reqLength = Object.keys(req.body).length
    const body = req.body;
    console.log(body)
    try{

        if(reqLength != 7) 
            throw "Bad Request";
        
        const email = body['email'];
        if(!isValidEmail(email))
            throw "Invalid Email";
        const pass = body['password']
        if(pass == null)
            throw "Invalid Passwor";

        let user = await service.create(body)
        res.status(200).send('Created user successfully with email' + user);
    } catch (err){
        console.log(`Error ${err}`);
        res.status(400).send(err)
    }
};


async function read(req, res){
    console.log("Read User Called")
    const email = req.body['email'];
    const pass = req.body['password'];
    console.log("USER IS LOGGING IN: " + email)
    console.log("USER IS LOGGING IN: " + password);
    try{
        if(email == null || email == '')
            throw 'Bad Request';
        const user = await  service.read(email, pass);
        res.status(200).send(user);
    } catch (err){
        console.log(`Error ${err}`);
        res.status(500).send(err)
    }
};


async function update(req, res){
    console.log("Update User Called")
    try{
        res.status(200).send('Created user successfully');
    } catch (err){
        console.log(`Error ${err}`);
        res.status(500).send(err)
    }
};


function isValidEmail(email){
    
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

module.exports = {create, read ,update}
