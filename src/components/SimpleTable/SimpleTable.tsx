import React from 'react';

interface SimpleTableItem {
	name: string;
	size: number;
}

interface SimpleTableSection {
	name: string;
	children: SimpleTableItem[];
}

export type SimpleTableData = SimpleTableSection[];

export const SimpleTable: React.FC<{
	className?: string,
	data: SimpleTableData,
	onDoubleClick?: () => void
}> = ({ className, data, onDoubleClick }) => {
	const styles = {
		menuContainer: {
			margin: '20px',
			width: '300px',
			userSelect: 'none' as const
		},
		menuParentTitle: {
			color: 'black',
			textDecoration: 'none',
			marginBottom: '10px',
			marginRight: 'auto'
		},
		menuList: {
			paddingLeft: 0,
		},
		menuItem: {
			borderBottom: '1px dotted #bfbfbf',
			listStyleType: 'none',
			color: 'black',
			textDecoration: 'none',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '5px 0',
		},
	};

	return (
		<div style={styles.menuContainer} onDoubleClick={onDoubleClick} className={className}>
			<div id="simple-table">
				{data.map((section, index) => (
					<div key={index}>
						<h3 style={styles.menuParentTitle}>
							{section.name}
						</h3>
						<ul style={styles.menuList}>
							{section.children.map((item, idx) => (
								<li key={idx} style={styles.menuItem}>
									<span>{item.name}</span>
									<span>{item.size}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default SimpleTable;
