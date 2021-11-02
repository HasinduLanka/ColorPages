<script lang="ts">
    import { Route } from "./routes";
    import RenderSvgson from "./RenderSvgson.svelte";
    import { Drawings } from "./vars";

    function GoColorPage() {
        $Route = "colorpage";
    }
</script>

<div class="flex-1">
    <div class="p-4 mx-auto text-center max-w-xl">
        <h1 class="uppercase text-6xl leading-normal text-purple-700 ">
            Color Book
        </h1>
        <input
            type="button"
            class=""
            value="Tap Color"
            on:click={GoColorPage}
        />

        {#each Object.keys(Drawings) as drawingID}
            <RenderSvgson id={drawingID} />
        {/each}
    </div>
</div>
