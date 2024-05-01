<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    onMount(() => {
        window?.bracketsViewer?.render(
            {
                stages: data.stage,
                matches: data.match,
                matchGames: data.match_game,
                participants: data.participant,
            },
        );
    });
</script>

<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.css"
/>
<svelte:head>
    <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.js"
    ></script>
</svelte:head>

<div class="brackets-viewer"></div>

<style scoped>
    .brackets-viewer {
        /* Colors */
        --primary-background: transparent;
        --secondary-background: var(--background);
        --match-background: var(--background);
        --font-color: var(--text);
        --win-color: var(--confirm);
        --loss-color: var(--danger);
        --label-color: var(--dull);
        --hint-color: var(--dull);
        --connector-color: var(--background-alt);
        --border-color: var(--background-alt);
        --border-hover-color: var(--highlight);

        /* Sizes */
        --text-size: 12px;
        --round-margin: 4rem;
        --match-width: 12rem;
        --match-horizontal-padding: 1rem;
        --match-vertical-padding: 0.5rem;
        --connector-border-width: 1px;
        --match-border-width: 1px;
        --match-border-radius: 0.2rem;
    }
</style>
