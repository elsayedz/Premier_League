const {PrismaClient, Prisma} = require('@prisma/client');

const db = new PrismaClient()

/*


model Player {
  name        String   @db.VarChar(100)
  dateOfBirth DateTime @db.Date
  nationality String   @db.VarChar(20)
  height      Int?
  weight      Int?
  position    String   @db.VarChar(15)

  @@id([name, dateOfBirth])
}

*/


async function readWithName(playerName){
    try {
        console.log(playerName);
        const player = await db.$queryRawUnsafe(`SELECT * FROM player WHERE \`name\` like '%${playerName}%';`);
       console.log("Player info: " + JSON.stringify(player))
       
       if(player.length == 0)
            throw 'Not Found';
       
        return player;

    } catch (err) {
        throw err;
    }
}

async function readWithPos(playerPos){
    try {
        const players = await db.$queryRawUnsafe(`SELECT * FROM player WHERE position like '%${playerPos}%';`);
       console.log(`Fetched ${players.length} with pos ${playerPos}`)
       
       if(players.length == 0)
            throw 'Not Found';
       
        return players;

    } catch (err) {
        throw err;
    }
}

async function readHist(playerName){
    try {

        const player = await db.$queryRawUnsafe(`SELECT * FROM playerTeamInSeason WHERE \`name\` like '%${playerName}%';`);
    
       console.log("Player Hist: " + JSON.stringify(player))

       if(player.length == 0)
            throw 'Not Found';
       return player;
    } catch (err) {
        throw err;
    }
}

async function readPlayersWithNat(nat){
    
    try {

        const players = await db.$queryRawUnsafe(`SELECT p.name, p.nationality, ps.clubName, ps.season
        FROM PlayerTeamInSeason ps INNER JOIN Player p
        on ps.name = p.name and ps.dateOfBirth = p.dateOfBirth
        where p.nationality like '%${nat}%';`)

        console.log(`Fetched ${Object.keys(players).length} player with Nationality: ${nat}` )
        if(players.length == 0)
            throw 'Not Found';
            
       return players;
    } catch (err) {
        throw err;
    }
}


module.exports = {readWithName, readWithPos, readHist, readPlayersWithNat}






// console.log(test)

