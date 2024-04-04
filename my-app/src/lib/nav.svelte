<script>
    let isSidebarExpanded = false;

    function toggleSidebar() {
        isSidebarExpanded = !isSidebarExpanded;
    }
</script>

<!-- Sidebar Container -->
<div class={`fixed top-0 left-0 h-full z-40 flex flex-col bg-bgColor transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'}`}>
    <!-- Toggle Button -->
    <button class="mt-4 ml-auto mr-2" on:click={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 transform transition-transform duration-300"
             style:transform={isSidebarExpanded ? 'rotate(180deg)' : 'rotate(0deg)'} stroke-width="1.5" stroke="white" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
    </button>

    <!-- Navigation Icons -->
    <nav class="flex-1 flex flex-col items-center justify-start mt-4">
        <!-- Home Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- Home Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Home</span>
        </button>

        <!-- Account Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- Account Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Account</span>
        </button>

        <!-- Journal Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- Journal Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Journal</span>
        </button>
        
        <!-- Habit tracker Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- Habit tracker Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Habit Tracker</span>
        </button>
        
        <!-- Alerts Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300" >
            <!-- Alerts Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Alerts</span>
        </button>
        
        <!-- Meditation Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300" >
            <!-- Meditation Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Meditation</span>
        </button>
        
        <!-- Emergency Resources Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300" >
            <!-- Emergency Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>
        {isSidebarExpanded ? 'Emergency' : ''}
            </span>
        </button>
        
        <!-- about Button -->
        <button class="flex justify-center items-center w-full h-12 px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300" >
            <!-- about Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>About</span>
        </button>
        
        <!-- log in Button -->
        <button class="flex justify-center items-center  h-12 w-full px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- log in Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Log In</span>
        </button>
        
        <!-- log out Button -->
        <button class="flex justify-center items-center w-full h-12  px-4 py-2 hover:bg-CTA-Hover transition-colors duration-300">
            <!-- log out Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style:transform={isSidebarExpanded ? 'scale(1)' : 'scale(2)'}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <span class={isSidebarExpanded ? 'text-white text-lg' : 'text-white text-xl hidden'}>Log Out</span>
        </button>
    </nav>
</div>

<style>
    .sidebar-icon {
        margin: 0.5rem;
        /* Dynamically adjust icon size */
        width: var(--icon-size);
        height: var(--icon-size);
    }

    :global(.w-16 .sidebar-icon) {
        --icon-size: 2.5rem; /* Larger when sidebar is collapsed */
    }

    :global(.w-64 .sidebar-icon) {
        --icon-size: 2rem; /* Smaller when sidebar is expanded */
    }
</style>