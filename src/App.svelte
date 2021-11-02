<script lang="ts">
	import GlobalCss from "./GlobalCss.svelte";
	import Start from "./Start.svelte";
	import ColorPage from "./ColorPage.svelte";
	import { Route } from "./routes";

	function openFullscreen() {
		var elem = document.documentElement;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		}
	}

	function closeFullscreen() {
		if (document.exitFullscreen) {
			var elem = document.documentElement;
			document.exitFullscreen();
		}
	}

	// $: if ($Route === "colorpage") {
	// 	openFullscreen();
	// }
</script>

<GlobalCss />

<div class="flex" on:click={openFullscreen}>
	{#if $Route === ""}
		<Start />
	{:else if $Route === "colorpage"}
		<ColorPage />
	{/if}
</div>
