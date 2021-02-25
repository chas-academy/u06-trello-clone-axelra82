const taskColors = [
	"light-pink",
	"deep-champagne",
	"lemon-yellow-crayola",
	"tea-green",
	"celeste",
	"baby-blue-eyes",
	"maximum-blue-purple",
	"mauve"
];

const listColors = [
	"mango",
	"orange-pantone",
	"winter-sky",
	"blue-violet",
	"azure"
];

const defaultLists = [
	{
		id: 1,
		title: 'Todo',
		color: 'azure',
		tasks: [
			{
				id: 1,
				title: 'Something that needs doing',
				color: taskColors[2],
			},
		]
	},
	{
		id: 2,
		title: 'Doing',
		color: 'mango',
		tasks: [
			{
				id: 1,
				title: 'Something that is currently being worked on',
				color: taskColors[5],
			},
		]
	},
	{
		id: 3,
		title: 'Done',
		color: 'blue-violet',
		tasks: [
			{
				id: 1,
				title: 'Something that is done',
				color: taskColors[7],
			},
		]
	},
]