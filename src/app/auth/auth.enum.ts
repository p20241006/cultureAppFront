export enum Role {
  None = 'none',
  User = 'user',  //clerk
  adminEvents = 'adminEvents',  //admin
  Manager = 'manager',  //manager
}

export enum AuthMode {
  InMemory = 'In Memory',
  CustomServer = 'Custom Server',
  Firebase = 'Firebase',
}
