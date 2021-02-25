// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	default: defaultLists,
	update(data, action = null){
		
		let lists = this.lists();
		
		switch (action) {
			case 'addList':		
				lists.push(data);
				break;

			case 'addTask':
				const {id, task} = data;
				const currentList = lists.find(list => list.id == id);
				currentList.tasks.push(task);
				break;
			
			case 'deleteList':
				lists.find(list => list.id == data)
				lists.splice(data, 1);
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