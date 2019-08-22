import React from 'react';

class UpdateMovie extends React.Component {
    render() {
        return (
            <div className="update-form">
                <h2>Update Movie Info Below</h2>
                <form>
                    <label>
                        <span>Title:</span>
                        <input type="text" placeholder="Title" />
                    </label>
                    <label>
                        <span>Director:</span>
                        <input type="text" placeholder="Director" />
                    </label>
                    <label>
                        <span>Metascore:</span>
                        <input type="number" placeholder="Metascore" min="1" max="100" />
                    </label>
                    <label>
                        <span>Star 1:</span>
                        <input type="text" placeholder="Star 1" />
                    </label>
                    <label>
                        <span>Star 2:</span>
                        <input type="text" placeholder="Star 2" />
                    </label>
                    <label>
                        <span>Star 3</span>
                        <input type="text" placeholder="Star 3" />
                    </label>
                </form>
            </div>
        );
    }
}

export default UpdateMovie;
