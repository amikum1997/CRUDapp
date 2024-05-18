import app from "./config/express";
import environment from './config/environment';
import { pool , firstTimeUserSetup } from './config/postgreSql';

// POSTGRESQL CONNECTION
pool.connect()

// TABLE CREATION FOR FIRST TIME SETUP
firstTimeUserSetup()

// SERVER 
app.listen(environment.PORT,
  () => console.log(`server started on port ${environment.PORT} (${environment.NODE_ENV})`)
);


