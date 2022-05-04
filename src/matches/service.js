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

async function read(){

try {
    
    const results = await db.$queryRaw`
    SELECT IF(goalsH = goalsA, "Tie", IF(goalsH> goalsA, homeTeam, awayTeam)) as team, count(*) as total FROM \`Match\`
	group by 1
    order by 2 Desc
    limit 11;`

    if(results.length == 0)
        throw "Not Found"
        var teams;
        results.forEach(team => {
            console.log(team['team']);
            if(team['team'] == 'Tie')
                teams = results.filter(e => e !== team)
                console.log('Found it ');
        });
        


    console.log(teams);
    return teams;

} catch (err) {
    throw err;
}

}

async function readWinsPerSeason(season){

try {
    
    const results = await db.$queryRaw`
    SELECT IF(goalsH = goalsA, "Tie", IF(goalsH> goalsA, homeTeam, awayTeam)) as team, count(*) as total FROM \`Match\`
	WHERE season = ${season}
    group by 1
    order by 2 Desc
    limit 4;`

    if(results.length == 0)
        throw "Not Found"
        var teams;
        results.forEach(team => {
            console.log(team['team']);
            if(team['team'] == 'Tie')
                teams = results.filter(e => e !== team)
                console.log('Found it ');
        });
        


    console.log(teams);
    return teams;

} catch (err) {
    throw err;
}

}

async function readMatchDate(homeTeam, awayTeam, season){

    try {
        
        const date = await db.$queryRaw`SELECT \`date\` FROM \`Match\` WHERE homeTeam = ${homeTeam} AND awayTeam = ${awayTeam} AND season = ${season};`
        
        console.log("Match Reviews: " + JSON.stringify(date))
        return date

    } catch (err) {
        throw err;
    }
    
    }

async function readHomeWins(){

try {
    

    const homwWins = await db.$queryRaw`-- Team with most home wins
    SELECT homeTeam as team, count(homeTeam) as total FROM \`Match\`
        where goalsH > goalsA and goalsH != goalsA
        group by 1
        order by 2 Desc
        limit 11;`
    if(homwWins.length == 0)
        throw "Not Found"

    console.log(`Team with most wins ${JSON.stringify(homwWins[0])}`);
    return homwWins;

} catch (err) {
    throw err;
}

}


async function readMostYC(){

    try {
        
    
        const yellowCards = await db.$queryRaw`SELECT team, sum(yh) as total FROM (
            SELECT homeTeam as team, sum(yellowCardsH) as yh FROM \`Match\`
            group by 1
            
            UNION ALL
            
            select awayTeam, sum(yellowCardsA) as ya FROM \`Match\`
            group by 1) as ycards
            group by 1
            order by 2 DESC
            limit 10;`

        if(yellowCards.length == 0)
            throw "Not Found"
    
        console.log(`Team with most yellow cards ${JSON.stringify(yellowCards[0])}`);
        return yellowCards;
    
    } catch (err) {
        throw err;
    }
    
}

async function readMostFouls(){

    try {
        
    
        const fouls = await db.$queryRaw`SELECT team, sum(yh) as total FROM (
            SELECT homeTeam as team, sum(foulH) as yh FROM \`Match\`
            group by 1
            
            UNION ALL
            
            select awayTeam, sum(foulA) as ya FROM \`Match\`
            group by 1) as fouls
            group by 1
            order by 2 DESC
            limit 10;`

        if(fouls.length == 0)
            throw "Not Found"
    
        console.log(`Team with most fouls ${JSON.stringify(fouls[0])}`);
        return fouls;
    
    } catch (err) {
        throw err;
    }
    
}
async function readMostShots(){

    try {
        
    
        const shots = await db.$queryRaw`SELECT team, sum(shot) as total FROM (
            SELECT homeTeam as team, sum(shotH) as shot FROM \`Match\`
            group by 1
            
            UNION ALL
            
            select awayTeam, sum(shotA) as ya FROM \`Match\`
            group by 1) as shots
            group by 1
            order by 2 DESC
            limit 10;`

        if(shots.length == 0)
            throw "Not Found"
    
        console.log(`Team with most shots ${JSON.stringify(shots[0])}`);
        return shots;
    
    } catch (err) {
        throw err;
    }
    
}
    

module.exports = {read, readHomeWins, readMostYC, readMostFouls, readMostShots, readMatchDate, readWinsPerSeason}






// console.log(test)

