import axios from "axios";

export class SwapiService {
  async getPeople() {
    const { data } = await axios.get("https://swapi.py4e.com/api/people/1/");
    return { name: data.name, height: data.height };
  }
}
