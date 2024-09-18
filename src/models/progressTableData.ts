import {ChecklistGridDotProps} from "../components/presenters/ChecklistGrid/ChecklistGrid";

interface DotCountData {
	type: 'DotCountData';
	current: number;
	total: number;
}

export type ChecklistGridData = {
	type: 'ChecklistGridData';
	data: ChecklistGridDotProps[];
}

export interface ProgressTableSectionData {
	name: string;
	data: DotCountData | ChecklistGridData;
}

export type ProgressTableData = ProgressTableSectionData[];
