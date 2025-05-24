import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../dataFetch.js';
import {useNavigate} from 'react-router-dom';
import { Row, Col, Card, Typography, Spin, message,Button } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPopularMovies()
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                message.error('Failed to load popular movies.');
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '30px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Welcome to the Movie App 🎬</Title>
            <Paragraph style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
                Discover popular films from the current year. This app lets you browse, search, and favorite your most loved movies. Built with React, Redux, and The Movie Database API.
            </Paragraph>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary" size="large" onClick={() => navigate('/movies')}>
                    Go to Movie Search 🎬
                </Button>
            </div>

            <Title level={3} style={{ marginTop: '40px' }}>🔥 Popular Movies</Title>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {movies.map((movie) => (
                        <Col key={movie.id} xs={12} sm={8} md={6} lg={4}>
                            <Card
                                hoverable
                                onClick={()=>navigate(`/movies/${movie.id}`)}
                                cover={
                                    <img
                                        alt={movie.title}
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Card.Meta title={movie.title} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Home;
