<script lang="ts">
    import Symbol from "./Symbol.svelte";
    import type { Path } from "./types";

    export let width: number = 16;
    export let height: number = 16;

    export let viewBoxWidth: number = 16;
    export let viewBoxHeight: number = 16;

    export let path: Path;
    export let selected: boolean = false;
</script>

<div class="symbol ${selected ? 'selected' : ''}">
    <Symbol {width} {height} {path} {viewBoxWidth} {viewBoxHeight}/>
</div>

<style>
    .symbol {
        display: inline-block;
        width: fit-content;
    }

    .symbol:hover {
        border: 1px dotted gray;
    }

    .selected {
        border: 2px dotted gray;
    }
</style>
