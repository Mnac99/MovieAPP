import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Typography, Spin, Button, message } from 'antd';
import { fetchMovieById } from '../dataFetch';

const { Title, Paragraph } = Typography;

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchMovieById(id)
            .then(data => {
                setMovie(data);
                checkFavorite(data.id);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                message.error('Failed to load movie details.');
                setLoading(false);
            });
    }, [id]);

    const checkFavorite = (movieId) => {
        const favs = JSON.parse(localStorage.getItem(`favorites_${user?.email}`)) || [];
        const isFav = favs.some(f => f.id === movieId);
        setIsFavorite(isFav);
    };

    const toggleFavorite = () => {
        const key = `favorites_${user?.email}`;
        const favs = JSON.parse(localStorage.getItem(key)) || [];

        if (isFavorite) {
            const updated = favs.filter(f => f.id !== movie.id);
            localStorage.setItem(key, JSON.stringify(updated));
            setIsFavorite(false);
            message.success('Removed from favorites.');
        } else {
            favs.push(movie);
            localStorage.setItem(key, JSON.stringify(favs));
            setIsFavorite(true);
            message.success('Added to favorites.');
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '30px' }}>
            <Card
                cover={
                    <img
                        alt={movie.title}
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'}
                    />
                }
            >
                <Title level={2}>{movie.title}</Title>
                <Paragraph><strong>Release Date:</strong> {movie.release_date}</Paragraph>
                <Paragraph><strong>Rating:</strong> {movie.vote_average} / 10</Paragraph>
                <Paragraph><strong>Overview:</strong> {movie.overview}</Paragraph>
                <Button type={isFavorite ? 'default' : 'primary'} onClick={toggleFavorite}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </Card>
            <Button type="primary" size="large" onClick={() => navigate('/Home')}>Home</Button>
        </div>
    );
};

export default MovieDetails;
