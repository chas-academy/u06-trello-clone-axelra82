/*******************************
Generators
*******************************/
const colorPalettes = (current) => {
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
	const uid = `list-${listId}-task-${id}`;
	const isPassedDue = new Date(task.date).valueOf() < Date.now();
	const taskItem = $('<li>').addClass(`card task ${task.color}`).attr('data-id', `#${uid}`);
	const taskCardTitle = $('<strong>').text(task.title);

	const taskContent = $('<article>').addClass('task-content').attr('id', uid);

	const taskTabs = $('<div>').attr('id', `${uid}-tabs`);
	const tabsList = $('<ul>');
	
	
	const tabContent = $('<li>');
	const containerContent = $('<article>').attr('id', `${uid}-content-tab`);
	const taskTitle = $('<h3>').addClass('task-title').text(task.title);
	const taskDescription = $('<p>').text(task.description);
	
	const tabStyleDate = $('<li>');
	const containerStyleDate = $('<div>').attr('id', `${uid}-date-style-tab`);
	const taskDate = $('<input>')
	.attr('type', 'text')
	.attr('placeholder', !task.date && 'Set due date')
	.addClass(`due-date ${isPassedDue ? 'past' : ''}`)
	.val(task.date)
	.datepicker()
	.isFuture();

	// Content
	tabsList.append(tabContent);
	tabContent.append($('<a>').attr('href', `#${uid}-content-tab`).text('content'));
	containerContent.append(taskTitle);
	containerContent.append(taskDescription);
	
	// Date & Style
	tabsList.append(tabStyleDate);
	tabStyleDate.append($('<a>').attr('href', `#${uid}-date-style-tab`).text('style & date'));
	containerStyleDate.append(taskDate);
	containerStyleDate.append(colorPalettes(task.color));
	
	// Init tabs
	taskTabs.append(tabsList);
	
	taskTabs.append(containerContent);
	taskTabs.append(containerStyleDate);

	taskContent.append(taskTabs);

	taskItem.append(taskContent);
	taskItem.append(taskCardTitle);
	
	taskTabs.tabs();
	makeSortable();

	return taskItem;
}

const renderList = (list, listId) => {
	const isArchive = list.title.toLowerCase() === 'archive';
	const listItem = $('<li>').addClass(`list ${isArchive ? 'archive hidden' : ''}`).attr('id', `list-id-${listId}`);
	const listHeader = $('<h3>').addClass(`list-header ${list.color}`).text(list.title);
	const taskList = $('<ul>').addClass('sort-task sort-connect');
	const newTaskBtn = $('<button>').addClass('add-task-btn').text('+ task');
	const deleteListBtn = $('<button>').addClass('delete-list-btn').text('Delete list');
	
	listItem.append(listHeader);
	
	// console.log(list.tasks);
	
	list.tasks.forEach((task, id) => {
		const taskItem = renderTask(task, id, listId);
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
