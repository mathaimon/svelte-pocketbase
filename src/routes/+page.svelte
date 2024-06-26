<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Card from "$lib/components/ui/card";
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";

    let items = [];

    onMount(async () => {
        items = await pb.collection("items").getFullList({
            sort: "-created",
        });
        console.log(items);
    });
</script>

<div class="flex items-center justify-center max-w-md gap-2 mx-auto">
    <Input placeholder="Add item" />
    <Button variant="outline">
        <Icon icon="ph:plus-circle-duotone" class="text-xl text-primary" />
    </Button>
</div>
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
