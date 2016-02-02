import axios from 'axios';
import TextActions from '../actions/text';

const TextSource = {
    determineText: {
        remote(state) {
            // todo fetch and decicde based on /texts.json
            return new Promise((resolve, reject) => {
                resolve({text: 'the-adventures-of-sherlock-holmes', block: 2});
            });
        },
        success: TextActions.determineTextDone,
        error: TextActions.determineTextDone
    },
    fetchText: {
        remote(state) {
            return axios.get('/text/' + state.text + '/' + state.block);
        },
        success: TextActions.fetchTextDone,
        error: TextActions.fetchTextDone
    }
}

export default TextSource;