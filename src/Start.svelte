<script lang="ts">
    import { ulid } from "ulid";
    import { Route, RouteProperties } from "./HashRoutes";
    import RenderSvgson from "./RenderSvgson.svelte";
    import Boom from "./boom";

    import type { IDrawing } from "./drawing";

    import {
        Drawings,
        SaveDrawing,
        LoadDrawing,
        ListSavedDrawings,
        SoundPaintSelect,
        SoundFillPaint,
        GetRandomColor,
    } from "./vars";

    function CloneGoColorPage(drawingID: string, drawing: IDrawing) {
        let id = drawingID + "-" + ulid();
        SaveDrawing(id, drawing);

        LoadGoColorPage(id);
    }
    function LoadGoColorPage(id: string) {
        let cdrawing = LoadDrawing(id);

        if (cdrawing) {
            $RouteProperties = { DrawingID: id };
            $Route = "colorpage";
        }
    }

    function LogoClick(event) {
        Boom(event, "#FFFFFF", "emoji");
        var audio = new Audio(SoundPaintSelect);
        audio.play();
    }

    function DrawingIconClick(event) {
        Boom(event, GetRandomColor(), "square");
        var audio = new Audio(SoundFillPaint);
        audio.play();
    }
</script>

<div class="flex">
    <div class="flex-1">
        <div class="p-4 mx-auto text-center max-w-xl" on:click={LogoClick}>
            <h1
                class="uppercase text-6xl leading-normal text-purple-700 animate-pulse"
            >
                Color Book
            </h1>
        </div>
        <div
            class="px-16 mx-auto max-w-max grid justify-around grid-cols-3 gap-4 items-center "
        >
            {#each Object.entries(Drawings) as [drawingID, drawing]}
                <div
                    class="shadow-xl "
                    on:click={(event) => {
                        DrawingIconClick(event);
                        CloneGoColorPage(drawingID, drawing);
                    }}
                >
                    <RenderSvgson {drawing} />
                </div>
            {/each}
        </div>
        <div
            class="px-16 mx-auto max-w-max grid justify-around grid-cols-3 gap-4 items-center "
        >
            {#each ListSavedDrawings() as ID}
                <div
                    class="shadow-xl "
                    on:click={(event) => {
                        DrawingIconClick(event);
                        LoadGoColorPage(ID);
                    }}
                >
                    <RenderSvgson drawing={LoadDrawing(ID)} />
                </div>
            {/each}
        </div>
    </div>
</div>
