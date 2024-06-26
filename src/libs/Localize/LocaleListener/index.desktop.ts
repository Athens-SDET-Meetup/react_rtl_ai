import ELECTRON_EVENTS from '../../../../desktop/ELECTRON_EVENTS';
import BaseLocaleListener from './BaseLocaleListener';
import type {LocaleListener, LocaleListenerConnect} from './types';

const localeListenerConnect: LocaleListenerConnect = (callbackAfterChange = () => {}) =>
    BaseLocaleListener.connect((val) => {
        // Send the updated locale to the Electron main process
        window.electron.send(ELECTRON_EVENTS.LOCALE_UPDATED, val);

        // Then execute the callback provided for the renderer process
        callbackAfterChange(val);
    });

const localeListener: LocaleListener = {
    connect: localeListenerConnect,
};

export default localeListener;
