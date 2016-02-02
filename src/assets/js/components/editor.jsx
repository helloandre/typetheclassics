import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import EditorStore from '../stores/editor';
import EditorActions from '../actions/editor';
import Classnames from 'classnames';
import renderer from '../wysiwyg/renderer';

class Editor extends Component {
    static getStores() {
        return [EditorStore];
    }

    static getPropsFromStores() {
        return EditorStore.getState();
    }

    onKeyDown(e) {
        EditorActions.keyDown(e);
    }

    onKeyPress(e) {
        EditorActions.keyPress(e);
    }

    onFocus() {
        EditorActions.focus();
    }

    onBlur() {
        EditorActions.blur();
    }

    render() {
        // only add the cursor on render
        const html = this.props.html + renderer.cursor();
        const style = {
            top: this.props.top
        };

        return (
            <div
                id="editor"
                className={Classnames({ active: this.props.active })}
            >
                <input 
                    id="editor-input"
                    onKeyPress={this.onKeyPress}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
                <div 
                    id="editor-display"
                    dangerouslySetInnerHTML={{__html: html}}
                    style={ style }
                >
                </div>
            </div>
        );
    }
}

export default connectToStores(Editor);