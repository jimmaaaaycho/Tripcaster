import express from 'express';
import dbConfig from './config/db'
import middlewareConfig from './config/middleware'
import { PodcastRoutes, MapRoutes } from './modules'


const app = express();

/*Database*/
dbConfig();

/*Middleware*/
middlewareConfig(app);

app.use('/api', [PodcastRoutes, MapRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
	if (err) {
		console.error(err);
	}
    else {
		console.log(`App listening on port ${PORT}`)
	}
});

