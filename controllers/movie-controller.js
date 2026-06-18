const axios = require('axios');

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

const tmdbHeaders = {
    headers: {
        Authporization: `Bearer ${TMDB_TOKEN}`
    }
};

const getTrending = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, tmdbHeaders);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

const getSimilarMovies = async (req, res) => {
    try {
        const { movieId } = req.params;
        const response = await axios.get(
            `${TMDB_BASE_URL}/movie/${id}/similar`,
            tmdbHeaders
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
}

const searchMovies = async (req, res) => {
    try {
        const {query} = req.query;
        const response = await axios.get(
            `${TMDB_BASE_URL}/search/mpvie?query=${query}`,
            tmdbHeaders
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'}
        )
    }
}

module.exports = {getTrending, getSimilarMovies, searchMovies}

