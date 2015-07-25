# graffiti-mongoose

Mongoose adapter for [graffiti](https://github.com/RisingStack/graffiti).

## Install

```
npm i @risingstack/graffiti-mongoose --save
```

## Usage

```javascript
import mongoose from 'mongoose';
import {graphql} from 'graphql';
import {getSchema} from '@risingstack/graffit-mongoose';


var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: Number
});

var User = mongoose.model('User', UserSchema);

var schema = getSchema([User]);

var query = `{
    user {
      name
      age
    }
  }`;

return yield graphql(schema, query);
```
