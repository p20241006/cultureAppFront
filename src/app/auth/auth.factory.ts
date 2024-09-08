import { environment } from '../../environments/environment'
import { AuthMode } from './auth.enum'
import {InMemoryAuthService} from "./in.memory-auth.service";
import {FirebaseAuthService} from "./firebase-auth.service";

export function authFactory() {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService()
    case AuthMode.CustomServer:
      throw new Error('Not yet implemented')
  }
}
