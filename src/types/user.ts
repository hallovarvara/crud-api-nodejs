export interface UserDataT {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UserT extends UserDataT {
  id: string;
}

export type UsersDatabaseT = UserT[];
