import koa from 'koa';
import parser from 'koa-bodyparser';
import mongoose from 'mongoose';
import graffiti from '@risingstack/graffiti';
import faker from 'faker';
import { getSchema } from '../src';

import Country from './country';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

const countries = Array(10).fill(null).map(() => ({
  code: faker.address.countryCode(),
  name: faker.address.country(),
  dictionary: [],
  language: [],
  loc: {
    type: 'lat-long',
    coordinates: [faker.address.latitude(), faker.address.longitude()]
  }
}));
Country.remove().then(() => Country.create(countries));

const port = process.env.PORT || 8000;

const hooks = {
  plural: {
    post: (next, value) => {
      console.log(JSON.stringify(value));
      next();
    }
  }
};
const schema = getSchema([Country], { hooks });

// set up example server
const app = koa();

// parse body
app.use(parser());

// attach graffiti-mongoose middleware
app.use(graffiti.koa({
  schema
}));

// redirect all requests to /graphql
app.use(function *redirect(next) {
  this.redirect('/graphql');
  yield next;
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Started on http://localhost:${port}/`);
});
