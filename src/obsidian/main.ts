import {MarkdownPostProcessorContext, Plugin} from "obsidian";
import {cleanupReactRoots, renderComponent} from "./obsidianRendering";
import {
	ProgressTableProps,
	parseYamlToDotCountTableProps
} from "../components/presenters/ProgressTable/ProgressTable";
import yaml from "js-yaml";

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
	onload() {
		console.log("HTML Widget Plugin loaded");
		this.registerMarkdownCodeBlockProcessor("rc", this.processWidgetCodeBlock.bind(this))
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
		console.log("HTML Widget Plugin unloaded");
		cleanupReactRoots();
	}
}
