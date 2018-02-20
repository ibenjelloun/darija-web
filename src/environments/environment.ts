// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCOC7DPCFQ2gWiV3D0sYidQngVcAXMBMlA',
    authDomain: 'darija-web.firebaseapp.com',
    databaseURL: 'https://darija-web.firebaseio.com',
    projectId: 'darija-web',
    storageBucket: 'darija-web.appspot.com',
    messagingSenderId: '1082843981941'
  }
};
