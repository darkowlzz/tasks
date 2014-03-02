require(['scripts/jquery-2.1.0.js', 'scripts/sidebarsync.js'], function (_, sidebarSync) {

    // Collect and create Task items.
    addon.port.on("list", (list) => {
      list.forEach((task) => Item(task));
    });

    sidebarSync.on('pop', name => document.getElementById(name).remove());
    sidebarSync.on('push', name => Item(name));

    // Create a task item.
    function Item(name) {
      var taskItem = document.createElement("div");
      taskItem.className = "taskItem";
        taskItem.id = name;

        var title = document.createElement("span");
      title.className = "title";
      title.textContent = name;
      taskItem.appendChild(title);

      var del = document.createElement("span");
      del.className = "del";
      del.textContent = "x";
      taskItem.appendChild(del);

      del.onclick = function() {
        addon.port.emit("pop", name);
          sidebarSync.emit("pop", name);
          taskItem.remove();
      };

        $("#task-container").append(taskItem);
    }

    // Push task into the container.
    $("#push-task").click(function(){
      var taskName = $("#new-task");

      if (taskName.val() != "") {
        Item(taskName.val());
        // Push task in simple-storage.
        addon.port.emit("push", taskName.val());
          sidebarSync.emit("push", taskName.val());

          $("#new-task").val("");
      }
      // Scroll to bottom.
      $("html, body").animate({ scrollTop: $(document).height() }, 300);
    });

    // Submit task when pressed enter.
    $("#new-task").keyup(function(event) {
      if (event.keyCode == 13) {
        $("#push-task").click();
      }
    });

    // Task pop
    $("#pop-task").click(function(){
      var fRadio = $("#fifo-radio");
      var lRadio = $("#lifo-radio");
        fRadio.click(event => sidebarSync.emit('fifo'));
        lRadio.click(event => sidebarSync.emit('lifo'));
        // FIFO pop
      if (fRadio.is(":checked")) {
        if ($("#task-container").children().length > 0) {
          var removeTask = $("#task-container").children()[0];
          // Remove from simple-storage.
            addon.port.emit("pop", removeTask.firstChild.textContent);
            sidebarSync.emit("pop", removeTask.firstChild.textContent);
            removeTask.remove();
          // Scroll up.
          $("html, body").animate({ scrollTop: 0 }, 300);
        }
      }
      // LIFO pop
      else if (lRadio.is(":checked")) {
        if ($("#task-container").children().length > 0) {
          var container = $("#task-container");
          var length = container.children().length;
          var removeTask = container.children()[length-1];
          addon.port.emit("pop", removeTask.firstChild.textContent);
            sidebarSync.emit("pop", removeTask.firstChild.textContent);
            removeTask.remove();
          // Scroll down.
          $("html, body").animate({ scrollTop: $(document).height() }, 300);
        }
      }
    });

    // Emit `ready` to let add-on script know that we are ready!
    addon.port.emit("ready");
});