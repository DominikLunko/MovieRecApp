import { FETCH_ALL, LIKE, UPDATE, ADD, DELETE } from "../constants/actionTypes";

export default (movies = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case "REC":
      
      return action.payload; 
      

    case ADD:
      return [...movies, action.payload];

    case UPDATE:
    case LIKE:
      return movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );

    case DELETE:
      return movies.filter((movie) => movie._id !== action.payload);

    default:
      return movies;
  }
};
