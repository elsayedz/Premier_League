const res = require('express');
const service = require('./service')



async function create(req, res){
    console.log("Create Review called");
    const body = req.body;
    console.log(body)
    try{
        let Review = await service.create(body)
        res.status(200).send('Created Review successfully');
    } catch (err){
        console.log(`Error ${err}`);
        res.status(400).send(err)
    }
};


async function read(req, res){
    console.log("Read Review Called")
    console.log(`Requested email: ${req.query.email}`)
    const email = req.query.email;
    try{
        const userReviews = await service.read(email);
        res.status(200).send(userReviews);
    } catch (err){
        console.log(`Error ${err}`);
        res.status(500).send(err)
    }
};

async function update(req, res){
    console.log("Update called");
    const newText = req.body['textReview'];
    const homeTeam = req.query.ht;
    const awayTeam = req.query.at;
    const season = req.query.season;
    try {
        
        const newReview = await service.update(homeTeam, awayTeam, season, newText);
        res.status(200).send(newReview)
    } catch (err) {
        console.log(err)
    }
}

async function getMatchReviews(req, res){
        console.log("Get match reviews called")
        const homeTeam = req.query.ht;
        const awayTeam = req.query.at;
        const season = req.query.season;
        console.log(homeTeam , awayTeam, season);
        try {
            const matchReviews = await service.getMatchReviews(homeTeam, awayTeam, season);
            res.status(200).send(matchReviews);

        } catch (err) {
            console.log(`Error ${err}`)
            res.status(500).send(err);
        }

}



module.exports = {create, read, update ,getMatchReviews}
