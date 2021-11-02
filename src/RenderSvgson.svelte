<script lang="ts">
    import type { IDrawings, IDrawing } from "./drawing";
    import { Fill } from "./drawing";

    export let drawing: IDrawing = null;
</script>

<div>
    {#if drawing}
        <svg
            width="100%"
            height="100%"
            viewBox={drawing.viewBox}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio={drawing.preserveAspectRatio}
        >
            {#each drawing.gs as G}
                <g transform={G.transform} fill={G.fill} stroke={G.stroke}>
                    {#each G.vectors.path as pathson}
                        <path
                            d={pathson.d}
                            fill={pathson.fill}
                            stroke={pathson.stroke}
                        />
                    {/each}
                </g>
            {/each}
        </svg>
    {/if}
</div>
