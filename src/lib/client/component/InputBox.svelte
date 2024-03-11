<script lang="ts">
    export let name: string;
    export let description: string | undefined = undefined;
    export let placeholder: string | undefined;
    export let required: boolean;

    export let value: string;
</script>

<div class="input-box">
    <label for={name} aria-required={required}>{name}</label>
    {#if description}
        <p class="description">{description}</p>
    {/if}
    <input
        bind:value
        type="text"
        class="box-style form-elem-fill"
        {placeholder}
        id={name}
        {required}
    />
</div>

<style>
    .input-box {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .description {
        font-size: smaller;
        color: var(--dull);
    }
</style>
