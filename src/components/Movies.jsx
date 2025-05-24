import React, { useState } from 'react';
import { Input, Row, Col, Card, Spin, message } from 'antd';
import { searchMovies } from '../dataFetch';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const Movies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (value) => {
        setLoading(true);
        try {
            const movies = await searchMovies(value);
            setResults(movies);
        } catch (err) {
            console.error(err);
            message.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <Search
                placeholder="Search movies..."
                enterButton="Search"
                size="large"
                value={searchTerm}
                onSearch={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: 500, margin: '0 auto 30px', display: 'block' }}
            />

            {loading ? (
                <div style={{ textAlign: 'center', padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {results.map((movie) => (
                        <Col key={movie.id} xs={12} sm={8} md={6} lg={4}>
                            <Card
                                hoverable
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                cover={
                                    <img
                                        alt={movie.title}
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                                : 'https://via.placeholder.com/300x450?text=No+Image'
                                        }
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

export default Movies;
