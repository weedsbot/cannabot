import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Redirect, Link, BrowserRouter } from 'react-router-dom';

class WeedsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {username: props.username, campus: props.campus, course: props.course, image: ''};
        this.service = new AuthService();
    }

    render() {
        return(
            <div>
                <h2>Weeds Catalog</h2>
            </div>
        )
    }

}

export default WeedsGrid;