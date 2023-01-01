<script lang="ts">
    import Symbol from "./Symbol.svelte";
    import type { Path } from "./types";

    export let width: number = 16;
    export let height: number = 16;

    export let viewBoxWidth: number = 16;
    export let viewBoxHeight: number = 16;

    export let path: Path;
    export let selected: boolean = false;
    export let onClick: (id: number) => void | undefined = undefined;

    function click() {
        if (onClick) {
            onClick(path.id);
        }
    }
</script>

<button class="symbol" class:selected on:click={click}>
    <Symbol {width} {height} {path} {viewBoxWidth} {viewBoxHeight} />
</button>

<style>
    .symbol {
        display: inline-block;
        width: fit-content;
        border: none;
        background: none;
    }

    .symbol:focus {
        outline: none;
    }

    .symbol:hover {
        border: 1px dotted gray;
    }

    .selected:focus {
        border: 2px dotted gray;
    }
</style>
