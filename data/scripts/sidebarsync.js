/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

// This object provides a way to listen to changes in other sidebars
// See the sidebarSync function in lib/sidebarsync.js
define(function () {
    const sidebarSync = {
        _listeners: {},
        on: (type, listener) => {
            sidebarSync.listening = true;
            sidebarSync._listeners[type] = listener;
        },
        _handler: (type, ...args) => {
            var listener = sidebarSync._listeners[type];

            if (typeof listener === 'function')
                listener.apply(null, args);
        },
        emit: (...args) =>
            addon.port.emit.apply(addon.port, ['sidebar-sync'].concat(args)),
        off: type => delete sidebarSync._listeners[type]
    };

    // sidebarSync state setter and getter definition
    Object.defineProperty(sidebarSync, 'listening', {
        get: boolean => sidebarSync._listening,
        set: enabled => {
            if (enabled && !sidebarSync._listening) {
                sidebarSync._listening = true;
                addon.port.on('sidebar-sync', sidebarSync._handler);
            }
            else if (!enabled && sidebarSync._listening)
                addon.port.off('sidebar-sync');
        }
    });
    return sidebarSync;
});