const API_URL = 'https://jsonplaceholder.typicode.com/users';
// The url endpoint for the public api of users from which we will extract the usernames

// Define an interface for the user data
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const fetchUsername = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: User[] = await response.json();
    // We manipulate the received response object and store the usernames and return it
    const userames = data.map((user: any) => user.username);
    return userames;
  } catch (error) {
    throw error;
  }
};
