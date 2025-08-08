export type RandomUser = {
  gender: string;
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  email: string;
  phone: string;
  cell: string;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  picture: { large: string; medium: string; thumbnail: string };
  login?: { username?: string };
};