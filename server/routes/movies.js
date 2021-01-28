import express from 'express';

import auth from '../middleware/auth.js';
import { getMovies, addMovie, updateMovie, deleteMovie, likeMovie, searchMovies, genreSearchMovies, genreOnlyMovies, recommend } from '../controllers/movies.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', auth, addMovie);
router.patch('/:id', auth, updateMovie);
router.delete('/:id', auth, deleteMovie);
router.patch('/:id/likeMovie', auth, likeMovie);
router.post('/search', searchMovies);
router.post('/genreSearch', genreSearchMovies);
router.post('/genre', genreOnlyMovies);
router.post('/recommend', recommend);

export default router;