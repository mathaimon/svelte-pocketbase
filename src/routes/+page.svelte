<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Card from "$lib/components/ui/card";
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
    {#each Array(5) as item, i}
        <Card.Root class="flex items-center justify-between px-3 py-2">
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit labore et {i}</div>
            <Button variant="ghost">
                <Icon icon="ph:trash-duotone" class="text-lg text-rose-500" />
            </Button>
        </Card.Root>
    {/each}
</div>
