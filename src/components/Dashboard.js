import React from 'react';
import Tree from './Tree';
import {getTree} from "../services/configService";
import Spinner from './Spinner';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
        this.setState = this.setState.bind(this);
        this.data = {};
    }

    componentDidMount() {
        getTree().then(data => {
            this.data = JSON.parse(data);
            this.setState({loading: false});
        }).catch((err) => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <div>
                <Spinner show={this.state.loading}/>
                <Tree data={this.data}/>
            </div>
        );
    }
}

export default Dashboard;