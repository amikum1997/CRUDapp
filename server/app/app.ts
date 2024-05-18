import app from "./config/express";
import environment from './config/environment';
// import connect from './config/postgreSql';


// POSTGRESQL CONNECTION
// connect()

// SERVER 
app.listen(environment.PORT,
             () => console.log(`server started on port ${environment.PORT} (${environment.NODE_ENV})`)
           );


