<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import Canvas from "./Canvas.svelte";
	import SymbolContainer from "./SymbolContainer.svelte";
	import type { Path } from "./types";

	let pathCounter = 1;
	let paths: Path[] = [];

	const width = 200;
	const height = 200;
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
</script>

<main>
	<div>
		{#each paths as path}
			<SymbolContainer
				width={64}
				height={64}
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
