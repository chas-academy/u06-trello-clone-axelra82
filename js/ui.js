const makeSortable = () => {
	$(".sort-task, .sort-list").sortable({
		tolerance: "pointer",
		connectWith: ".sort-connect",
		placeholder: "ui-state-highlight",
	});

	//Lists
	$(".sort-list").sortable({
		start: (e, ui) => {
			ui.item.data('listIndex', ui.item.index());
		},
		stop: (e, ui) => {
			// Source
			const sourceListId = ui.item.data('listIndex');
			
			// Target
			const targetListId = getTargetListId(e);
			
			// Detect changes
			if (targetListId !== sourceListId) {
				const lists = store.lists();

				// List
				const listObject = lists[sourceListId];

				// Change detected
				// Mutate lists
				lists.splice(sourceListId, 1);
				lists.splice(targetListId, 0, listObject);

				store.set(lists);
			}
		},
	}).disableSelection();

	// Tasks
	$(".sort-task").sortable({
		start: (e, ui) => {
			ui.item.data('taskIndex', ui.item.index());
		},
		stop: (e, ui) => {
			// Sources
			const sourceListId = e.target.closest('.list').id.split('-')[2];
			const sourceTaskIndex = ui.item.data('taskIndex');

			// Targets
			const targetListId = getTargetListId(e);
			const targetTaskIndex = ui.item.index();

			// Detect changes
			const listDetect = sourceListId !== targetListId;
			const taskDetect = sourceTaskIndex !== targetTaskIndex;

			if (listDetect || taskDetect) {
				const lists = store.lists();

				// Task
				const taskObject = lists[sourceListId].tasks[sourceTaskIndex];

				// Change detected
				// Mutate lists
				lists[sourceListId].tasks.splice(sourceTaskIndex, 1);
				lists[targetListId].tasks.splice(targetTaskIndex, 0, taskObject);

				store.set(lists);
			}
		},
	}).disableSelection();

	taskDialog();
	return;
}

const taskDialog = () => {
	$(".task-content").dialog({
		autoOpen: false,
		draggable: false,
		modal: true,
		buttons: {
			close: function() {
				$(this).dialog("close");
			},
			archive: function() {
				archiveTask(this);
			},
			delete: function() {
				deleteTask(this);
			}
		},
		hide: {
			effect: "clip",
			duration: 350
		}
	});
}

const ids = (data) => {
	const list = data.split('-')[1];
	const task = data.split('-')[3];

	return {
		list,
		task
	}
}

const getTargetListId = e => {
	const targetList = e.toElement.closest('.list');
	return Array.from(targetList.closest('ul').children).indexOf(targetList);
}