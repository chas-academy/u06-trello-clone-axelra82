// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	default: defaultLists,
	update(data = {}, action = null){
		
		let lists = this.lists();
		
		switch (action) {
			case 'addList':
				lists.push(data);
				break;

			case 'deleteList':
				const listId = getSourceListId(data);
				lists.splice(listId, 1);
				break;
			
			case 'addTask':
				const {id, task: addTask} = data;
				const currentList = lists[id];
				currentList.tasks.push(addTask);
				break;
			
			case 'deleteTask':
				const {e, task: deleteTask} = data;
				const taskId = Array.from(deleteTask.closest('ul').children).indexOf(deleteTask);
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