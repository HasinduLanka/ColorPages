<script lang="ts">
    import { Route } from "./routes";
    import type { IDrawing } from "./drawing";
    import { Fill } from "./drawing";
    import { CDrawing, CDrawingID, SaveDrawing } from "./vars";

    let drawing: IDrawing = $CDrawing;

    function GetRandomColor() {
        var letters = "05AF";
        var color = "#";
        for (var i = 0; i < 3; i++) {
            let c = letters[Math.floor(Math.random() * 4)];
            color += c + c;
        }
        if (color === "#000000" || color === "#FFFFFF") {
            return GetRandomColor();
        }

        return color;
    }

    function Power_RandomColor() {
        console.log("MultiColor!");
        drawing.gs.forEach((G) => {
            G.vectors.path.forEach((P) => {
                if (P.fill !== Fill.Black) {
                    P.fill = GetRandomColor();
                    drawing = drawing;
                }
            });
        });
    }

    function Power_Whitout() {
        console.log("Whitout!");
        drawing.gs.forEach((G) => {
            G.vectors.path.forEach((P) => {
                if (P.fill !== Fill.Black) {
                    P.fill = Fill.White;
                    drawing = drawing;
                }
            });
        });
    }

    function Save() {
        SaveDrawing($CDrawingID, drawing);
        console.log("Saved!");
    }

    let waitCount = 0;
    let threadWaitAndSave;
    function WaitAndSave() {
        if (waitCount > 16) {
            waitCount = 0;
            clearTimeout(threadWaitAndSave);
            Save();
            return;
        }

        if (threadWaitAndSave) {
            clearTimeout(threadWaitAndSave);
        }
        threadWaitAndSave = setTimeout(Save, 3000);
    }
</script>

<div class="h-screen w-screen flex">
    <div style="width: 5vw;">
        <div class="items-center h-screen text-gray-300 bg-blue-800 py-1 px-1">
            <div
                class="hover:bg-blue-700 px-4 py-2 my-1 backbutton"
                on:click={() => {
                    $Route = "";
                    Save();
                }}
            >
                &nbsp;
            </div>
            <div
                class="hover:bg-blue-700 px-4 py-2 my-1"
                on:click={Power_RandomColor}
            >
                Rnd
            </div>
            <div
                class="hover:bg-blue-700 px-4 py-2 my-1"
                on:click={Power_Whitout}
            >
                Erase
            </div>
        </div>
    </div>
    <div style="width: 95vw;">
        <div>
            {#if drawing}
                <svg
                    width="100%"
                    height="100vh"
                    viewBox={drawing.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio={drawing.preserveAspectRatio}
                >
                    {#each drawing.gs as G}
                        <g
                            transform={G.transform}
                            fill={G.fill}
                            stroke={G.stroke}
                        >
                            {#each G.vectors.path as pathson}
                                {#if pathson.fill !== Fill.Black}
                                    <path
                                        d={pathson.d}
                                        fill={pathson.fill}
                                        stroke={pathson.stroke}
                                        on:click={() => {
                                            pathson.fill = GetRandomColor();
                                            drawing = drawing;
                                            WaitAndSave();
                                            console.log(
                                                "Colored in ",
                                                pathson.fill
                                            );
                                        }}
                                    />
                                {:else}
                                    <path
                                        d={pathson.d}
                                        fill={pathson.fill}
                                        stroke={pathson.stroke}
                                    />
                                {/if}
                            {/each}
                        </g>
                    {/each}
                </svg>
            {/if}
        </div>
    </div>
</div>
