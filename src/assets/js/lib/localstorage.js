const LS_KEY = 'typer';

const serialize = (text, block, offset) => {
    return text + ':' + block + ':' + offset;
}

const unserialize = (str) => {
    const obj = str.split(':');
    return {
        text: obj[0],
        block: obj[1],
        offset: obj[2]
    };
}

class LocalStorage {
    get() {
        if (window.localStorage) {
            const str = window.localStorage.getItem(LS_KEY);
            if (str) {
                return unserialize(str);
            }
        }
        return null;
    }
    set(text, block, offset) {
        if (window.localStorage) {
            window.localStorage.setItem(LS_KEY, serialize(text, block, offset));
        }
    }
};

export default new LocalStorage;