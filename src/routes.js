import Home from './Home.svelte';
import Package from './Package.svelte';
import NotFound from './NotFound.svelte';

export default {
    '/': Home,
    '/package/:journal/:ms_number': Package,
    // The catch-all route must always be last
    '*': NotFound
};
