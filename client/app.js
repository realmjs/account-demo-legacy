"use strict"

const done = {};

import AccountClient from '@realmjs/account-client';

const acc = new AccountClient({
  app: 'demo',
  baseurl: 'http://localhost:3100',
  session: '_r_s_sess_',
});

acc
  .on('authenticating', () => { console.log('--> authenticating...'); updateUserInfo(null); })
  .on('authenticated', user => { console.log(`--> authenticated: user: ${user}`); updateUserInfo(user); })
  .on('unauthenticated', () => { console.log('--> unauthenticated'); updateUserInfo(undefined); })

document.addEventListener("DOMContentLoaded", (event) => {
  const btn = ['sso', 'lso', 'signup', 'signin', 'signout'];
  btn.forEach( name => done[name] = createCallbackFn(name));
  btn.forEach( fn => $(fn).onclick = function() {
    acc[fn](done[fn])
    .then(user => console.log(`${fn.toUpperCase()} Promise Resolve. \nUser: ${JSON.stringify(user)}`))
    .catch( err =>  console.log(`${fn.toUpperCase()} Promise Reject. Error: ${err}`))
  })
}, false);

function $(id) {
  return document.getElementById(id);
}

function updateUserInfo(user) {
  $("user.fullName").innerHTML = user && user.profile.fullName || 'No signed in user';
  $("user.email").innerHTML = user && user.profile.email[0] || '';
}

function createCallbackFn(name) {
  return function(err, user) {
    const msg = err ? `without error.` : `with err: ${err}`;
    console.log(`${name.toUpperCase()} callback is called ${err}`);
    console.log(`User:  ${JSON.stringify(user)}`)
  }
}