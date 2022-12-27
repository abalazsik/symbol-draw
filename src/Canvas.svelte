<script lang="ts">
    import { onMount } from "svelte";
    import { LineSegment, Path } from "./types";

    export let width: number = 200;
    export let height: number = 200;

    export let onCreateSymbol: (Path) => void | undefined;

    let currentPath: Path;
    let currentSegment: LineSegment;

    let normalized: boolean = false;

    let ref: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D | null,
        draw: boolean = false;

    onMount(async () => {
        ctx = ref.getContext("2d");
        currentPath = new Path();
        currentSegment = new LineSegment();
    });

    const mouseDown = (e: MouseEvent) => {
        currentSegment.add(e.offsetX, e.offsetY);

        ctx.closePath();
        ctx.beginPath();
        ctx?.moveTo(e.offsetX, e.offsetY);
        draw = true;
    };

    const mouseMove = (e: MouseEvent) => {
        if (draw) {
            currentSegment.add(e.offsetX, e.offsetY);
            ctx?.lineTo(e.offsetX, e.offsetY);
            ctx?.stroke();
        }
    };

    const mouseUp = (e: MouseEvent) => {
        currentPath.add(currentSegment);
        currentSegment = new LineSegment();

        draw = false;
        ctx.closePath();
    };

    const mouseLeave = () => {
        draw = false;
    };

    const clear = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
    };

    const newSymbol = () => {
        if (onCreateSymbol) {
            if (normalized) {
                currentPath.normalize(width, height);
            }
            onCreateSymbol(currentPath);
        }
        clear();
        currentPath = new Path();
    };
</script>

<div>
    <div>
        <canvas
            class="container"
            bind:this={ref}
            {width}
            {height}
            on:mousedown={mouseDown}
            on:mousemove={mouseMove}
            on:mouseup={mouseUp}
            on:mouseleave={mouseLeave}
        />
    </div>
    <div>
        <label for="checkbox">Normalized:</label>
        <input type="checkbox" id="checkbox" bind:checked={normalized} />
        <button on:click={newSymbol}>New Symbol</button>
    </div>
</div>

<style>
    .container {
        border: 1px solid black;
    }
</style>
