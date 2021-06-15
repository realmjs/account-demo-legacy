"use strict"

const DynamoDBDriver = require('@realmjs/account-dynamodb-driver');

const region = 'us-west-2';
const endpoint = 'http://localhost:4566';

const database = new DynamoDBDriver({ region, endpoint });

module.exports = database;
