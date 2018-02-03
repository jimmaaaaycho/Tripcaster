import { Router } from 'express';
import * as MapsController from './controller'

const routes = new Router();

routes.post('/maps', MapsController.createMap)
routes.get('/maps', MapsController.getAllMaps)
routes.get('/commute', MapsController.commuteTime)


export default routes;
