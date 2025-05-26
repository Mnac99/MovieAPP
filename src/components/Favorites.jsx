import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button, message } from 'antd';
import {useNavigate, } from 'react-router-dom';
const { Title } = Typography;

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const storageKey = `favorites_${user?.email}`;
    const navigate = useNavigate();
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
        setFavorites(stored);
    }, [storageKey]);

    const removeFromFavorites = (id) => {
        const updated = favorites.filter(movie => movie.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setFavorites(updated);
        message.success('Removed from favorites.');
    };

    return (
        <div style={{ padding: 30 }}>
            <Title level={2}>🎬 Your Favorite Movies</Title>

            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <Row gutter={[16, 16]}>
                    {favorites.map((movie) => (
                        <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                hoverable
                                cover={
                                    <img
                                        alt={movie.title}
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                                : 'https://via.placeholder.com/300x450?text=No+Image'
                                        }
                                        style={{ height: 300, objectFit: 'cover' }}
                                    />
                                }
                                actions={[
                                    <Button danger onClick={(e) => {
                                        e.stopPropagation(); // prevent card click
                                        removeFromFavorites(movie.id);
                                    }}>
                                        Remove
                                    </Button>
                                ]}
                            >
                                <Card.Meta title={movie.title} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            <Button type={"dashed"} onClick={() => {navigate('/home')}}>Home</Button>
        </div>
    );
};

export default Favorites;
