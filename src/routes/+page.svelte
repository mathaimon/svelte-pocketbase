<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Card from "$lib/components/ui/card";
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";

    let items = [];

    onMount(async () => {
        await getPbItems();
        console.log(items);
    });

    async function getPbItems() {
        items = await pb.collection("items").getFullList({
            sort: "-created",
        });
    }

    let itemInput = "";
    let showError = false;

    $: if (itemInput.length >= 3) {
        showError = false;
    }

    async function addItem() {
        if (itemInput.length >= 3) {
            await pb.collection("items").create({
                content: itemInput,
            });
            itemInput = "";
            showError = false;
            await getPbItems();
        } else {
            showError = true;
        }
    }
</script>

<div class="flex items-center justify-center max-w-md gap-2 mx-auto">
    <Input bind:value={itemInput} placeholder="Add item" />
    <Button variant="outline" on:click={addItem}>
        <Icon icon="ph:plus-circle-duotone" class="text-xl text-primary" />
    </Button>
</div>
{#if showError}
    <div class="w-full max-w-md mx-auto mt-2 text-sm dark:text-rose-700 text-rose-400">
        * atleast 3 characters required
    </div>
{/if}
<div class="flex flex-col max-w-md gap-3 mx-auto mt-10">
    <div class="flex items-center gap-2 text-xl font-semibold">
        <Icon icon="ph:floppy-disk-duotone" class="text-2xl text-primary" /> Saved Items
    </div>
    {#each items as item}
        <Card.Root class="flex items-center justify-between px-3 py-2">
            <div>{item.content}</div>
            <Button variant="ghost">
                <Icon icon="ph:trash-duotone" class="text-lg text-rose-500" />
            </Button>
        </Card.Root>
    {/each}
</div>
