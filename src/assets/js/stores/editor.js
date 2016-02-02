import alt from '../alt';
import EditorActions from '../actions/editor';
import TextActions from '../actions/text';
import TextSource from '../sources/text';
import renderer from '../wysiwyg/renderer';

const LINE_HEIGHT = 55;

class EditorStore {
    constructor() {
        this.state = {
            html: '',
            active: false,
            top: 0,
            text: '',
            block: 0,
            textContent: [],
        };

        this.bindActions(EditorActions);
        this.bindActions(TextActions);
        
        this.registerAsync(TextSource);
    }

    initText() {
        this.getInstance().determineText();
    }

    determineTextDone(data) {
        this.state.text = data.text;
        this.state.block = data.block;

        this.getInstance().fetchText();
    }

    fetchTextDone(text) {
        this.state.textContent = text.data.text.split('\n');
    }

    keyDown(e) {
        const data = renderer.keyDown(this.state.html, e);

        if (data.addedEnter) {
            this.state.top -= LINE_HEIGHT;
        }

        if (data.removedEnter) {
            this.state.top += LINE_HEIGHT;
        }

        this.state.html = data.html;
    }

    keyPress(e) {
        this.state.html = renderer.keyPress(this.state.html, e);
    }

    focus() {
        this.state.active = true;
    }

    blur() {
        this.state.active = false;
    }
}

export default alt.createStore(EditorStore, 'EditorStore');