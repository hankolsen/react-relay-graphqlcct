import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

let app = express();

app.use('/graphql', GraphQLHTTP({
	schema,
	graphiql: true
}));

app.use(express.static('public'));

let db;
MongoClient.connect('mongodb://localhost/rgr', (err, database) => {
	if (err) {
		throw err;
	}

	db = database;
	app.listen(3000, () => console.log('Listining on port 3000'));
});

app.get('/data/links', (req, res) => {
	db.collection('links').find({}).toArray((err, links) => {
		if (err) {
			throw err;
		}

		res.json(links);
	});
});
