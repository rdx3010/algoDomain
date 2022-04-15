const express =  require('express');
const app = express();
const userRouter = require('./routes/user');
require('./db/mongoose');
const port = process.env.port || 3000;

app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})