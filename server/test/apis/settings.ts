// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    settingsGet,
    settingsReplace,
    settingsUpdate
} from '@shared/api/sdk.gen';
import {
    SettingsGetData,
    SettingsReplaceData,
    SettingsUpdateData
} from '@shared/api/types.gen';

export function settings() {
    /**
     * /api/app/settings
     */
    function get() {
        const promise = settingsGet({});
        /**
         *
         */
        function is200() {}

        return {...promise, is200};
    }

    /**
     * /api/app/settings
     */
    function replace(body: SettingsReplaceData['body']) {
        const promise = settingsReplace({body});
        /**
         *
         */
        function is200() {}

        return {...promise, is200};
    }

    /**
     * /api/app/settings
     */
    function update(body: SettingsUpdateData['body']) {
        const promise = settingsUpdate({body});
        /**
         *
         */
        function is200() {}

        return {...promise, is200};
    }

    return {get, replace, update};
}
