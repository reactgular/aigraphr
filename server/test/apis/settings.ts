// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    settingsGet,
    settingsReplace,
    settingsUpdate
} from '@shared/api/sdk.gen';
import {
    SettingsGetData,
    SettingsGetResponses,
    SettingsReplaceData,
    SettingsReplaceResponses,
    SettingsUpdateData,
    SettingsUpdateResponses
} from '@shared/api/types.gen';
import {assertEntities} from '../generator/assert-entities';
import {assertObjects} from '../generator/assert-objects';

export function settings() {
    /**
     * /api/app/settings
     */
    function get() {
        const promise = settingsGet({});
        /**
         *
         */
        function is200() {
            const objects = assertObjects<
                SettingsGetResponses[200],
                ReturnType<typeof settingsGet>
            >(promise);
            return {...promise, ...objects};
        }

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
        function is200() {
            const objects = assertObjects<
                SettingsReplaceResponses[200],
                ReturnType<typeof settingsReplace>
            >(promise);
            return {...promise, ...objects};
        }

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
        function is200() {
            const objects = assertObjects<
                SettingsUpdateResponses[200],
                ReturnType<typeof settingsUpdate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200};
    }

    return {get, replace, update};
}
