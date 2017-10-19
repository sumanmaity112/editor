import React from 'react'
import PropTypes from 'prop-types';

import AceEditor from 'react-ace';
import {saveContent} from "../services/configService";
import {getModeByExt} from "../services/configEditorHelperService";

require('brace/ext/language_tools');

//Available themes. To add new theme require it below
require('brace/theme/monokai');
require('brace/theme/github');

//Available modes. To add new mode require it below
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/sh');
require('brace/mode/plain_text');
require('brace/mode/sql');


export default class Editor extends AceEditor {
    onLoad() {

    }

    onChange(newValue) {
        const value = newValue && newValue.lines ? newValue.lines.join('\n') : newValue;
        this.setState({value})
    }

    onSelectionChange(newValue, event) {

    }

    onValidate(annotations) {

    }

    setTheme(e) {
        this.setState({
            theme: e.target.value
        })
    }

    setMode(mode) {
        this.setState({mode});
    }

    setBoolean(name, value) {
        this.setState({
            [name]: value
        })
    }

    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10)
        })
    }

    _save() {
        saveContent(this.props.node.path, this.state.value);
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            theme: 'github',
            mode: 'json',
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            fontSize: 14,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: false,
            showLineNumbers: true,
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
        this._save = this._save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }
        const {node} = nextProps;
        if (node && node.type === 'file') {
            this.setMode(getModeByExt(node.extension));
        }
    }

    render() {
        return <div>
            <AceEditor
                mode={this.state.mode}
                theme={this.state.theme}
                name="editor"
                width='90%'
                height={`${window.screen.height * .8}px`}
                className="edit-area"
                onLoad={this.onLoad}
                onChange={this.onChange}
                onSelectionChange={this.onSelectionChange}
                onValidate={this.onValidate}
                value={this.state.value}
                fontSize={this.state.fontSize}
                showPrintMargin={this.state.showPrintMargin}
                showGutter={this.state.showGutter}
                highlightActiveLine={this.state.highlightActiveLine}
                setOptions={{
                    enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                    enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                    enableSnippets: this.state.enableSnippets,
                    showLineNumbers: this.state.showLineNumbers,
                    tabSize: 2,
                }}/>
            <input type='button' value='save' onClick={this._save}/>
        </div>
    }
}

Editor.propTypes = {
    value: PropTypes.string,
    node: PropTypes.object
};
