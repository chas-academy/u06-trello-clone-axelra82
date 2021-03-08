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

const renderTask = (task, id, listId) => {
	const uid = `list-${listId}-task${id}`;
	const isPassedDue = new Date(task.date).valueOf() < Date.now();
	const taskItem = $('<li>').addClass(`task ${task.color}`).attr('data-id', `#${uid}`);
	const taskCardTitle = $('<strong>').text(task.title);

	const taskContent = $('<article>').addClass('task-content').attr('id', uid);
	const taskTitle = $('<h3>').addClass('task-title').text(task.title);
	const taskDescription = $('<p>').text(task.description);
	const taskDate = $('<input tabindex="-1">')
	.attr('type', 'text')
	.attr('placeholder', !task.date && 'Set due date')
	.addClass(`due-date ${isPassedDue ? 'past' : ''}`)
	.val(task.date)
	.datepicker({
		onSelect: (date, e) => {
			store.update(
				{
					e: e.input[0],
					date: date,
				},
				'updateTaskDate'
			);
		}
	});
	const taskArchive = $('<button>').addClass('archive-task-btn').text('Archive');
	const deleteTaskBtn = $('<button>').addClass('delete-task-btn').text('Delete task');

	taskItem.append(taskCardTitle);
	taskItem.append(taskContent);
	
	taskContent.append(taskTitle);
	taskContent.append(taskDescription);
	taskContent.append(taskDate);
	taskContent.append(colorPaletts(task.color));
	
	taskContent.append(taskArchive);
	taskContent.append(deleteTaskBtn);
	
	makeSortable();
	
	return taskItem;
}

const renderList = (list, listId) => {
	const isArchive = list.title.toLowerCase() === 'archive';
	const listItem = $('<li>').addClass(`list ${isArchive ? 'archive hidden' : ''}`);
	const listHeader = $('<h3>').addClass(`list-header ${list.color}`).text(list.title);
	const taskList = $('<ul>').addClass('sort-task sort-connect');
	const newTaskBtn = $('<button>').addClass('add-task-btn').text('+ task');
	const deleteListBtn = $('<button>').addClass('delete-list-btn').text('Delete list');
	
	listItem.append(listHeader);
	
	// console.log(list.tasks);
	
	list.tasks.forEach((task, id) => {
		const taskItem = renderTask(task, id+1, listId);
		taskList.append(taskItem);
	});

	// for (const task of list.tasks) {
	// 	const taskItem = renderTask(task);
	// 	taskList.append(taskItem);
	// }
	
	listItem.append(taskList);
	!isArchive && listItem.append(newTaskBtn);
	!isArchive && listItem.append(deleteListBtn);

	makeSortable();

	return listItem;
}
