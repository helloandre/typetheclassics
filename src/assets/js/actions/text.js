import alt from '../alt';

class TextActions {
    constructor() {
        this.generateActions('initText', 'refreshText', 'fetchTextDone', 'determineTextDone');
    }
}

export default alt.createActions(TextActions);