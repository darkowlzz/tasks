const { data } = require('sdk/self');
const { Sidebar } = require('sdk/ui/sidebar');
const { Hotkey } = require('sdk/hotkeys');
const ss = require('sdk/simple-storage');

// Store Task items.
ss.storage.tasks = [];

let sbar = Sidebar({
  id: 'tasks',
  title: 'Tasks',
  url: data.url('sidebar.html'),
  onAttach: function (worker) {
    worker.port.on('push', (task) => {
      ss.storage.tasks.push(task);
    });
    worker.port.on('pop', (task) => {
      let index = ss.storage.tasks.indexOf(task);
      ss.storage.tasks.splice(index, 1);
    });
    worker.port.on('ready', () => {
      worker.port.emit('list', ss.storage.tasks);
    });
  }
});

sbar.show();
let visibility = true;

Hotkey({
  combo: 'alt-t',
  onPress: () => {
    if (visibility) {
      sbar.hide();
      visibility = false;
    }
    else {
      sbar.show();
      visibility = true;
    }
  }
});
