const express = require('express');
const {PrismaClient} = require('@prisma/client');

const app = express();
const db = new PrismaClient()

const usersRoutes = require('./src/users/router')
const matchReviewsRoutes = require('./src/matchReviews/router')
const playerRoutes = require('./src/players/router')
const clubsRoutes = require('./src/clubs/router')
const matchesRoutes = require('./src/matches/router')

app.use((req, res, next) => {
    let d = new Date();
    console.log(req.method);
    console.log('Time: ', d.toString());
    next();
  });

  app.use('/users', usersRoutes);
  app.use('/reviews', matchReviewsRoutes);
  app.use('/player', playerRoutes)
  app.use('/club', clubsRoutes)
  app.use('/matches', matchesRoutes)

app.listen(3000, () => console.log('Example app is listening on port 3000.'));