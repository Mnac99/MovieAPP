import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../dataFetch.js';
import {useNavigate} from 'react-router-dom';
import{logout} from '../redux/authSlice.js'
import { Row, Col, Card, Typography, Spin, message,Button } from 'antd';
import {useDispatch} from "react-redux";


const { Title, Paragraph } = Typography;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

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
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    backgroundImage: 'url(https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textShadow: '1px 1px 5px rgba(0,0,0,0.7)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                <Button
                    type="default"
                    danger
                    onClick={handleLogout}
                    style={{ position: 'absolute', top: 20, right: 20 }}
                >
                    Logout
                </Button>
                Welcome to Movie World 🎬
            </div>


            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                    type="primary"
                    size="large"
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate('/movies')}
                >
                    Go to Movie Search 🎬
                </Button>

                <Button
                    type="dashed"
                    size="large"
                    onClick={() => navigate('/favorites')}
                >
                    See Favorites ❤️
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
