<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import Canvas from "./Canvas.svelte";
	import SymbolContainer from "./SymbolContainer.svelte";
	import type { Path } from "./types";

	let pathCounter = 1;
	let paths: Path[] = [];

	const width = 200;
	const height = 200;
	const LINE_HEIGHT = 60;
	let selectedId: undefined | number = undefined;

	const onCreateSymbol = (path: Path) => {
		path.id = pathCounter++;
		paths.push(path);
		paths = paths;
	};

	function onClick(id: number) {
		selectedId = id;
	}

	function removeSelected() {
		paths = paths.filter((path) => path.id !== selectedId);
		selectedId = undefined;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === "Backspace" || e.code === "Delete") {
			removeSelected();
		}
	}

	onMount(async () => {
		window.addEventListener("keydown", handleKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener("keydown", handleKeyDown);
	});

	function getBackgroundImage() {
		return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="${LINE_HEIGHT + 10}px" width="10px"><line stroke="gray" x1="0" y1="${LINE_HEIGHT}" x2="10" y2="${LINE_HEIGHT}" /></svg>')`;
	}
</script>

<main>
	<div style:background-image={getBackgroundImage()}>
		{#each paths as path}
			<SymbolContainer
				width={64}
				height={LINE_HEIGHT}
				{path}
				viewBoxWidth={width}
				viewBoxHeight={height}
				selected={selectedId === path.id}
				{onClick}
			/>
		{/each}
	</div>
	<Canvas {onCreateSymbol} {width} {height} />
</main>
