<script lang="ts">
	import { onMount } from "svelte";
	import Canvas from "./Canvas.svelte";
	import SymbolContainer from "./SymbolContainer.svelte";
	import type { Path } from "./types";

	let pathCounter = 1;
	let paths: Path[] = [];

	const width = 200;
	const height = 200;

	const onCreateSymbol = (path: Path) => {
		path.id = pathCounter++;
		paths.push(path);
		paths = paths;
	};

	onMount(async () => {});
</script>

<main>
	<div>
		{#each paths as path}
			<SymbolContainer width={64} height={64} {path} viewBoxWidth={width} viewBoxHeight={height}/>
		{/each}
	</div>
	<Canvas {onCreateSymbol} {width} {height}/>
</main>
