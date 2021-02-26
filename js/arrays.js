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
		title: 'Archive',
		color: 'black',
		tasks: []
	},
	{
		title: 'Todo',
		color: 'azure',
		tasks: [
			{
				title: 'Something that needs doing',
				description: 'Moo moo',
				color: taskColors[2],
			},
		]
	},
	{
		title: 'Doing',
		color: 'mango',
		tasks: [
			{
				title: 'Something that is currently being worked on',
				description: 'Momo does moo moo',
				color: taskColors[5],
			},
		]
	},
	{
		title: 'Done',
		color: 'blue-violet',
		tasks: [
			{
				title: 'Something that is done',
				description: 'Momo is done',
				color: taskColors[7],
			},
		]
	},
]