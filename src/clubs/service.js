const {PrismaClient, Prisma} = require('@prisma/client');

const db = new PrismaClient()

/*


model Club {
  clubName                   String               @id @db.VarChar(30)
  website                    String               @db.VarChar(2048)
  Match_ClubToMatch_awayTeam Match[]              @relation("ClubToMatch_awayTeam")
  Match_ClubToMatch_homeTeam Match[]              @relation("ClubToMatch_homeTeam")
  PlayerTeamInSeason         PlayerTeamInSeason[]
  Stadium                    Stadium[]
  User                       User[]
}

*/

async function read(stad){

try {
    
    const club = await db.stadium.findMany({
        
        where:{
            stadiumName:stad
        },
        include:{
            Club: true
        }
    })

    if(club.length == 0)
        throw "Not Found"

    console.log(club);
    return club;

} catch (err) {
    throw err;
}

}
async function readByCity(city){
/*
-- SELECT count(*) from Stadium WHERE city REGEXP '[^\\x20-\\x7E]';

-- UPDATE Stadium SET city = REGEXP_REPLACE(city, '[^\\x20-\\x7E]', '') WHERE city REGEXP '[^\\x20-\\x7E]' LIMIT 9;
*/
try {
    
    const clubs = await db.stadium.findMany({
          
        where:{
            city: city
        },
        select:{
            homeClub:true
        }
    })

    if(clubs.length == 0)
        throw "Not Found"

    console.log(`Found ${clubs.length} clubs that are in ${city}`);
    return clubs;

} catch (err) {
    throw err;
}

}


module.exports = {read, readByCity}






// console.log(test)

