export enum ProgressDisplayType {
	Bar = "ProgressBar",
	Dots = "Dots"
}

interface ProgressTableItem {
	name: string;
	current: number;
	total: number;
	type: ProgressDisplayType;
}

interface ProgressTableSection {
	name: string;
	children: ProgressTableItem[];
}

export type ProgressTableData = ProgressTableSection[];
