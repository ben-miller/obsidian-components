import {ProgressDisplayType} from './progressTableData'

export const fakeData = {
	quotation: {
		text: "We humans tend to fixate on what we can see with our eyes. It is the most animal part of our nature. When we look at the changes in other people’s lives, we see the good luck that someone had in meeting a person with all of the right connections and the funding. We see the project that brings the money and the attention. In other words, we see the visible signs of opportunity and success in our own lives but we are grasping at an illusion. What really allows for such dramatic changes are the things that occur inside a person. The slow accumulation of knowledge and skills, the incremental improvements in work habits, and the ability to withstand criticism. Any change in people’s fortunes is merely the visible manifestation of all of that deep preparation over time. By essentially ignoring this internal invisible aspect, we fail to change anything fundamental within ourselves. And so in a few years’ time we reach our limits. Yet again we grow frustrated, we crave change, we grab at something quick and superficial and we remain prisoners forever of these recurring patterns in our lives. The answer is to reverse this perspective: Stop fixating on what other people are saying and doing. Stop fixating on the money, the connections, the outward appearance of things. Instead look inward, focus on the smaller internal changes that lay the groundwork for a much larger change in fortune. It is the difference between grasping at an illusion and immersing yourself in reality. And reality is what will liberate and transform you.",
		author: "Robert Greene",
	},
	timeMetrics: [
		{
			name: 'Time',
			children: [
				{ name: 'day of week', current: 4, total: 7, type: ProgressDisplayType.Dots },
			],
		},
	],
	mindAndBodyMetrics: [
		{
			name: 'Running',
			children: [
				{ name: 'days this week', current: 3, total: 6, type: ProgressDisplayType.Dots },
			],
		},
		{
			name: 'Weight Training',
			children: [
				{ name: 'days this week', current: 2, total: 4, type: ProgressDisplayType.Dots },
			],
		},
		{
			name: 'Meditation',
			children: [
				{ name: 'sessions this week', current: 7, total: 14, type: ProgressDisplayType.Dots },
			],
		},
	],
	jobSearchMetrics: [
		{
			name: 'Job applications',
			children: [
				{ name: 'sent this week', current: 0, total: 10, type: ProgressDisplayType.Dots },
			],
		},
		{
			name: 'LeetCode',
			children: [
				{ name: 'problems this week', current: 3, total: 5, type: ProgressDisplayType.Dots },
			],
		},
		{
			name: 'Dev Project',
			children: [
				{ name: 'hours this week', current: 13, total: 30, type: ProgressDisplayType.Dots },
			],
		},
	]
}
