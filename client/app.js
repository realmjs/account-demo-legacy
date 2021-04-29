"use strict"

const defer = {};

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
  const btn = ['sso', 'signup', 'signin', 'signout'];
  btn.forEach( name => defer[name] = createDeferFunc(name));
  btn.forEach( fn => $(fn).onclick = function() {
    acc[fn](defer[fn])
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

function createDeferFunc(name) {
  return function(user) {
    return new Promise((resolve) => {
      console.log('Defer function is called, will resolve after 3s');
      setTimeout(() => resolve(), 3000);
    });
  }
}