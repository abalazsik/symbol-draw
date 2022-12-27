<script lang="ts">
    import type { Path } from "./types";

    export let width: number = 16;
    export let height: number = 16;

    export let viewBoxWidth: number = 16;
    export let viewBoxHeight: number = 16;

    export let path: Path;

    const getViewBox = () => {
        return `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
    }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox={getViewBox()}
    {width}
    {height}
>
    {#each path.getSegments() as segment}
        <polyline
            points={segment.toString()}
            style="stroke: #000; fill: none"
        />
    {/each}
</svg>
