const res = require('express');
const service = require('./service')




async function read(req, res){
      console.log("Read most matches won");

      try {
        const teams = await service.read();
        res.status(200).send(teams);

      } catch (err) {
          console.log('Error: '+ err);
          res.status(404).send(err);
      }
 
};

async function readHomeWins(req, res){
    console.log("readHomeWins called");

    try {
    
      const teams = await service.readHomeWins();
      res.status(200).send(teams);

    } catch (err) {
        console.log('Error: '+ err);
        res.status(404).send(err);
    }

};

async function readMostYC(req, res){
    console.log("readMostYC called");

    try {
    
      const teams = await service.readMostYC();
      res.status(200).send(teams);

    } catch (err) {
        console.log('Error: '+ err);
        res.status(404).send(err);
    }

};

async function readMostFouls(req, res){
    console.log("readMostFouls called");

    try {
    
      const teams = await service.readMostFouls();
      res.status(200).send(teams);

    } catch (err) {
        console.log('Error: '+ err);
        res.status(404).send(err);
    }

};

async function readMostShots(req, res){
    console.log("readMostShots called");

    try {
    
      const teams = await service.readMostShots();
      res.status(200).send(teams);

    } catch (err) {
        console.log('Error: '+ err);
        res.status(404).send(err);
    }

};





module.exports = {read, readHomeWins, readMostYC, readMostFouls, readMostShots}
