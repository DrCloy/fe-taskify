import Model from "../model.js";

import TaskView from "../view/taskView.js";

function getCurrentDevice() {
  return navigator.userAgentData.mobile ? "mobile" : "web";
}

export default function TaskController(model = new Model(), rootElement = document.getElementById("root")) {
  let tasks = [];

  let ghostTaskView = TaskView({
    task: { id: 0, columnId: 0, title: "", description: "", createdAt: 0 },
    state: "default",
    onFirstButtonClicked: () => {},
    onSecondButtonClicked: () => {},
  });
  ghostTaskView.classList.add("task--ghost", "task--drag");
  rootElement.appendChild(ghostTaskView);

  window.addEventListener("mousemove", handleMoveGhostTask);
  window.addEventListener("mouseup", handleMoveGhostTask);
  window.addEventListener("mousedown", handleMoveGhostTask);
  window.addEventListener("mouseup", handleUnselectTask);

  let addingTaskView;

  model.addListener(onModelChanged);

  render();

  function handleTaskDeleteButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    model.removeTask(taskId);
  }

  function handleTaskEditButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    model.setEditingTaskId(taskId);
  }

  function handleTaskEditCancelButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    model.unsetEditingColumnTask();
  }

  function handleTaskEditSaveButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    const task = event.target.closest(".task");
    const name = task.querySelector(".task__content-title").value;
    const description = task.querySelector(".task__content-description").value;

    if (taskId === 0) {
      model.addTask(model.getCurrentState().editingColumnId, name, description, getCurrentDevice());
    } else {
      const originTask = model.getCurrentTaskData().find((t) => t.id === taskId);
      model.editTask(taskId, { ...originTask, name, description });
    }
  }

  function handleSelectTask(event) {
    event.stopPropagation();
    const state = model.getCurrentState();
    if (state.editingTaskId > 0) return;
    const taskId = +event.target.closest(".task").id;
    const ghostTaskView = rootElement.querySelector(".task--ghost");
    ghostTaskView.innerHTML = event.target.closest(".task").innerHTML;
    model.setMovingTaskId(taskId);
  }

  function handleUnselectTask(event) {
    event.stopPropagation();

    const state = model.getCurrentState();
    if (state.movingTaskId !== -1 && state.mouseOverColumnId !== -1) {
      model.moveTask(state.movingTaskId, state.mouseOverColumnId);
    }
  }

  function handleMoveGhostTask(event) {
    event.stopPropagation();
    event.preventDefault();

    const state = model.getCurrentState();
    const ghostTaskView = rootElement.querySelector(".task--ghost");
    if (state.movingTaskId !== -1) {
      ghostTaskView.style.top = event.clientY + "px";
      ghostTaskView.style.left = event.clientX + "px";
      ghostTaskView.style.opacity = 1;
    } else {
      ghostTaskView.style.opacity = 0;
    }
  }

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function render() {
    const columnViews = [...rootElement.querySelectorAll(".column")];
    let taskViews = [...rootElement.querySelectorAll(".task")];

    const tasksOnModel = model.getCurrentTaskData();
    const state = model.getCurrentState();

    // Sort tasksOnModel by createdAt with order state
    const orderState = state.order;
    if (orderState === "latest") {
      tasksOnModel.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      tasksOnModel.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    // Handle removed tasks
    const removedTasks = tasks.filter((task) => !tasksOnModel.some((t) => t.id === task.id));
    removedTasks.forEach((task) => {
      const taskView = taskViews.find((t) => +t.id === task.id);
      taskView.remove();
    });
    taskViews = taskViews.filter((taskView) => tasksOnModel.some((task) => task.id === +taskView.id));
    tasks = tasks.filter((task) => tasksOnModel.some((t) => t.id === task.id));

    // Handle added tasks
    const addedTasks = tasksOnModel.filter((task) => !taskViews.some((t) => +t.id === task.id));
    addedTasks.forEach((task) => {
      const newTaskView = TaskView({
        task: task,
        state: "default",
        onFirstButtonClicked: handleTaskDeleteButtonClicked,
        onSecondButtonClicked: handleTaskEditButtonClicked,
      });
      newTaskView.addEventListener("mousedown", handleSelectTask);
      taskViews.push(newTaskView);
      const columnView = columnViews.find((c) => +c.id === task.columnId);
      columnView.querySelector(".column__task-list").appendChild(newTaskView);
    });

    // Handle updated tasks
    tasksOnModel.forEach((task) => {
      const prevTask = tasks.find((t) => t.id === task.id);
      if (JSON.stringify(task) !== JSON.stringify(prevTask)) {
        const taskView = taskViews.find((t) => +t.id === task.id);
        const newTaskView = TaskView({
          task: task,
          state: "default",
          onFirstButtonClicked: handleTaskDeleteButtonClicked,
          onSecondButtonClicked: handleTaskEditButtonClicked,
        });
        newTaskView.addEventListener("mousedown", handleSelectTask);
        taskView.replaceWith(newTaskView);
        const columnView = columnViews.find((c) => +c.id === task.columnId);
        columnView.querySelector(".column__task-list").appendChild(newTaskView);
      }
    });

    // Change editing task with state.editingTaskId
    taskViews.map((taskView) => {
      if (+taskView.id === state.editingTaskId) {
        const newTaskView = TaskView({
          task: tasksOnModel.find((t) => t.id === state.editingTaskId),
          state: "editing",
          onFirstButtonClicked: handleTaskEditCancelButtonClicked,
          onSecondButtonClicked: handleTaskEditSaveButtonClicked,
        });
        taskView.replaceWith(newTaskView);
      } else if (taskView.classList.contains("task--edit")) {
        const newTaskView = TaskView({
          task: tasksOnModel.find((t) => t.id === +taskView.id),
          state: "default",
          onFirstButtonClicked: handleTaskDeleteButtonClicked,
          onSecondButtonClicked: handleTaskEditButtonClicked,
        });
        newTaskView.addEventListener("mousedown", handleSelectTask);
        taskView.replaceWith(newTaskView);
      }
    });

    // Create Adding TaskView when state.editingTask is 0 and state.addingColumn is not -1
    const isAddingTask = state.editingColumnId !== -1 && state.editingTaskId === 0;
    const addingColumnTaskList = columnViews.find((c) => +c.id === state.editingColumnId)?.querySelector(".column__task-list");
    if (addingTaskView && isAddingTask) {
      addingTaskView.remove();
      addingTaskView = TaskView({
        task: { id: 0, columnId: state.editingColumnId, name: "", description: "", createdAt: 0 },
        state: "editing",
        onFirstButtonClicked: handleTaskEditCancelButtonClicked,
        onSecondButtonClicked: handleTaskEditSaveButtonClicked,
      });
      addingTaskView.style.order = -1;
      addingColumnTaskList.appendChild(addingTaskView);
    } else if (isAddingTask) {
      addingTaskView = TaskView({
        task: { id: 0, columnId: state.editingColumnId, name: "", description: "", createdAt: 0 },
        state: "editing",
        onFirstButtonClicked: handleTaskEditCancelButtonClicked,
        onSecondButtonClicked: handleTaskEditSaveButtonClicked,
      });
      addingTaskView.style.order = -1;
      addingColumnTaskList.appendChild(addingTaskView);
    } else {
      addingTaskView?.remove();
      addingTaskView = null;
    }

    // Relocate tasks
    const tasksOnDOM = [...rootElement.querySelectorAll(".task")];

    const oldState = tasksOnDOM.map((task) => task.getBoundingClientRect());

    tasksOnModel.forEach((task, index) => {
      const taskView = tasksOnDOM.find((t) => +t.id === task.id);
      taskView.style.order = index;
    });

    const newState = tasksOnDOM.map((task) => task.getBoundingClientRect());

    tasksOnDOM.forEach((task, index) => {
      if (task.classList.contains("task--ghost")) return;
      if (task.classList.contains("task--edit")) {
        task.querySelector(".task__content-title").focus();
      }
      if (task.classList.contains("task--move") && state.movingTaskId !== +task.id) {
        task.classList.remove("task--move");
      }
      if (+task.id === state.movingTaskId) {
        task.classList.add("task--move");
        if (+task.closest(".column").id !== state.mouseOverColumnId) {
          const mouseOverColumn = columnViews.find((c) => +c.id === state.mouseOverColumnId);
          if (mouseOverColumn) {
            mouseOverColumn.querySelector(".column__task-list").appendChild(task);
          }
        }
      }

      const deltaX = oldState[index].left - newState[index].left;
      const deltaY = oldState[index].top - newState[index].top;
      task.animate(
        [
          { transformOrigin: "top left", transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transformOrigin: "top left", transform: "none" },
        ],
        {
          duration: 800,
          easing: "ease-in-out",
          fill: "both",
        }
      );
    });

    tasks = tasksOnModel;
    taskViews = tasksOnDOM;
  }

  return {
    destroy,
  };
}