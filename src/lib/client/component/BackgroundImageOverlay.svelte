<script lang="ts">
    export let src: string;
</script>

<img class="bg-image" {src} alt="bg" />

<style>
    .bg-image {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;

        object-fit: cover;
        object-position: center;

        filter: saturate(0.3);

        mix-blend-mode: multiply;
        opacity: 0.3;
    }
</style>
