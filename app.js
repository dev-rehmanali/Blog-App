const express = require('express');
const bodyParser = require('body-parser');
require('./db/conn');

const usersRoutes = require('./routes/users-routes');
const postRoutes = require('./routes/posts-routes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5000);