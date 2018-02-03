import { Router } from 'express';
import * as PodcastController from './controller'

const routes = new Router();

routes.post('/podcasts', PodcastController.createPodcast)
routes.get('/podcasts', PodcastController.getAllPodcasts)


export default routes;