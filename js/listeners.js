/*******************************
LISTENERS
*******************************/

// Save current board JSON file
$('#save-board-btn').on('click', e => {

	const file = document.createElement('a');
    const fileBlob = new Blob(
		[JSON.stringify(store.lists())],
		{
			type: 'application/json'
		}
	);
    file.href = URL.createObjectURL(fileBlob);
    file.download = 'my-trello-clone-board.json';
    file.click();
});

// Load board from JSON file
$('#load-board-btn').on('click', e => {
	
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		alert('The File APIs are not fully supported in this browser. Bummer :(');
		return;
	}   
	
	const input = document.querySelector('#upload-board-btn');
	
	if (!input.files) {
		alert('Browser appears to not support \'files\' property of file input');
	} else if (!input.files[0]) {
		alert('Please select a file first');
	} else {
		const file = input.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			// Replace existing data
			store.set(JSON.parse(reader.result));
			
			// Refresh page
			location.reload();
		};
	}
});

// Create new list
$('#add-list-btn').on('click', e => {
	const title = prompt('List title', 'Some title');
	const list = {
		id: store.lists().length + 1,
		title,
		color: listColors[Math.floor(Math.random() * listColors.length)],
		tasks: []
	};
	
	// Mutate lists array
	store.update(list, 'addList');

	// Visualize
	const newList = renderList(list);
	$('#lists-container').append(newList);
});

// Delete list
$('#lists-container').on('click', 'button.delete-list-btn', e => {
	const accept = confirm('Are you sure you want to delete the list and all tasks in it? This can not be undone.');
	
	if(accept){
		// Mutate lists array
		store.update(e, 'deleteList');
		
		// Visualize
		const list = e.target.closest('.list');
		list.remove();
	}
});

// Create new task
$('#lists-container').on('click', 'button.add-task-btn', e => {
	const title = prompt('Task title', 'Do something');
	const body = prompt('Task description', 'Describe it');
	
	const task = {
		title: title,
		body: body,
		date: null,
		color: taskColors[Math.floor(Math.random() * taskColors.length)]
	};

	store.update(
		{
			id: getSourceListId(e),
			task: task
		},
		'addTask'
	);

	$(e.target).parents('.list').children('ul').append(renderTask(task));
});

// Delete task
$('#lists-container').on('click', 'button.delete-task-btn', e => {
	const accept = confirm('Are yuou sure you want to delete the task? This can not be undone.');
	
	if(accept){
		const task = e.target.closest('.task');
		
		// Mutate lists array
		store.update(
			{
				e: e,
				task: task
			},
			'deleteTask'
		);

		// Visualize
		task.remove();
	}
});

// Change task color
$('#lists-container').on('click', '.color-palette div', (e) => {
	e.preventDefault();
	$this = $(e.target);
	
	color = $this.attr('class');
	
	$this.parents('.sort-task').children('ul').append($item);
});