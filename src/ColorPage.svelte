<script lang="ts">
    import { Route } from "./routes";
    import type { IDrawing } from "./drawing";
    import { Fill } from "./drawing";
    import { CDrawing, CDrawingID, DeleteDrawing, SaveDrawing } from "./vars";

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
                if (P.fill === Fill.White) {
                    P.fill = GetRandomColor();
                    drawing = drawing;
                }
            });
        });
        WaitAndSave();
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
        WaitAndSave();
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

    let palettes = [
        ["#FF0000", "#00EE00", "#008B8B", "#EEEE00", "#FF00FF"],
        ["#800000", "#008000", "#0000FF", "#EEA500", "#800080"],
        ["#111111", "#888888", "#EEEEEE", "#C68642", "#F1C27D"],
    ];
    let selectedPalette = 0;
    let palette = palettes[selectedPalette];
    let SelectedColor = palette[0];

    function SelectColor(clr: string) {
        SelectedColor = clr;
    }

    function SwitchPalette() {
        selectedPalette = (selectedPalette + 1) % palettes.length;
        palette = palettes[selectedPalette];
        cheatcode += "P";
        CheckCheats();
    }

    function CheckCheats() {
        if (cheatcode.length > 10) {
            cheatcode = cheatcode.slice(1);
            if (cheatcode === "PPPPPPPPPP") {
                CheatsActive = true;
                cheatcode = "X";
            } else {
                CheatsActive = false;
            }
        } else {
            CheatsActive = false;
        }
        DeletePresses = 0;
    }

    let cheatcode = "";
    let CheatsActive = false;

    let DeletePresses = 0;

    function ConfirmAndDelete() {
        if (confirm("Delete this drawing ? Tap [ok] to delete")) {
            DeleteDrawing($CDrawingID);
            $Route = "";
        }
    }
</script>

<div class="h-screen w-screen flex ">
    <div style="width: 10vw" class="h-screen">
        <div class="items-center h-screen text-gray-300 bg-blue-800 py-1 px-1">
            <div
                class="hover:bg-blue-700 navButton backbutton mx-auto"
                on:click={() => {
                    $Route = "";
                    Save();
                }}
            >
                &nbsp;
            </div>

            {#if CheatsActive}
                <div
                    class="hover:bg-red-400 icon-delete mx-auto cheatButton"
                    on:click={() => {
                        DeletePresses++;
                        if (DeletePresses > 3) {
                            DeletePresses = 0;
                            ConfirmAndDelete();
                        }
                    }}
                >
                    &nbsp;
                </div>
                <div
                    class="hover:bg-blue-900 icon-colorreset mx-auto cheatButton"
                    on:click={() => {
                        Power_Whitout();
                    }}
                >
                    &nbsp;
                </div>
                <div
                    class="hover:bg-purple-700 icon-colorfill mx-auto cheatButton"
                    on:click={() => {
                        Power_RandomColor();
                    }}
                >
                    &nbsp;
                </div>
            {:else}
                {#each palette as clr, i}
                    <div
                        class="my-1 paletteButton"
                        style="background-color: {clr};"
                        on:click={() => {
                            SelectColor(clr);
                            cheatcode += i.toString();
                            CheckCheats();
                        }}
                    >
                        &nbsp;
                    </div>
                {/each}
            {/if}

            <div
                class="hover:bg-blue-700 navButton icon-palette mx-auto "
                on:click={SwitchPalette}
            >
                &nbsp;
            </div>
        </div>
    </div>
    <div style="width: 90vw;">
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
                                            pathson.fill = SelectedColor;
                                            drawing = drawing;
                                            WaitAndSave();
                                            cheatcode = "";
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

<style>
    .paletteButton {
        border: 1px solid rgb(99, 99, 99);
        border-radius: 0.5rem;
        padding-top: 14vh;
        height: 16vh;
        padding-bottom: 0;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .navButton {
        height: 6vh;
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0.5vh;
        margin-bottom: 0.5vh;
    }

    .cheatButton {
        height: 20vh;
        padding-top: 6vh;
        padding-bottom: 6vh;
        margin-top: 5vh;
        margin-bottom: 5vh;
    }
</style>
