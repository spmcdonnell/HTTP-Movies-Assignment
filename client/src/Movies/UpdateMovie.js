import React from 'react';
import axios from 'axios';

class UpdateMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: { id: '', title: '', director: '', metascore: '', stars: [] },
            star1: '',
            star2: '',
            star3: ''
        };
    }

    componentDidMount() {
        this.fetchMovie(this.props.match.params.id);
    }

    fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                this.setState({ movie: res.data, star1: res.data.stars[0], star2: res.data.stars[1], star3: res.data.stars[2] });
            })
            .catch(err => console.log(err.response));
    };

    handleChange = e => {
        const name = e.target.name;
        if (name === 'title' || name === 'director' || name === 'metascore') {
            this.setState({ movie: { ...this.state.movie, [name]: e.target.value } });
        } else if (name === 'star1') {
            this.setState({ star1: e.target.value });
        } else if (name === 'star2') {
            this.setState({ star2: e.target.value });
        } else {
            this.setState({ star3: e.target.value });
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const putObj = {
            id: Number(this.props.match.params.id),
            title: this.state.movie.title,
            director: this.state.movie.director,
            metascore: this.state.movie.metascore,
            stars: [this.state.star1, this.state.star2, this.state.star3]
        };

        axios
            .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, putObj)
            .then(res => {
                console.log(res);
                console.log(this.props.movies);
                const updatedMovies = this.props.movies.filter(item => item.id !== Number(this.props.match.params.id));
                updatedMovies.push(res.data);
                updatedMovies.sort(function(a, b) {
                    return parseFloat(a.id) - parseFloat(b.id);
                });
                console.log(updatedMovies);
                this.props.setMovies(updatedMovies);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    render() {
        return (
            <div className="update-form">
                <h2>Update Movie Info Below</h2>
                <form onSubmit={this.onSubmit}>
                    <label>
                        <span>Title:</span>
                        <input type="text" placeholder="Title" name="title" value={this.state.movie.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Director:</span>
                        <input type="text" placeholder="Director" name="director" value={this.state.movie.director} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Metascore:</span>
                        <input type="number" placeholder="Metascore" name="metascore" min="1" max="100" value={this.state.movie.metascore} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Star 1:</span>
                        <input type="text" placeholder="Star 1" name="star1" value={this.state.star1} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Star 2:</span>
                        <input type="text" placeholder="Star 2" name="star2" value={this.state.star2} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Star 3</span>
                        <input type="text" placeholder="Star 3" name="star3" value={this.state.star3} onChange={this.handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default UpdateMovie;
