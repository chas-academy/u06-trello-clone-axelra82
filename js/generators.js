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
	// const taskBody = $('<div>').addClass('task-body').text(task.body);
	// const taskDate = $('<input>')
	// .attr('type', 'text')
	// .attr('placeholder', 'Due date')
	// .addClass('due-date')
	// .val(task.date)
	// .datepicker();
	// const taskColor = $('<button>').addClass('btn').text('Colorpicker');
	// const taskArchive = $('<button>').addClass('btn').text('Archive');
	const deleteTaskBtn = $('<button>').addClass('delete-task-btn').text('Delete task');

	taskItem.append(taskTitle);
	// taskItem.append(taskBody);
	// taskItem.append(taskDate);
	// // taskItem.append(taskColor);
	// taskItem.append(colorPaletts(task.color));
	// taskItem.append(taskArchive);
	taskItem.append(deleteTaskBtn);
	
	makeSortable();
	
	return taskItem;
}

const renderList = (list) => {
	const listItem = $('<li>').addClass('list').attr('data-id', list.id);
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
	listItem.append(newTaskBtn);
	listItem.append(deleteListBtn);

	makeSortable();
	
	return listItem;
}
