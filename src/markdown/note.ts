import {promises as fs} from "fs";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt()

export class Note {
	constructor(
		public filePath: string,
		public content: string
	) {}

	public render(): string {
		return md.render(this.content);
	}

	public static async fromMarkdownFile(filePath: string): Promise<Note> {
		try {
			const content = await fs.readFile(filePath, 'utf-8');
			return new Note(filePath, content);
		} catch (error) {
			console.error(`Error reading file: ${filePath}`, error);
			throw error;
		}
	}
}
