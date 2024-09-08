import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,

  firebase: {
    apiKey: "AIzaSyApGpahTBVJbYjmZYp_eKejtp8oZikocWo",
    authDomain: "prj20241006.firebaseapp.com",
    projectId: "prj20241006",
    storageBucket: "prj20241006.appspot.com",
    messagingSenderId: "841751536019",
    appId: "1:841751536019:web:95523c327eff84ea80c866",
    measurementId: "G-1FW7X8C4Z3"
  }

}

