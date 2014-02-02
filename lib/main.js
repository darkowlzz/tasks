const data = require("sdk/self").data;
const sidebar = require("sdk/ui/sidebar");

let sbar = sidebar.Sidebar({
  id: 'tasks',
  title: 'Tasks',
  url: data.url("sidebar.html")
});

sbar.show();
