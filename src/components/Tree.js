import React from 'react'
import {Treebeard} from "react-treebeard";
import Editor from './Editor'
import defaultTreeStyle from '../themes/default'
import {getContentOf} from "../services/configService";
import ConfigEditorHeader from "./ConfigEditorHeader.jsx"

class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        let self = this;
        if (node && node.type === 'file') {
            getContentOf(node.path).then((content) => {
                self.setState({cursor: node, content});
            });
        }
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    render() {
        return (
            <div>
                <ConfigEditorHeader/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Treebeard data={this.props.data} onToggle={this.onToggle} style={defaultTreeStyle}/>
                        </div>
                        <div className='col-md-9'>
                            <Editor value={this.state.content} node={this.state.cursor}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tree;