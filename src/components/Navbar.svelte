<script>
    import { toggleMode } from "mode-watcher";
    import { page } from "$app/stores";

    const routes = [
        { name: "Home", path: "/" },
        { name: "Files", path: "/files" },
    ];
</script>

<nav class="flex items-center justify-between h-[3.5rem] border-b border-secondary px-4 fixed w-full bg-background">
    <a href="/" class="flex items-center gap-2">
        <Icon icon="ph:database-duotone" class="text-3xl text-primary" />
        <div class="font-semibold">SvelteBase</div>
    </a>
    <div class="flex items-center gap-3">
        {#each routes as route}
            <a href={route.path} class:active={$page.url.pathname === route.path}>
                {route.name}
            </a>
        {/each}
        <Button on:click={toggleMode} variant="outline" size="icon">
            <Icon
                icon="ph:sun-duotone"
                class="h-[1rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Icon
                icon="ph:moon-duotone"
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</nav>

<style>
    .active {
        @apply text-primary font-semibold;
    }
</style>
