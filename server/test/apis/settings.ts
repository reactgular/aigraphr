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
import {assertEntity} from '../generator/assert-entity';
import {assertObject} from '../generator/assert-object';

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
            const objects = assertObject<
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
            const objects = assertObject<
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
            const objects = assertObject<
                SettingsUpdateResponses[200],
                ReturnType<typeof settingsUpdate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200};
    }

    return {get, replace, update};
}
