const API_URL = 'https://jsonplaceholder.typicode.com/users';
// The url endpoint for the public api of users from which we will extract the usernames
export const fetchData = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // We manipulate the received response object and store the usernames and return it
    const names = data.map((user: any) => user.username);
    return names;
  } catch (error) {
    throw error;
  }
};
