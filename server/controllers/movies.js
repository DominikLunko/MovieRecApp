import mongoose  from 'mongoose';
import Movie from '../models/movie.js';


export const searchMovies = async (req, res) =>{
    
    const search = req.body.search;
    let movies = null;
    
    const regex = new RegExp(search);

    movies = await Movie.find({title: {$regex: regex}}).sort({likes: -1});   

    res.json(movies);
}
export const genreOnlyMovies = async (req, res) =>{
    
    const genre = req.body.genre;
    let movies = null;
    movies = await Movie.find({genre: genre}).sort({likes: -1});   
  
    
      
    res.json(movies);
}

export const genreSearchMovies = async (req, res) =>{
    
    const search = req.body.search;
    const genre = req.body.genre;
    let movies = null;
    const regex = new RegExp(search);
    
    movies = await Movie.find({$and:[
        {genre: genre}, 
        {title: {$regex: regex}}
        
    ]}
    ).sort({likes: -1});   
     
    
    console.log(movies);
      
    res.json(movies);
}

export const getMovies = async (req, res) =>{
    try {
        const movies = await Movie.find().sort({likes: -1});
      
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}



export const addMovie = async (req, res) =>{
    const movie = req.body;

    if((movie.title === '') ||(movie.movieYear === '') || (movie.director === '') || (movie.genre === '') || (movie.runtime === '') || (movie.actors === '')){
        return res.status(404).send('Enter a valid informations!')
    }
    const newMovie = new Movie({...movie, creator: req.userId, createdAt: new Date().toISOString()});
    try {
       await newMovie.save();

       res.status(201).json(newMovie);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updateMovie = async ( req, res) => {
    const { id } = req.params;

    const movie = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No movie with that ID');

    
    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {new: true});

    res.json(updatedMovie);
}

export const deleteMovie = async ( req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No movie with that ID');

    await Movie.findByIdAndRemove(id);

    res.json({message:'Movie deleted successfully'});
}

export const likeMovie = async ( req, res ) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No movie with that ID');

    const movie = await Movie.findById(id);

    const index =movie.likes.findIndex((id) => id===String(req.userId));

    if(index === -1){
        movie.likes.push(req.userId);
    } else {
        movie.likes = movie.likes.filter((id) => id !== String(req.userId));
    }
    // const idOfUser =movie.likes.find((id) => id===String(req.userId));

    // if(!idOfUser){
    //     movie.likes.push(req.userId);
    // } else {
    //     movie.likes = movie.likes.filter((id) => id !== String(req.userId));
    // }



    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});

    res.json(updatedMovie);

}


export const recommend = async (req, res) =>{
  
    const userID = req.body.id;
    try {
  
        const genreCount = await Movie.aggregate([
            {$match: {likes: userID}},
            {$group: {_id: "$genre", couting: {$sum: 1}}},
        ]).sort({couting: -1});
        
        
        var mostLikesGenres = [];

        genreCount.map((genre) =>{   
            mostLikesGenres.push(genre._id);
        });
        let mostLiked = mostLikesGenres[0];
        let secondMostLiked = mostLikesGenres[1];

        const movies = await Movie.find({$and: [
            {likes: {$nin: userID}, genre: {$in : [mostLiked, secondMostLiked]}},{movieYear: {$gte: 2009}}]},
            
        ).limit(10);
        var allMovies = [];
        movies.map((movie) =>{   
            allMovies.push(movie);
        });
        
        if(movies.length != 10){
            let count = 10-allMovies.length;
            const newMovies = await Movie.find({$and: [
                {likes: {$nin: userID}},
                {genre: {$nin: [mostLiked, secondMostLiked]}},
                {movieYear: {$gte: 2009}}
            ]}).sort({likes: -1}).limit(count);
        
            newMovies.map((newMovie) =>{   
                allMovies.push(newMovie);
            });
        };
        
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}