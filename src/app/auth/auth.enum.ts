export enum Role {
  None = 'none',
  User = 'USER',  //clerk
  adminEvents = 'ADMIN',  //admin
  Manager = 'MODERADOR',  //manager
}

export enum AuthMode {
  InMemory = 'In Memory',
  CustomServer = 'Custom Server',
  Firebase = 'Firebase',
}
