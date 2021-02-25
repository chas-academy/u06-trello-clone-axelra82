const makeSortable = () => {
	$(".sort-task, .sort-list").sortable({
		connectWith: ".sort-connect",
		placeholder: "ui-state-highlight",
		tolerance: "pointer",
		start: (e, ui) => {
			ui.item.data('taskIndex', ui.item.index());
		},
		stop: (e, ui) => {
			const lists = store.lists();
			// Sources
			const sourceListId = e.target.parentNode.dataset.id;
			const sourceTaskIndex = ui.item.data('taskIndex');

			// Targets
			const targetListId = $(e.toElement).parents('.list').attr('data-id');
			const targetTaskIndex = ui.item.index();

			// Task
			const taskObject = lists.find(list => list.id == sourceListId).tasks[
				sourceTaskIndex];

			// Mutable Lists
			const sourceList = lists.find(list => list.id == sourceListId);
			const targetList = lists.find(list => list.id == targetListId);

			// Detect changes
			const listDetect = sourceListId !== targetListId;
			const taskDetect = sourceTaskIndex !== targetTaskIndex;

			if (listDetect || taskDetect) {
				// Change detected
				// Mutate lists
				sourceList.tasks.splice(sourceTaskIndex, 1);
				targetList.tasks.splice(targetTaskIndex, 0, taskObject);

				store.set(lists);
			}
		},
	}).disableSelection();
	return;
}