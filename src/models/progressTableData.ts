export interface ProgressTableSectionData {
	name: string;
	data: { current: number, total: number }
}

export type ProgressTableData = ProgressTableSectionData[];
