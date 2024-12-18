import axios from "axios";

const getPeople = async () => {
  try {
    const { data } = await axios.get("https://swapi.py4e.com/api/people/1/");
    return { name: data.name, height: data.height };
  } catch (error) {
    console.error("Error fetching SWAPI data:", error);
    throw new Error("Failed to fetch SWAPI data");
  }
};

export { getPeople };
