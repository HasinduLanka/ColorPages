<script lang="ts">
    import Boom from "./boom";

    function BoomClick(event) {
        console.log(typeof event, event);
        Boom(event);
    }
</script>

<div class="p-4 mx-auto text-center max-w-xl" on:click={BoomClick}>
    <h1 class="uppercase text-6xl leading-normal text-purple-700 animate-pulse">
        Color Book
    </h1>
</div>

<style>
</style>
