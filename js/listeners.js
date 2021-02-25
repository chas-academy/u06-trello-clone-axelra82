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
	const accept = confirm('This will delete list and all tasks');
	
	if(accept){
		// Mutate lists array
		store.update(e, 'deleteList');
		
		// Visualize
		const list = e.target.parentNode;
		list.remove();
	}
});

// Add task to list
$('#lists-container').on('click', 'button.add-task-btn', e => {
	e.preventDefault();

	const title = prompt('Task title', 'Do something');
	const body = prompt('Task description', 'Describe it');
	
	const listId = e.target.parentNode.dataset.id;
	const list = store.lists().find(list => list.id == listId);

	const task = {
		id: list.tasks.length + 1,
		title: title,
		body: body,
		date: null,
		color: taskColors[Math.floor(Math.random() * taskColors.length)]
	};

	store.update(
		{
			id: listId,
			task: task
		},
		'addTask'
	);

	$(e.target).parents('.list').children('ul').append(renderTask(task));
});

// Change task color
$('#lists-container').on('click', '.color-palette div', (e) => {
	e.preventDefault();
	$this = $(e.target);
	
	color = $this.attr('class');
	
	$this.parents('.sort-task').children('ul').append($item);
});