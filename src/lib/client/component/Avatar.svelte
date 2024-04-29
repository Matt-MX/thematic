<script lang="ts">
    export let url: string
</script>

<div class="avatar-container">
    <img src={url} />
</div>

<style>
    .avatar-container {
        position: relative;

        object-fit: contain;
        object-position: center;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
        overflow: hidden;
        aspect-ratio: 1 / 1;

        vertical-align: middle;
    }

    .avatar-container img {
        position: relative;
        width: 100%;
    }
</style>