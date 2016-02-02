import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import EditorStore from '../stores/editor';

class Text extends Component {
    static getStores() {
        return [EditorStore];
    }

    static getPropsFromStores() {
        return EditorStore.getState();
    }

    render() {
        const style = {
            top: this.props.top
        };

        return (
            <div id="text">
                <div 
                    id="text-display"
                    style={ style }
                >
                    {this.props.textContent.map((line, idx) => {
                        return (<div className="display-line" key={idx}>{line}</div>);
                    })}
                </div>
            </div>
        );
    }
}

export default connectToStores(Text);