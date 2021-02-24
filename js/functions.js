/*******************************
FUNCTIONS
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

const generateTask = (task) => {
	const taskItem = $('<li>').addClass(`task ${task.color}`);
	const taskTitle = $('<h3>').addClass('task-title').text(task.title);
	const taskBody = $('<div>').addClass('task-body').text(task.body);
	const taskDate = $('<input>')
	.attr('type', 'text')
	.attr('placeholder', 'Due date')
	.addClass('due-date')
	.val(task.date)
	.datepicker();
	const taskColor = $('<button>').addClass('btn').text('Colorpicker');
	const taskArchive = $('<button>').addClass('btn').text('Archive');

	taskItem.append(taskTitle);
	taskItem.append(taskBody);
	taskItem.append(taskDate);
	// taskItem.append(taskColor);
	taskItem.append(colorPaletts(task.color));
	taskItem.append(taskArchive);
	
	makeSortable();
	
	return taskItem;
}

const generateList = (list, i) => {
	const listItem = $('<li>').addClass('list').attr('id', i);
	const listHeader = $('<h3>').addClass(`list-header ${list.color}`).text(list.title);
	const taskList = $('<ul>').addClass('sort-task sort-connect');
	const newTaskBtn = $('<button>').addClass('add-task-btn').text('+ task');
	const deleteListBtn = $('<button>').addClass('delete-list-btn').text('Delete list');
	
	listItem.append(listHeader);
	
	for (const task of list.tasks) {
		const taskItem = generateTask(task);
		taskList.append(taskItem);
	}
	
	listItem.append(taskList);
	listItem.append(newTaskBtn);
	listItem.append(deleteListBtn);

	return listItem;
}

const populateLists = (lists) => {
	lists.forEach((list, i) => {
		const lists = generateList(list, i);
		$('#lists-container').append(lists);
	});

	makeSortable();
}

const deleteList = (list) => {
	const listId = list.attr('id');

	store.update(listId, 'remove');
	list.remove();
}

// Delete list
$('#lists-container').on('click', 'button.delete-list-btn', (e) => {
	e.preventDefault();

	const accept = confirm('This will delete list and all tasks');
	if(accept){
		deleteList($(e.target).parents('li'));
	}
});

/*******************************
LISTENERS
*******************************/

// Save current board to localStorage
const saveLocalStore = () => {
	store.set(store.lists());
}

// Save current board JSON file
$('#save-board-btn').on('click', e => {
	e.preventDefault();
	
	const dl = document.createElement('a');
    const file = new Blob(
		[JSON.stringify(store.lists())],
		{
			type: 'application/json'
		}
	);
    dl.href = URL.createObjectURL(file);
    dl.download = 'my-trello-clone-board.json';
    dl.click();
});

// Load board from JSON file
$('#load-board-btn').on('click', e => {
	e.preventDefault();

	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		alert('The File APIs are not fully supported in this browser.');
		return;
	}   
	
	const input = document.querySelector('#upload-board-btn');
	
	if (!input) {
		alert("Couldn't find fileinput element");
	} else if (!input.files) {
		alert("Browser appears to not support 'files' property of file input");
	} else if (!input.files[0]) {
		alert("Please select a file");               
	} else {
		const file = input.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			// Replace existing  data
			store.set(reader.result);
			
			// Reset file upload
			input.value = '';
		};
	}
});

// Create new list
$('#add-list-btn').on('click', e => {
	e.preventDefault();

	const title = prompt('List title', 'Some title');
	const list = {
		title,
		color: listColors[Math.floor(Math.random() * listColors.length)],
		tasks: []
	};
	
	store.update(list, 'addList');

	const newList = generateList(list, store.lists().length-1);
	$('#lists-container').append(newList);

	makeSortable();
});

// Add task to list
$('#lists-container').on('click', 'button.add-task-btn', e => {
	e.preventDefault();

	const title = prompt('Task title', 'Do something');
	const body = prompt('Task description', 'Describe it');

	const task = {
		title: title,
		body: body,
		date: null,
		color: taskColors[Math.floor(Math.random() * taskColors.length)]
	};

	const listId = $(e.target).parents('.list').attr('id');
	store.update({id: listId, task: task}, 'addTask');

	$(e.target).parents('.list').children('ul').append(generateTask(task));
});

// Change task color
$('#lists-container').on('click', '.color-palette div', (e) => {
	e.preventDefault();
	$this = $(e.target);
	
	color = $this.attr('class');
	
	$this.parents('.sort-task').children('ul').append($item);
});