import * as express from 'express';
import * as bodyParser from 'body-parser';
import {createConnection} from 'typeorm';

import {dbOptions} from './app.config';
import {registerRoutes} from './routes/main';

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// connecting database
createConnection(dbOptions)
.then(async (connection) => console.log("--- connected to database ---") )
.catch( (err) => console.log(err) );


// registering routes
registerRoutes(app);


const PORT = 3000;
app.listen(PORT, () => {
    console.log("server started at http://localhost:%d", PORT);
})