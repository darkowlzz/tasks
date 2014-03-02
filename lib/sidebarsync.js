/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const { Class } = require('sdk/core/heritage');
const { Sidebar } = require('sdk/ui/sidebar');

// Used to listen for changes amongst sidebars given an ID.
const sidebarArray = [];
const sidebarSync = (worker) => {
    let workerIndex = sidebarArray.indexOf(worker);
    if (!~workerIndex) {
        worker.port.on('sidebar-sync', (...args) => {
            workerIndex = sidebarArray.indexOf(worker);
            sidebarArray.forEach((worker, index) => {
                if (workerIndex !== index)
                    worker.port.emit.apply(worker.port, ['sidebar-sync'].concat(args));
            });
        });
        sidebarArray.push(worker);
    }
    else sidebarArray.splice(workerIndex, 1);
};

const SidebarEx = Class({
    extends: Sidebar,
    initialize: function initialize(options) {
        const onAttach = options.onAttach;
        options.onAttach = function (worker) {
            sidebarSync(worker);
            if (typeof onAttach === 'function')
                onAttach.call(this, worker);
        };
        const onDetach = options.onDetach;
        options.onDetach = function (worker) {
            sidebarSync(worker);
            if (typeof onDetach === 'function')
                onDetach.call(this, worker);
        };
        Sidebar.prototype.initialize.call(this, options);
    }
});

exports.Sidebar = SidebarEx;