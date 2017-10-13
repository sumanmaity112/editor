import React from 'react'
import PropTypes from 'prop-types';
import {getContentOf} from "../services/configService";


let styles = {
    whiteSpace: 'pre-wrap',
    padding: '20px'
};

export default class NodeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.node && this.props.node.type === 'file') {
            getContentOf(this.props.node.path).then((content) => {
                this.setState({data: content})
            });
        }
        return <pre style={styles}> {this.state.data}</pre>;
    }
}

NodeViewer.propTypes = {
    node: PropTypes.object
};
