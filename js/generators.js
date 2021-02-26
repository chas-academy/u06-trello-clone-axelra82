/*******************************
Generators
*******************************/
const colorPaletts = (current) => {
	const palettes = $('<ul>').addClass('color-palettes');
	
	for(const color of taskColors){
		const listItem = $('<li>').addClass('color-palette');
		const palette = $('<div>').addClass(color);
		
		if(color === current){
			palette.addClass('current');
		}

		listItem.append(palette);
		palettes.append(listItem);
	}

	return palettes;
}

const renderTask = (task) => {
	const taskItem = $('<li>').addClass(`task ${task.color}`).attr('data-id', task.id);
	const taskTitle = $('<h3>').addClass('task-title').text(task.title);
	const taskDialog = $('<div>').addClass('task-dialog');
	const taskDescription = $('<p>').text(task.description);
	const taskDate = $('<input>')
	.attr('type', 'text')
	.attr('placeholder', !task.date && 'Set due date')
	.addClass('due-date')
	.val(task.date)
	.datepicker();
	const taskArchive = $('<button>').addClass('archive-task-btn').text('Archive');
	const deleteTaskBtn = $('<button>').addClass('delete-task-btn').text('Delete task');

	taskItem.append(taskTitle);
	taskItem.append(taskDialog);
	taskDialog.append(taskDescription);
	taskDialog.append(taskDate);
	taskDialog.append(colorPaletts(task.color));
	taskItem.append(taskArchive);
	taskItem.append(deleteTaskBtn);
	
	makeSortable();
	
	return taskItem;
}

const renderList = (list) => {
	const isArchive = list.title.toLowerCase() === 'archive';
	const listItem = $('<li>').addClass(`list ${isArchive ? 'archive hidden' : ''}`);
	const listHeader = $('<h3>').addClass(`list-header ${list.color}`).text(list.title);
	const taskList = $('<ul>').addClass('sort-task sort-connect');
	const newTaskBtn = $('<button>').addClass('add-task-btn').text('+ task');
	const deleteListBtn = $('<button>').addClass('delete-list-btn').text('Delete list');
	
	listItem.append(listHeader);
	
	for (const task of list.tasks) {
		const taskItem = renderTask(task);
		taskList.append(taskItem);
	}
	
	listItem.append(taskList);
	!isArchive && listItem.append(newTaskBtn);
	!isArchive && listItem.append(deleteListBtn);

	makeSortable();

	return listItem;
}
