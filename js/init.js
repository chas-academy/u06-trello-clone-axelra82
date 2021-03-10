// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	default: defaultLists,
	update(data = {}, action = null){
		
		let lists = this.lists(),
		callback = null,
		taskObject;
		
		switch (action) {
			case 'addList':
				lists.push(data);
				callback = lists.length-1;
				break;

			case 'deleteList':
				lists.splice(data.listId, 1);

				// Visualize
				data.element.remove();

				break;
			
			case 'addTask':
				taskObject = data.task;
				const currentList = lists[data.id];
				currentList.tasks.push(taskObject);
				callback = currentList.tasks.length > 1 ? currentList.tasks.length-1 : '0';
				break;
			
			case 'updateTaskDate':
				taskObject = lists[data.listId].tasks[data.taskId];
				taskObject.date = data.date;

				// Mutate lists
				lists[data.listId].tasks.splice(data.taskId, 1);
				lists[data.listId].tasks.push(taskObject);
				break;
			
			case 'updateTaskColor':
				taskObject = lists[data.listId].tasks[data.taskId];
				taskObject.color = data.color;

				// Mutate lists
				lists[data.listId].tasks.splice(data.taskId, 1);
				lists[data.listId].tasks.push(taskObject);
				break;
			
			case 'archiveTask':
				taskObject = lists[ids(data).list].tasks[ids(data).task];

				// Mutate lists
				lists[ids(data).list].tasks.splice(ids(data).task, 1);
				lists[0].tasks.push(taskObject);
				break;
			
			case 'deleteTask':				
				lists[data.listId].tasks.splice(data.taskId, 1);
				break;
			
			default:
				break;
		}
		
		this.set(lists);
		if(callback){
			return(callback);
		}
		return;
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