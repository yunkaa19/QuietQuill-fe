<script lang="ts">
    import '../global.css'
    import Navbar from '$lib/nav.svelte'
</script>

<div class="flex min-h-screen">
    <!-- Sidebar with potential to overlay content when expanded -->
    <Navbar class="fixed inset-y-0 left-0 z-40 w-16 md:w-64 flex-shrink-0 overflow-y-auto transition-width duration-300" />

    <!-- Content Area, aligned next to the non-expanded sidebar -->
    <div class="flex-1 min-h-screen ml-16">
        <slot />
    </div>
</div>
