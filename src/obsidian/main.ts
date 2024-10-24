import {
	App,
	Editor,
	EditorPosition,
	EditorSuggest, EditorSuggestContext,
	EditorSuggestTriggerInfo,
	MarkdownPostProcessorContext,
	Plugin,
	TFile
} from "obsidian";
import {cleanupReactRoots, renderComponent} from "./obsidianRendering";
import {
	ProgressTableProps,
	parseYamlToDotCountTableProps
} from "../components/presenters/ProgressTable/ProgressTable";
import yaml from "js-yaml";
import {RelationalTagSuggestor} from "../relational-links/relationalTagSuggestor";
import {RelationalLinkSuggestor} from "../relational-links/relationalLinkSuggestor";

interface ParsedYaml {
	component: string;
	title?: string;
	data?: ProgressTableProps | null;
	cols?: number;
}

const parseYaml = (yamlString: string): ParsedYaml | null => {
	try {
		const parsed: any = yaml.load(yamlString);

		if (typeof parsed === 'object' && parsed !== null && typeof parsed.component === 'string') {
			let data: ProgressTableProps | null = null;

			if (parsed.component === 'ProgressTable') {
				data = parseYamlToDotCountTableProps(parsed);
			}

			return {
				component: parsed.component,
				title: parsed.title,
				data: parsed.data,
				cols: parsed.cols,
			};
		}

		console.error('Error parsing YAML');
		return null;
	} catch (error) {
		console.error('Error parsing YAML:', error);
		return null;
	}
};


export default class HtmlWidgetPlugin extends Plugin {
	public relationalTagSuggestor: RelationalTagSuggestor | null = null;
	public relationalLinkSuggestor: RelationalLinkSuggestor | null = null;

	onload() {
		this.registerMarkdownCodeBlockProcessor("rc", this.processWidgetCodeBlock.bind(this))
		console.log("HTML Widget Plugin loaded");

		this.relationalTagSuggestor = new RelationalTagSuggestor(this.app, this);
		this.registerEditorSuggest(this.relationalTagSuggestor);
		this.relationalLinkSuggestor = new RelationalLinkSuggestor(this.app, this);
		this.registerEditorSuggest(this.relationalLinkSuggestor);
		console.log("Autocomplete Suggest loaded");
	}

	async processWidgetCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const props: ParsedYaml | null = parseYaml(source);
		if (props) {
			renderComponent(el, props.component, props)
		} else {
			el.createEl("p", { text: "Error: Invalid YAML format" });
		}
	}

	onunload() {
		cleanupReactRoots();
		console.log("HTML Widget Plugin unloaded");

		if (this.relationalTagSuggestor) {
			this.relationalTagSuggestor = null;
		}
		if (this.relationalLinkSuggestor) {
			this.relationalLinkSuggestor = null;
		}
		console.log("Autocomplete Suggest unloaded");
	}
}
