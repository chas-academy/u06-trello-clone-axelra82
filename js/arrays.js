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
		title: 'Todo',
		color: 'azure',
		tasks: [
			{
				title: 'Something that needs doing',
				body: 'Tempor et no est labore amet, vero ipsum sit no sea accusam dolor, sed ut takimata sed duo sed sanctus',
				date: null,
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
]