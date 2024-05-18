import express,{Application} from "express";
import path from "path";
import router from "../routes";
import morgan from 'morgan';
import environment from "./environment";
import cors from 'cors';
import compress from 'compression';
import helmet from "helmet";
import methodOverride from 'method-override';
import HandleError from "../error/errorHandeler";


const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Logger
app.use(morgan(environment.LOGS));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
  
// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// mount api v1 routes
app.use('/v1', router);

// BASE ERROR HANDELING
app.use(HandleError.returnError as any);


export default app;