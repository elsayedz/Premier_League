const res = require('express');
const service = require('./service')




async function read(req, res){
      console.log("Read club by stad called");

      try {
          
        const stad = req.query.stad;
        if (stad == null)
            throw 'Bad Request';

        const club = await service.read(stad);
        res.status(200).send(club);

      } catch (err) {
          console.log('Error: '+ err);
          res.status(404).send(err);
      }
 
};

async function readByCity(req, res){
    console.log("Read clubs by city called");

    try {
        
      const city = req.query.city;
      if (city == null)
          throw 'Bad Request';

      const clubs = await service.readByCity(city);
      res.status(200).send(clubs);

    } catch (err) {
        console.log('Error: '+ err);
        res.status(404).send(err);
    }

};







module.exports = {read, readByCity}
