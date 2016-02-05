import alt from '../alt';
import EditorActions from '../actions/editor';
import TextActions from '../actions/text';
import TextSource from '../sources/text';
import renderer from '../wysiwyg/renderer';
import ls from '../lib/localstorage';

const LINE_HEIGHT = 55;

class EditorStore {
    constructor() {
        this.state = {
            html: '',
            active: false,
            top: 0,
            offset: 0,
            text: '',
            block: 0,
            textContent: [],
            reset: false
        };

        this.bindActions(EditorActions);
        this.bindActions(TextActions);
        
        this.registerAsync(TextSource);
    }

    initText() {
        this.getInstance().fetchText();
    }

    fetchTextDone(data) {
        this.state.text = data.text;
        this.state.block = data.block;
        this.state.offset = data.offset;
        this.state.textContent = data.content.split('\n');

        ls.set(this.state.text, this.state.block, this.state.offset);

        this.setTop();

        // compensate for current offset by setting the text from textContent
        // to be the html that we already "typed"
        if (this.state.offset > 0) {
            this.state.html = renderer.prerender(this.state.textContent, this.state.offset)
        }
    }

    keyDown(e) {
        const data = renderer.keyDown(this.state.html, e);
        let set = false;

        if (data.addedEnter) {
            this.state.offset++;
            set = true;
        }

        if (data.removedEnter) {
            this.state.offset--;
            set = true;
        }

        this.setTop();
        this.state.html = data.html;

        if (set) {
            ls.set(this.state.text, this.state.block, this.state.offset);
        }
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

    setTop() {
        this.state.top = this.state.offset * LINE_HEIGHT * -1;
    }
}

export default alt.createStore(EditorStore, 'EditorStore');