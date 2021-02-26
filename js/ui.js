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
			const sourceListId = getSourceListId(e.target);
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
	return;
}

const getSourceListId = e => {
	const sourceList = e.closest('.list');
	return Array.from(sourceList.closest('ul').children).indexOf(sourceList);
}

const getTargetListId = e => {
	const targetList = e.toElement.closest('.list');
	return Array.from(targetList.closest('ul').children).indexOf(targetList);
}

// Something great happens here
// $(".task-dialog").dialog({});