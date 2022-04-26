const res = require('express');
const service = require('./service')




async function read(req, res){
      
    if("name" in req.query){
        console.log("Get payer with name Called")
        try{
            const playerName = req.query.name;
            if(playerName == null )
                throw 'Name Field Empty'
            const player = await service.readWithName(playerName);
            res.status(200).send(player);
        } catch (err){
            console.log(`Error ${err}`);
            res.status(404).send(err)
        }

    }else if("pos" in req.query){
        console.log("Get payer with POS Called")
        
        try{
            const playerPos = req.query.pos;
            
            if(playerPos == null )
                throw 'Position Field Empty'
            
            const player = await service.readWithPos(playerPos);
            res.status(200).send(player);
        } catch (err){
            console.log(`Error ${err}`);
            res.status(404).send(err)
        }
    
    }else{
        res.status(404).send("Bad Request")
    }


};

async function readHist(req, res){
    console.log("Get PLayer History Called")
    console.log(`Requested player: ${req.query.name}`)
    const playerName = req.query.name;
    try{
        const player = await service.readHist(playerName);
        res.status(200).send(player);
    } catch (err){
        console.log(`Error ${err}`);
        res.status(404).send(err)
    }
};

async function readPlayersWithNat(req, res){
    console.log("Get PLayers with nationality")
    console.log(`Requested players Nat: ${req.query.nat}`)
    const nat = req.query.nat;
    try{
        const playersNat = await service.readPlayersWithNat(nat);
        res.status(200).send(playersNat);
    } catch (err){
        console.log(`Error ${err}`);
        res.status(404).send(err)
    }
};






module.exports = {read, readHist, readPlayersWithNat}
