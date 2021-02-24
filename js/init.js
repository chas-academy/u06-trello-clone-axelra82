// localStorage.clear();

const store = {
	name: 'chas-trello-clone-axelra82',
	defaultLists: [
		{
			title: 'Todo',
			color: 'azure',
			tasks: [
				{
					title: 'Something that needs doing',
					body: 'Tempor et no est labore amet, vero ipsum sit no sea accusam dolor, sed ut takimata sed duo sed sanctus',
					date: '02/03/2021',
					color: taskColors[2],
					archive: false
				},
			]
		},
		{
			title: 'Doing',
			color: 'mango',
			tasks: [
				{
					title: 'Something that is currently being worked on',
					body: 'Tempor et no est labore amet, vero ipsum sit no sea accusam dolor, sed ut takimata sed duo sed sanctus',
					date: null,
					color: taskColors[5],
					archive: false
				},
			]
		},
		{
			title: 'Done',
			color: 'blue-violet',
			tasks: [
				{
					title: 'Something that is done',
					body: 'Tempor et no est labore amet, vero ipsum sit no sea accusam dolor, sed ut takimata sed duo sed sanctus',
					date: null,
					color: taskColors[7],
					archive: false
				},
			]
		},
	],
	update(data, action = null){
		
		let lists = this.lists();
		
		switch (action) {
			case 'addList':		
				lists.push(data);
				break;

			case 'addTask':
				const {id, task} = data;
				const currentList = lists[id];
				currentList.tasks.push(task);
				break;
			
			case 'remove':
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
			this.set(this.defaultLists);
		}
		return JSON.parse(this.get());
	},
}

populateLists(store.lists());
makeSortable();

// console.log(store.lists());