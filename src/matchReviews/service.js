const {PrismaClient, Prisma} = require('@prisma/client');

const db = new PrismaClient()

/*

model UserMatchReviews {
  email      String   @db.VarChar(320)
  matchDate  DateTime @db.Date
  homeTeam   String   @db.VarChar(30)
  rating     Int
  textReview String   @db.Text
  awayTeam   String   @db.VarChar(30)
  season     String   @db.VarChar(45)
  User       User     @relation(fields: [email], references: [email], onDelete: NoAction, map: "usermatchreviews_ibfk_1")
  Match      Match    @relation(fields: [homeTeam, awayTeam, season], references: [homeTeam, awayTeam, season], onDelete: NoAction, map: "usermatchreviews_ibfk_3")

  @@id([email, homeTeam, awayTeam, season])
  @@index([homeTeam, awayTeam, season], map: "homeTeam")
  @@index([season], map: "season_fk_idx")
  @@index([matchDate], map: "usermatchreviews_ibfk_2_idx")
}

*/
async function create(param){

    try{
        const date = new Date(param['matchDate'])
        const review = await db.$queryRaw`INSERT INTO userMatchReviews VALUES( 
        ${param['email']},
        ${date},
        ${param['homeTeam']},
        ${param['rating']},
        ${param['textReview']},
        ${param['awayTeam']},
        ${param['season']});`
        
        return review.email;
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === 'P2002') {
              throw 'There is a unique constraint violation, a new review cannot be created with this email';
            }
        }
        throw err;
    }
    
}

async function read(userEmail){
    try {
        const userReviews = await db.$queryRaw`SELECT * FROM userMatchReviews INNER JOIN User on userMatchReviews.email = User.email WHERE userMatchReviews.email = ${userEmail};`
    
        
        
        console.log("Got Reviews : " + JSON.stringify(userReviews))
        return userReviews;
    } catch (err) {
        throw err;
    }
}

async function readAll(userEmail){
    try {
        const allReviews = await db.$queryRaw`SELECT * FROM userMatchReviews INNER JOIN User on userMatchReviews.email = User.email ORDER BY matchDate DESC;`

        console.log("Got Reviews : " + JSON.stringify(allReviews))
        return allReviews;
    } catch (err) {
        throw err;
    }
}

async function update( homeTeam, awayTeam, season, textReview ){

    try {
    
        const newReview = await db.$queryRaw`
            UPDATE userMatchReviews 
            SET 
            textReview = ${textReview}
            WHERE
                homeTeam = ${homeTeam}
                AND awayTeam = ${awayTeam} AND season = ${season};`

        return newReview;
    } catch (err) {
        throw err;
    }
}

async function getMatchReviews(homeTeam, awayTeam, season){
    
    try {
        
        const matchReviews = await db.$queryRaw`SELECT * FROM userMatchReviews INNER JOIN User on userMatchReviews.email = User.email WHERE homeTeam = ${homeTeam} AND awayTeam = ${awayTeam} AND season = ${season};`
        
        console.log("Match Reviews: " + JSON.stringify(matchReviews))
        return matchReviews

    } catch (err) {
        throw err;
    }


}

module.exports = {create, read, update,  getMatchReviews, readAll}




// const players = await db.$queryRaw`SELECT p.name, p.nationality, ps.clubName, ps.season
// FROM Premier_League.PlayerTeamInSeason ps INNER JOIN Player p
// on ps.name = p.name and ps.dateOfBirth = p.dateOfBirth
// where p.nationality = "${}";`

// console.log(test)

