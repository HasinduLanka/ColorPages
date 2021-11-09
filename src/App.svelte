<script lang="ts">
	import GlobalCss from "./GlobalCss.svelte";
	import Start from "./Start.svelte";
	import ColorPage from "./ColorPage.svelte";
	import { Route, RouteData, RoutedComponent, Routes } from "./HashRoutes";


	async function openFullscreen() {
		try {
			var elem: any = document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullScreen) {
				elem.webkitRequestFullScreen();
			}
		} catch {}

		try {
			if (screen && screen.orientation && screen.orientation.lock) {
				await screen.orientation.lock("landscape-primary");
			}
		} catch {}
	}

	function closeFullscreen() {
		try {
			if (document.exitFullscreen) {
				var elem = document.documentElement;
				document.exitFullscreen();
			}
		} catch {}

		try {
			if (screen && screen.orientation && screen.orientation.lock) {
				screen.orientation.unlock();
			}
		} catch {}
	}
</script>

<GlobalCss />

<div on:click={openFullscreen}>
	<svelte:component this={$RoutedComponent} />
</div>
