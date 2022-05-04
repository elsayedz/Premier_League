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

async function readMatchDate(req, res){
    console.log("Get match reviews called")
    const homeTeam = req.query.ht;
    const awayTeam = req.query.at;
    const season = req.query.season;
    console.log(homeTeam , awayTeam, season);
    try {
        if(homeTeam == null || homeTeam == '' || awayTeam == null || awayTeam == '' || season == null || season == '' )
            throw 'Bad Request';
        const date = await service.readMatchDate(homeTeam, awayTeam, season);
        res.status(200).send(date);

    } catch (err) {
        console.log(`Error ${err}`)
        res.status(500).send(err);
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

async function readWinsPerSeason(req, res){
    console.log("red Wins per season called");
    let season = req.query.season;
    try {
      if(season == null || season == '')
            throw 'Bad Request';
      const team = await service.readWinsPerSeason(season);
      res.status(200).send(team);

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





module.exports = {read, readHomeWins, readMostYC, readMostFouls, readMostShots, readMatchDate, readWinsPerSeason}
