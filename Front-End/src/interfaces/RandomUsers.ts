export interface RandomUsers {
  picture: {
    medium: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  dob: {
    age: number;
  };
}

export interface RandomUsersAPI {
  info: {
    seed: string;
    results: number;
    page: number;
  },
  results: RandomUsers[]
}

