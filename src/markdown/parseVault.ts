import { promises as fs } from 'fs';
import * as path from 'path';
import pLimit from 'p-limit';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt()

async function processMarkdownFile(filePath: string): Promise<string> {
	try {
		const content = await fs.readFile(filePath, 'utf-8');
		const parsedContent = md.render(content);
		console.log(parsedContent);
		return content;
	} catch (error) {
		console.error(`Error reading file: ${filePath}`, error);
		throw error;
	}
}

async function traverseDirectory(directory: string): Promise<string[]> {
	let files: string[] = [];
	const entries = await fs.readdir(directory, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			const nestedFiles = await traverseDirectory(fullPath);
			files = files.concat(nestedFiles);
		} else if (entry.name.endsWith('.md')) {
			files.push(fullPath);
		}
	}
	return files;
}

(async () => {
	console.log("Parsing vault...")
	const startPath = '/Users/bmiller/life';

	const limit = pLimit(10);

	try {
		const allMarkdownFiles = await traverseDirectory(startPath);
		console.log(`Total markdown files found: ${allMarkdownFiles.length}`);

		const processingTasks = allMarkdownFiles.map(file =>
			limit(() => processMarkdownFile(file))
		);

		const results = await Promise.all(processingTasks);

		console.log('Finished.');
	} catch (err) {
		console.error('Error traversing or processing files:', err);
	}
})();

export {}
