<script lang="ts">
    import { Route, RouteProperties } from "./HashRoutes";
    import type { IDrawing, Path } from "./drawing";
    import { Fill } from "./drawing";
    import {
        DeleteDrawing,
        LoadDrawing,
        SaveDrawing,
        SoundFillPaint,
        SoundPaintSelect,
        GetRandomColor,
    } from "./vars";
    import Boom from "./boom";

    export let DrawingID: string = null;
    let drawing: IDrawing;

    if (DrawingID) {
        try {
            drawing = LoadDrawing(DrawingID);

            if (drawing) {
                console.log("Drawing : ", DrawingID);
            } else {
                console.log("Drawing : ", DrawingID, " not loaded");
                GoHomeNow();
            }
        } catch (error) {
            console.error(error);
            GoHomeNow();
        }
    } else {
        console.log("No DrawingID found");
        GoHomeNow();
    }

    function GoHomeNow() {
        $RouteProperties = {};
        $Route = "";
    }

    function GoBack() {
        Save();

        if (drawing.strokeCount < 1) {
            console.log("Deleting ", DrawingID);
            DeleteDrawing(DrawingID);
        }

        var audio = new Audio(SoundFillPaint);
        audio.play();

        GoHomeNow();
        return;
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
        SaveDrawing(DrawingID, drawing);
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
        ["#FF0000", "#00EE00", "#1E90FF", "#EEEE00", "#FF4DFF"],
        ["#111111", "#EEEEEE", "#4169E1", "#F1C27D", "#A52A2A"],
    ];

    let paletteShades = {
        "#FF0000": "#800000",
        "#00EE00": "#228B22",
        "#1E90FF": "#0033FF",
        "#EEEE00": "#EEA500",
        "#FF4DFF": "#9900cc",

        "#111111": "#444444",
        "#EEEEEE": "#888888",
        "#4169E1": "#008B8B",
        "#F1C27D": "#C68642",
        "#A52A2A": "#4B0082",
    };

    let selectedPalette = 0;
    let palette = palettes[selectedPalette];
    let SelectedColor = palette[0];

    function SelectColor(event, clr: string) {
        SelectedColor = clr;

        event.stopPropagation();
        event.preventDefault();

        var audio = new Audio(SoundPaintSelect);
        audio.play();
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
            DeleteDrawing(DrawingID);
            $RouteProperties = {};
            $Route = "";
        }
    }

    function DrawingPolygonClicked(pathson: Path, event) {
        event.stopPropagation();
        event.preventDefault();

        let shade: string = SelectedColor;

        if (pathson.fill === SelectedColor) {
            shade = paletteShades[SelectedColor];
            if (!shade) {
                shade = SelectedColor;
            }
        }

        pathson.fill = shade;

        drawing = drawing;
        WaitAndSave();
        cheatcode = "";
        drawing.strokeCount++;

        Boom(event, shade, "shadow");

        var audio = new Audio(SoundFillPaint);
        audio.play();
    }

    // Power_RandomColor();
</script>

{#if drawing}
    <div class="h-screen w-screen flex ">
        <div style="width: 10vw" class="h-screen">
            <div
                class="items-center h-screen text-gray-300 bg-blue-800 py-1 px-1"
            >
                <div
                    class="hover:bg-blue-700 navButton backbutton mx-auto"
                    on:click={() => {
                        GoBack();
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
                            class={SelectedColor == clr
                                ? "ActivePalette"
                                : "paletteButton"}
                            style="background-color: {clr};"
                            on:touchstart={(event) => {
                                cheatcode += i.toString();
                                CheckCheats();
                                SelectColor(event, clr);
                            }}
                            on:mousedown={(event) => {
                                cheatcode += i.toString();
                                CheckCheats();
                                SelectColor(event, clr);
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
        <div style="width: 90vw;" class="h-screen">
            <div class="h-screen">
                {#if drawing}
                    <svg
                        width="100%"
                        height="100vh"
                        viewBox={drawing.viewBox}
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio={drawing.preserveAspectRatio}
                    >
                        <filter id="dispmorph">
                            <feMorphology
                                radius="0"
                                in="SourceGraphic"
                                result="morph"
                            />
                            <feTurbulence
                                type="turbulence"
                                baseFrequency="0.04 0.04"
                                numOctaves="2"
                                result="turbulence"
                            />
                            <feDisplacementMap
                                in2="turbulence"
                                in="morph"
                                scale="1"
                                xChannelSelector="B"
                                yChannelSelector="G"
                            />
                            <feGaussianBlur
                                in="turbuled"
                                stdDeviation="0.4"
                                result="blur"
                            />

                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.1"
                                result="noise"
                                numOctaves="2"
                            />
                            <feDiffuseLighting
                                in="noise"
                                lighting-color="#ffffff"
                                surfaceScale="2"
                            >
                                <feDistantLight azimuth="100" elevation="60" />
                            </feDiffuseLighting>

                            <feGaussianBlur
                                in="paper"
                                stdDeviation="1.2"
                                result="blurredpaper"
                            />

                            <feComposite
                                operator="arithmetic"
                                k1="1"
                                in="blur"
                                in2="blurredpaper"
                            />
                        </filter>

                        {#each drawing.gs as G}
                            <g
                                transform={G.transform}
                                fill={G.fill}
                                stroke={G.stroke}
                            >
                                {#each G.vectors.path as pathson}
                                    {#if pathson.fill === Fill.Black}
                                        <path
                                            d={pathson.d}
                                            fill={pathson.fill}
                                            stroke={pathson.stroke}
                                        />
                                    {:else}
                                        <path
                                            d={pathson.d}
                                            fill={pathson.fill}
                                            stroke={pathson.stroke}
                                            filter={pathson.fill === Fill.White
                                                ? ""
                                                : "url(#dispmorph)"}
                                            on:touchstart={(event) => {
                                                DrawingPolygonClicked(
                                                    pathson,
                                                    event
                                                );
                                            }}
                                            on:mousedown={(event) => {
                                                DrawingPolygonClicked(
                                                    pathson,
                                                    event
                                                );
                                            }}
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
{/if}

<style>
    .paletteButton {
        border: 1px solid rgb(99, 99, 99);
        border-radius: 0.5rem;
        padding-top: 14vh;
        height: 15vh;
        padding-bottom: 0;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .ActivePalette:active {
        transform: translateY(-0.5rem);
    }

    .ActivePalette {
        box-shadow: 0 1vh rgba(153, 153, 153, 0.3);

        border: 1px solid rgb(99, 99, 99);
        border-radius: 0.5rem;
        padding-top: 10vh;
        height: 6vh;
        padding-bottom: 0;
        margin-top: 3vh;
        margin-bottom: 3vh;
        animation: beat 2s ease 0s 1 normal forwards;
    }
    @keyframes beat {
        0% {
            animation-timing-function: ease-out;
            transform: scale(1);
            transform-origin: center center;
        }

        10% {
            animation-timing-function: ease-in;
            transform: scale(0.91);
        }

        17% {
            animation-timing-function: ease-out;
            transform: scale(0.98);
        }

        33% {
            animation-timing-function: ease-in;
            transform: scale(0.87);
        }

        45% {
            animation-timing-function: ease-out;
            transform: scale(1);
        }
    }

    .navButton {
        height: 8vh;
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0.7vh;
        margin-bottom: 0.3vh;
    }

    .cheatButton {
        height: 20vh;
        padding-top: 6vh;
        padding-bottom: 6vh;
        margin-top: 5vh;
        margin-bottom: 5vh;
    }
</style>
