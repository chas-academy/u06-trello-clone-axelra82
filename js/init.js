// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	default: defaultLists,
	update(data = {}, action = null){
		
		let lists = this.lists(),
		listId,
		list,
		taskId,
		task,
		taskEl,
		taskObject,
		id,
		e,
		currentList,
		sourceListId;
		
		switch (action) {
			case 'addList':
				lists.push(data);
				break;

			case 'deleteList':
				listId = getSourceListId(data);
				lists.splice(listId, 1);

				// Visualize
				list = data.target.closest('.list');
				list.remove();

				break;
			
			case 'addTask':
				id = data.id;
				task = data.task;
				currentList = lists[id];
				currentList.tasks.push(task);
				break;
			
			case 'archiveTask':
				taskEl = data.target.closest('.task');
				taskId = Array.from(taskEl.closest('ul').children).indexOf(taskEl);
				sourceListId = getSourceListId(data);

				taskObject = lists[sourceListId].tasks[taskId];

				// Mutate lists
				lists[sourceListId].tasks.splice(taskId, 1);
				lists[0].tasks.push(taskObject);

				// Visualize
				$('#lists-container').find('.archive ul').append(taskEl);
				break;
			
			case 'deleteTask':
				e = data.e;
				task = data.task;
				taskId = Array.from(task.closest('ul').children).indexOf(task);
				lists[getSourceListId(e)].tasks.splice(taskId, 1);
				break;
			
			default:
				break;
		}
		
		this.set(lists);
	},
	get(){
		return localStorage.getItem(this.name);
	},
	set(data){
		localStorage.setItem(this.name, JSON.stringify(data));
		return;
	},
	lists(){
		if(!this.get()){
			this.set(this.default);
		}
		return JSON.parse(this.get());
	},
}

populateLists(store.lists());
makeSortable();

// console.log(store.lists());