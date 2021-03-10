/*******************************
LISTENERS
*******************************/

$('#show-archive').on('click', e => {
	$('#lists-container').find('.archive').removeClass('hidden');
	e.target.disabled = true;
});

$('#reset-board').on('click', () => {
	const accept = confirm('This action can not be undone and will reset the board to its defauilt state (i.e. deleting eveything). Are you sure you want to continue?')

	if(accept){
		localStorage.clear();
		location.reload();
	}
});

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
	const listId = store.update(
		list,
		'addList'
	);

	// Visualize
	const newList = renderList(list, listId);
	$('#lists-container').append(newList);

	makeSortable();
});

// Delete list
$('#lists-container').on('click', 'button.delete-list-btn', e => {
	const accept = confirm('Are you sure you want to delete the list and all tasks in it? This can not be undone.');
	
	if(accept){
		// Mutate lists array
		store.update(
			e,
			'deleteList'
		);
	}
});

// Create new task
$('#lists-container').on('click', 'button.add-task-btn', e => {
	const title = prompt('Task title', 'Do something');
	const description = prompt('Task description', 'Describe it');
	
	const listId = e.target.closest('.list').id.split('-')[2];

	console.log(e.target.closest('.list').id.split('-')[2]);

	const task = {
		title: title,
		description: description,
		date: null,
		color: taskColors[Math.floor(Math.random() * taskColors.length)]
	};

	const taskId = store.update(
		{
			id: listId,
			task: task
		},
		'addTask'
	);

	$(e.target).parents('.list').children('ul').append(renderTask(task, taskId, listId));
	makeSortable();
});

// Open task detail on click
$('#lists-container').on('click', '.task', e => {
	const $this = $(e.target);
	$($this.data('id')).dialog('open');
	$($this.data('id')).dialog(
		{
			position: {
				my: "center",
				at: "center",
				of: $this
			}
		}
	)
});

// Archive task
// $('#lists-container').on('click', 'button.archive-task-btn', e => {
const archiveTask = (e) => {
	const uid = $(e).attr('id');
	
	// Mutate lists array
	store.update(
		uid,
		'archiveTask'
	);
	
	// Visualize
	$(e).dialog("close");
	const taskLi = $(document).find(`[data-id='#${uid}']`);
	$('#lists-container').find('.archive ul.sort-task').append(taskLi);
};

// Delete task
const deleteTask = (e) => {
	const accept = confirm('Are you sure you want to delete the task? This can not be undone.');
	
	if(accept){
		const uid = $(e).attr('id');
		
		// Mutate lists array
		store.update(
			uid,
			'deleteTask'
		);
		
		// Visualize
		$(e).dialog("close");
		$(document).find(`[data-id='#${uid}']`).remove();
	}
};

// Check if dialog is open
$(document).on("dialogopen", ".ui-dialog", (e, ui) => {
	
	// Change task color
	// This could use some more attention. Buggy
	$('.task-content .color-palettes').on('click', '.color-palette', e => {
		const uid = e.target.closest('.task-content').id;
		const newColor = e.target.className;
		const currentDiv = $(e.target).closest('.color-palettes').find('li .current')[0];
		const currentColor = currentDiv.classList[0];

		store.update(
			{
				uid,
				color: newColor.replace(/\scurrent\s/g,''),
			},
			'updateTaskColor'
		);
		
		// Visualize
		const currentTaskContainer = $(document).find(`[data-id='#${uid}']`);
		currentTaskContainer.removeClass(currentColor).addClass(newColor);
		
		$(currentDiv).removeClass('current');
		$(e.target).addClass('current');
	});
});

