// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	default: defaultLists,
	update(data = {}, action = null){
		
		let lists = this.lists(),
		callback = null,
		listId,
		list,
		taskId,
		task,
		taskObject,
		id,
		currentList,
		sourceListId;
		
		switch (action) {
			case 'addList':
				lists.push(data);
				callback = lists.length-1;
				break;

			case 'deleteList':
				list = data.target.closest('.list');
				listId = list.id.split('-')[2];

				lists.splice(listId, 1);

				// Visualize
				list.remove();

				break;
			
			case 'addTask':
				id = data.id;
				task = data.task;
				currentList = lists[id];
				currentList.tasks.push(task);
				callback = currentList.tasks.length-1;
				break;
			
			case 'updateTaskDate':
				sourceListId = ids(data.uid).list;
				taskId = ids(data.uid).task;

				taskObject = lists[sourceListId].tasks[taskId];

				taskObject.date = data.date;

				// Mutate lists
				lists[sourceListId].tasks.splice(taskId, 1);
				lists[sourceListId].tasks.push(taskObject);
				break;
			
			case 'updateTaskColor':
				sourceListId = ids(data.uid).list;
				taskId = ids(data.uid).task;

				taskObject = lists[sourceListId].tasks[taskId];

				taskObject.color = data.color;

				// Mutate lists
				lists[sourceListId].tasks.splice(taskId, 1);
				lists[sourceListId].tasks.push(taskObject);
				break;
			
			case 'archiveTask':
				taskObject = lists[ids(data).list].tasks[ids(data).task];

				// Mutate lists
				lists[ids(data).list].tasks.splice(ids(data).task, 1);
				lists[0].tasks.push(taskObject);
				break;
			
			case 'deleteTask':
				lists[ids(data).list].tasks.splice(ids(data).task, 1);
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