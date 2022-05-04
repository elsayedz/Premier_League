const {PrismaClient, Prisma} = require('@prisma/client');

const db = new PrismaClient()

/*

model User {
  email            String             @id @db.VarChar(320)
  username         String             @db.VarChar(40)
  age              Int
  gender           String             @db.Char(1)
  birthdate        DateTime           @db.Date
  supportClub      String             @db.VarChar(30)
  Club             Club               @relation(fields: [supportClub], references: [clubName], onDelete: NoAction, map: "user_ibfk_1")
  UserMatchReviews UserMatchReviews[]

  @@index([supportClub], map: "supportClub")
}


*/
async function create(param){

    try{
        const date = (new Date(param['birthdate']))
        const user = await db.$queryRaw`INSERT INTO User values (${param['email']}, ${param['password']}, ${param['username']}, ${param['age']}, ${param['gender']}, ${date}, ${param['supportClub']});`
        return user.email;
    }catch(err){
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === 'P2002') {
              throw 'There is a unique constraint violation, a new user cannot be created with this email';
            }
        }
    }
    
}

async function read(email, pass){

    try {
        
        const user = await db.$queryRaw`SELECT email,username,age,gender,birthdate,supportClub FROM User WHERE email = ${email} AND password = ${pass};`
        if(user.length == 0)
            throw 'No user found';
        return user;
        
    } catch (err) {
        console.log("get user error "+ err);
        throw err;
    }

}

module.exports = {create,read}