import {ChecklistGridDotProps, ChecklistGridState} from "../components/presenters/ChecklistGrid/ChecklistGrid";
import {ChecklistGridData, ProgressTableSectionData} from "./progressTableData";

export const fakeData = {
	quotation: {
		text: "We humans tend to fixate on what we can see with our eyes. It is the most animal part of our nature. When we look at the changes in other people’s lives, we see the good luck that someone had in meeting a person with all of the right connections and the funding. We see the project that brings the money and the attention. In other words, we see the visible signs of opportunity and success in our own lives but we are grasping at an illusion. What really allows for such dramatic changes are the things that occur inside a person. The slow accumulation of knowledge and skills, the incremental improvements in work habits, and the ability to withstand criticism. Any change in people’s fortunes is merely the visible manifestation of all of that deep preparation over time. By essentially ignoring this internal invisible aspect, we fail to change anything fundamental within ourselves. And so in a few years’ time we reach our limits. Yet again we grow frustrated, we crave change, we grab at something quick and superficial and we remain prisoners forever of these recurring patterns in our lives. The answer is to reverse this perspective: Stop fixating on what other people are saying and doing. Stop fixating on the money, the connections, the outward appearance of things. Instead look inward, focus on the smaller internal changes that lay the groundwork for a much larger change in fortune. It is the difference between grasping at an illusion and immersing yourself in reality. And reality is what will liberate and transform you.",
		author: "Robert Greene",
	},
}

export const mindAndBodyMetrics: ProgressTableSectionData[] = [
	{
		name: 'Running, days this week',
		data: { type: 'DotCountData', current: 3, total: 6 },
	},
	{
		name: 'Weight Training, days this week',
		data: { type: 'DotCountData', current: 2, total: 4 },
	},
	{
		name: 'Meditation, sessions this week',
		data: { type: 'DotCountData', current: 7, total: 14 },
	},
]

export const checklistGridData: ChecklistGridData = {
	type: 'ChecklistGridData',
	data: [
		{
			state: ChecklistGridState.SELECTED,
			label: 'Github heat map'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Stacked bar chart for summarizing time use'
		},
		{
			state: ChecklistGridState.DOING,
			label: 'Checklist grid'
		},
		{
			state: ChecklistGridState.DONE,
			label: 'Dot count chart'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Day of year dot chart'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Financial metrics'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Skill tree'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Project documentation'
		},
		{
			state: ChecklistGridState.DOING,
			label: 'User authentication module'
		},
		{
			state: ChecklistGridState.DONE,
			label: 'Responsive layout design'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'API integration tests'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Database schema optimization'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Bug fixing and improvements'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Performance testing'
		},
		{
			state: ChecklistGridState.DOING,
			label: 'Continuous integration setup'
		},
		{
			state: ChecklistGridState.DONE,
			label: 'Design system update'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Accessibility improvements'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'SEO optimizations'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Code refactoring'
		},
		{
			state: ChecklistGridState.DOING,
			label: 'Unit testing for components'
		},
		{
			state: ChecklistGridState.DONE,
			label: 'Project deployment'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Team collaboration tools setup'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Error logging implementation'
		},
		{
			state: ChecklistGridState.DOING,
			label: 'Frontend state management'
		},
		{
			state: ChecklistGridState.DONE,
			label: 'Version control setup'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Security audit'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Mobile responsiveness'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Data migration strategy'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Backup and restore functionality'
		},
		{
			state: ChecklistGridState.SELECTED,
			label: 'Feature flagging system'
		}
	]
}

export const jobSearchMetrics: ProgressTableSectionData[] = [
	{
		name: 'Job applications, sent this week',
		data: { type: 'DotCountData', current: 3, total: 5 },
	},
	{
		name: 'LeetCode, sessions this week',
		data: { type: 'DotCountData', current: 3, total: 5 },
	},
	{
		name: 'Dev Project, hours this week',
		data: { type: 'DotCountData', current: 14, total: 30 },
	},
]

