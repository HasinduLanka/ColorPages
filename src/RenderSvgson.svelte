<script lang="ts">
    import type { IDrawings, Svgson } from "./drawing";
    import { Fill } from "./drawing";
    import { Drawings, GetRandomColor } from "./vars";

    export let id: string = "";

    let drawing: Svgson;
    if (id) {
        drawing = Drawings[id];
    }
</script>

<div>
    {#if drawing}
        <svg
            width="100%"
            height="100%"
            viewBox={drawing.attributes.viewBox}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio={drawing.attributes.preserveAspectRatio}
        >
            {#each drawing.children as svgsonchild}
                {#if svgsonchild.name === "g"}
                    <g
                        transform={svgsonchild.attributes.transform}
                        fill={svgsonchild.attributes.fill}
                        stroke={svgsonchild.attributes.stroke}
                    >
                        {#each svgsonchild.children as pathson}
                            {#if pathson.name === "path"}
                                {#if pathson.attributes.fill === Fill.Ffffff}
                                    <path
                                        d={pathson.attributes.d}
                                        fill={pathson.attributes.fill}
                                        stroke={pathson.attributes.stroke}
                                    />
                                {:else}
                                    <path
                                        d={pathson.attributes.d}
                                        fill={pathson.attributes.fill}
                                        stroke={pathson.attributes.stroke}
                                    />
                                {/if}
                            {/if}
                        {/each}
                    </g>
                {/if}
            {/each}
        </svg>
    {/if}
</div>
