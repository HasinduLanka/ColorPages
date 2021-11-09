<script lang="ts">
	import GlobalCss from "./GlobalCss.svelte";
	import { RoutedComponent, RouteProperties } from "./HashRoutes";

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
	<svelte:component this={$RoutedComponent} {...$RouteProperties} />
</div>
