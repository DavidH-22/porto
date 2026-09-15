<script lang="ts">
	
	let services = $state([
		{ name: 'SvelteKit Frontend', status: 'operational', uptime: '100%' },
		{ name: 'API Server', status: 'operational', uptime: '99.98%' },
		{ name: 'Database', status: 'operational', uptime: '99.95%' }
	]);

	let historyBlocks = Array.from({ length: 30 }, (_, i) => ({
		day: i + 1,
		status: 'operational'
	}));
</script>

<div class="mx-auto max-w-3xl px-4 py-12">
	
	<a href="/" class="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-xs transition hover:border-slate-300 hover:text-slate-900">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<line x1="19" y1="12" x2="5" y2="12"></line>
			<polyline points="12 19 5 12 12 5"></polyline>
		</svg>
		Back to Home
	</a>

	<div class="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
		<div>
			<h1 class="text-2xl font-semibold tracking-tight text-slate-900">System Operational Status</h1>
			<p class="mt-1 text-sm text-slate-500">Real-time health monitoring of hosted services.</p>
		</div>
		<div class="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700">
			All Systems Operational
		</div>
	</div>

	<div class="mb-10 rounded-xl border border-slate-200 bg-white shadow-xs divide-y divide-slate-100">
		{#each services as service}
			<div class="flex items-center justify-between p-4">
				<div class="flex items-center gap-3">
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
					<span class="text-sm font-medium text-slate-700">{service.name}</span>
				</div>
				<div class="flex items-center gap-4 text-xs">
					<span class="font-mono text-slate-400">{service.uptime} uptime</span>
					<span class="font-medium text-emerald-600 capitalize">{service.status}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
		<div class="mb-4 flex items-center justify-between text-xs font-medium text-slate-500">
			<span>30 Days Ago</span>
			<span class="text-slate-900 font-semibold">99.9% Overall Uptime</span>
			<span>Today</span>
		</div>
		
		<div class="flex gap-1.5">
			{#each historyBlocks as block}
				<div 
					class="h-8 flex-1 rounded-xs bg-emerald-500 transition hover:opacity-80" 
					title="Day {block.day}: Operational"
				></div>
			{/each}
		</div>
	</div>
</div>