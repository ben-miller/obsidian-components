import {
	App,
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	TFile
} from "obsidian";
import HtmlWidgetPlugin from "../obsidian/main";

const relationalTags = [
	"is-a",
	"is-instance-of",
	"is-example-of",
	"is-related-to",
];

export class RelationalTagSuggestor extends EditorSuggest<string> {
	plugin: HtmlWidgetPlugin;

	constructor(app: App, plugin: HtmlWidgetPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo | null {
		const lineBeforeCursor = editor.getLine(cursor.line).substr(0, cursor.ch);
		if (lineBeforeCursor.endsWith("#[")) {
			return {
				start: { line: cursor.line, ch: cursor.ch - 2 }, // Position right after #[
				end: cursor,
				query: "",
			};
		}
		return null;
	}

	getSuggestions(context: EditorSuggestContext): string[] {
		return relationalTags.filter(option =>
			option.toLowerCase().includes(context.query.toLowerCase()) // Filter based on user input
		);
	}

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		el.createEl("div", { text: suggestion });
	}

	selectSuggestion(suggestion: string, evt: MouseEvent | KeyboardEvent): void {
		if (!this.context) {
			console.log("No context available for autocomplete");
			return;
		}
		const { editor, start, end } = this.context;
		const completionText = `#[${suggestion}[]`;
		if (editor) {

			// Replace text with selected suggestion
			editor.replaceRange(`#[${suggestion}[]`, start, end);
			this.close()

			// Set cursor to inside the new []
			const cursor = {
				line: start.line,
				ch: start.ch + completionText.length - 1
			}
			editor.setCursor(cursor);

			// HACK: Insert space so that backspace can be used to trigger link suggestor
			editor.replaceRange(' ', cursor)
			const newCursorPosition = { line: cursor.line, ch: cursor.ch + 1 }
			editor.setCursor(newCursorPosition);
		}
	}
}

