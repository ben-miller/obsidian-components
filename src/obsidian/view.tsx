import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<h4>Hello, React!!</h4>
			</StrictMode>,
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
