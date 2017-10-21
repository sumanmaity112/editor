import React from 'react'
import PropTypes from 'prop-types';

import AceEditor from 'react-ace';
import {saveContent} from "../services/configService";
import {getContentOf} from "../services/configService";
import {getModeByExt, getSupportedThemes} from "../services/configEditorHelperService";
import {map} from 'lodash';

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

    _createOptionList(options) {
        return map(options, (option, index) => {
            return <option value={option.toString()} key={index.toString()}> {option}</option>
        });
    };

    _discard() {
        let self = this;
        const {node} = this.props;
        if (node && node.type === 'file') {
            getContentOf(node.path).then((content) => {
                self.setState({value: content});
            });
        }
    }

    constructor(props) {
        super(props);
        this.themes = getSupportedThemes();
        this.state = {
            value: props.value,
            theme: this.themes[0],
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
        this._discard = this._discard.bind(this);
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
            <div className='row editor-actions-container'>
                <div className='col-md-4 float-left'>
                    <label htmlFor="theme-list"> Theme &nbsp;&nbsp; </label>
                    <select id='theme-list' onChange={this.setTheme}>
                        {this._createOptionList(this.themes)}
                    </select>
                </div>
                <div className='col-md-4 float-right'>
                    <label htmlFor="font-size"> Font Size &nbsp;&nbsp;</label>
                    <input type="number" onChange={this.setFontSize} id='font-size' defaultValue='14' min='10'/>
                </div>
            </div>

            <AceEditor
                mode={this.state.mode}
                theme={this.state.theme}
                name="editor"
                width='100%'
                height={`${window.screen.height * .7}px`}
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
            <div className='editor-actions-container'>
                <button type="button" className="col-md-4 float-left btn btn-danger" onClick={this._discard}>Discard</button>
                <button type="button" className="col-md-4 float-right btn btn-success" onClick={this._save}>Save</button>
            </div>
        </div>
    }
}

Editor.propTypes = {
    value: PropTypes.string,
    node: PropTypes.object
};
