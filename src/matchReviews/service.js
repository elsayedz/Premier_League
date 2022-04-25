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
        const review = await db.userMatchReviews.create({
            data: {
                email: param['email'],
                matchDate: date,
                homeTeam: param['homeTeam'],
                rating: param['rating'],
                textReview: param['textReview'],
                awayTeam: param['awayTeam'],
                season: param['season']
            }
        })
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

        const userReviews = await db.userMatchReviews.findMany({
            where: {
                email: userEmail,
            }
        })
        
        console.log("Got Reviews : " + JSON.stringify(userReviews))
        return userReviews;
    } catch (err) {
        throw err;
    }
}

async function update( homeTeam, awayTeam, season, textReview ){

    try {
        const newReview = await db.userMatchReviews.updateMany({
            where:{
               
                        homeTeam: homeTeam,
                        awayTeam: awayTeam,
                        season: season
                    
                },
            data:{
                textReview: textReview
            }
        });

        return newReview;
    } catch (err) {
        throw err;
    }
}

async function getMatchReviews(homeTeam, awayTeam, season){
    
    try {
        
        const matchReviews = await db.userMatchReviews.findMany({
            where: {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                season: season
            }
        })
        
        console.log("Match Reviews: " + JSON.stringify(matchReviews))
        return matchReviews

    } catch (err) {
        throw err;
    }


}

module.exports = {create, read, update,  getMatchReviews}




// const players = await db.$queryRaw`SELECT p.name, p.nationality, ps.clubName, ps.season
// FROM Premier_League.PlayerTeamInSeason ps INNER JOIN Player p
// on ps.name = p.name and ps.dateOfBirth = p.dateOfBirth
// where p.nationality = "${}";`

// console.log(test)

