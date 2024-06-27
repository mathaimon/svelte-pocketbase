<script>
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Card from "$lib/components/ui/card";
    import * as Dialog from "$lib/components/ui/dialog";
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

    async function deleteItem(id) {
        await pb.collection("items").delete(id);
        await getPbItems();
    }
</script>

<form on:submit={addItem} class="flex items-center justify-center max-w-md gap-2 mx-auto">
    <Input bind:value={itemInput} placeholder="Add item" />
    <Button variant="outline" on:click={addItem}>
        <Icon icon="ph:plus-circle-duotone" class="text-xl text-primary" />
    </Button>
</form>
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
            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "ghost" })}>
                    <Icon icon="ph:trash-duotone" class="text-lg text-rose-500" />
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-md ">
                    <Dialog.Header>Are you sure you want to delete this item ?</Dialog.Header>
                    <Dialog.Footer>
                        <div class="grid w-full grid-cols-2 gap-3">
                            <Dialog.Close class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
                            <Dialog.Close
                                class={buttonVariants({ variant: "destructive" })}
                                on:click={() => deleteItem(item.id)}>Delete</Dialog.Close
                            >
                        </div>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </Card.Root>
    {/each}
</div>
