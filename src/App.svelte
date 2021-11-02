<script lang="ts">
	import GlobalCss from "./GlobalCss.svelte";
	import Start from "./Start.svelte";
	import ColorPage from "./ColorPage.svelte";
	import { Route } from "./routes";
</script>

<GlobalCss />

<div class="flex">
	{#if $Route === ""}
		<Start />
	{:else if $Route === "colorpage"}
		<ColorPage />
	{/if}
</div>
