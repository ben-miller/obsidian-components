interface ProgressTableItem {
	name: string;
	current: number;
	total: number;
}

interface ProgressTableSection {
	name: string;
	children: ProgressTableItem[];
}

export type ProgressTableData = ProgressTableSection[];
