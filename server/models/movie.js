import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: String,
    movieYear: Number,
    director: String,
    genre: String,
    creator: String,
    runtime: Number,
    actors: [String],
    likes: {
        type: [String],
        default: []
    },
    
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;