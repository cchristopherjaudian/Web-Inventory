/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import express from 'express';
import cors from 'cors';
import CloudFunctions, { THttpsFunction } from './lib/cloud-functions';
import RouteMiddleware from './middleware/response-handlers';
import routes from './routes';

const app = express();

app.use(cors());

// initialize routes
app.use(routes);

// route middlewares e.g(not found, error handlers)
app.use(new RouteMiddleware().errorResponse);
app.use(new RouteMiddleware().notFound);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const v1 = new CloudFunctions()
    .withRuntime()
    .handlerV1(<THttpsFunction>(<unknown>app));
