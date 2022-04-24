const express = require('express');
const {PrismaClient} = require('@prisma/client');

const app = express();
const db = new PrismaClient()

app.use((req, res, next) => {
    let d = new Date();
    console.log(req.method);
    console.log('Time: ', d.toString());
    next();
  });


app.get('/', async (req, res) => {
//   resp =  await getStads();  
  res.send(resp);
});

// async function getStads(){
//     const date = (new Date(2000,11,24))
//     stads = db.user.create({
//         data: {
//             email: "elsayed.z@aucegypt.edu",
//             username: "elsayedTest",
//             age: 21,
//             gender: 'M',
//             birthdate: date,
//             supportClub: "Manchester City"
//         }
//     })
//     return stads;
// }
app.listen(3000, () => console.log('Example app is listening on port 3000.'));