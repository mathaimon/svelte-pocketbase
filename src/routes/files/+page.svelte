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
        items = await pb.collection("file_upload").getFullList({
            sort: "-created",
        });
    }
    let fileBaseUrl = "http://127.0.0.1:8090/api/files";

    let fileInput;
    let fileInputValue;
    const formData = new FormData();
    let showError = false;
    $: if (fileInputValue) {
        showError = false;
    }

    function onFileChange(event) {
        formData.delete("file_raw");
        formData.append("file_raw", event.target.files[0]);
    }

    async function addItem() {
        if (fileInputValue) {
            await pb.collection("file_upload").create(formData);
            fileInputValue = null;
            showError = false;
            await getPbItems();
        } else {
            showError = true;
        }
    }

    async function deleteItem(id) {
        await pb.collection("file_upload").delete(id);
        await getPbItems();
    }
</script>

<form on:submit={addItem} class="flex items-center justify-center max-w-md gap-2 mx-auto">
    <Input
        type="file"
        accept="image/*"
        bind:this={fileInput}
        bind:value={fileInputValue}
        on:change={(e) => onFileChange(e)}
        placeholder="Add item"
    />
    <Button variant="outline" on:click={addItem}>
        <Icon icon="ph:upload-duotone" class="text-xl text-primary" />
    </Button>
</form>
{#if showError}
    <div class="w-full max-w-md mx-auto mt-2 text-sm dark:text-rose-700 text-rose-400">* select an image file</div>
{/if}
<div class="flex flex-col max-w-md gap-3 mx-auto mt-10">
    <div class="flex items-center gap-2 text-xl font-semibold">
        <Icon icon="ph:floppy-disk-duotone" class="text-2xl text-primary" /> Saved Files
    </div>
    {#each items as item}
        <Card.Root class="flex items-center justify-between px-3 py-2">
            <img
                src={`${fileBaseUrl}/${item.collectionId}/${item.id}/${item.file_raw}`}
                alt={item.file_raw}
                class="size-[6rem] rounded-md object-cover"
            />
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
