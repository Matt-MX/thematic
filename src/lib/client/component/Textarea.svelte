<script lang="ts">
    import { onMount } from "svelte";

    export let title: string;
    export let id: string;
    export let placeholder: string = "Placeholder";
    export let value: string;

    let ref: HTMLTextAreaElement;
    let maxLengthText = ""

    function setMaxLengthText() {
        if (ref.maxLength) {
                maxLengthText = ref.value.length + "/" + ref.maxLength
            }
    }

    onMount(() => {
        setMaxLengthText()
        ref.addEventListener('input', (event) => {
            setMaxLengthText()
        })
    });
</script>

<label for="t_desc">{title}</label>
<textarea
    bind:this={ref}
    bind:value
    class="box-style form-elem-fill desc"
    {id}
    {placeholder}
    maxlength={255}
/>
<p class="max-length">{maxLengthText}</p>

<style scoped>
    .max-length {
        position: absolute;
        margin-top: -2rem;
        margin-left: 0.5rem;
        color: var(--dull);
        font-size: smaller;
    }
</style>
