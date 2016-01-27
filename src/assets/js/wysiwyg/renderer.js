// meta keys from e.keyCode
const ENTER = 13;
const BACKSPACE = 8;
const IGNORE = 0;

const ENTER_HTML = '<br />';
const ENTER_LAST_CHAR = ENTER_HTML.substring(ENTER_HTML.length - 1, ENTER_HTML.length);

const CURSOR_HTML = '<span id="cursor"></span>';

/**
 * Are we dealing with the backspace key?
 */
const isBackspace = (code) => {
    return code === BACKSPACE;
}

/**
 * Are we deailing with the enter key?
 */
const isEnter = (code) => {
    return code === ENTER;
}

/**
 * Sometimes we need to ignore special keys on keyPress
 */
const ignore = (code) => {
    return code === ENTER;
}

/**
 * Remove either the exactly last character, or the last enter html
 */
const removeLast = (current) => {
    const length = current.length;
    const last = current.substring(length - 1, length);

    // if the last character was an enter, we need to remove the markup for that
    if (last == ENTER_LAST_CHAR) {
        return current.substring(0, length - ENTER_HTML.length);
    }

    return current.substring(0, length - 1);
}

/**
 * we have to handle both events here because
 * we get different information from them both
 */
class Renderer {
    /**
     * Keypress events don't reliable happen for most meta/backspace/enter keys
     * so we need to handle those kinds of events from here
     *
     * we only want to use this event if it meets certain requirements
     */
    keyUp(current, e) {
        if (isBackspace(e.keyCode)) {
            return removeLast(current);
        }

        if (isEnter(e.keyCode)) {
            return current + ENTER_HTML;
        }

        return current;
    }

    /**
     * Most "regular" key events happen here, and we can use the e.key directly
     * basically if this fires, we want to use it's data
     */
    keyPress(current, e) {
        if (ignore(e.which)) {
            return current;
        }
        console.log('key', e.key);

        return current + e.key;
    }

    cursor() {
        return CURSOR_HTML;
    }
}

export default new Renderer;