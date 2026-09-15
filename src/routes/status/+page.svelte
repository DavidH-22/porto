<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BE_URL } from '$env/static/public';

	type ServiceStatus = 'operational' | 'degraded' | 'down';

	interface Service {
		name: string;
		status: ServiceStatus;
		uptime: string;
	}

	interface StatusResponse {
		status: ServiceStatus;
		services?: Service[];
		uptime?: string;
		history?: { day: number; status: ServiceStatus }[];
	}

	let loading = $state(true);
	let overallStatus = $state<ServiceStatus>('operational');
	let services = $state<Service[]>([]);
	let historyBlocks = $state<{ day: number; status: ServiceStatus }[]>([]);
	const now = new Date();
	const thirtyDaysAgo = new Date(now);
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	onMount(async () => {
		try {
			const base = PUBLIC_BE_URL.replace(/\/api\/?$/, '');
			const res = await fetch(`${base}/api/status`);
			const data: StatusResponse = await res.json();

			overallStatus = data.status;

			if (data.services && data.services.length > 0) {
				services = data.services;
			} else {
				services = [{ name: 'System', status: data.status, uptime: data.uptime ?? '—' }];
			}

			if (data.history && data.history.length > 0) {
				historyBlocks = data.history;
			} else {
				historyBlocks = Array.from({ length: 30 }, (_, i) => ({
					day: i + 1,
					status: data.status
				}));
			}
		} catch {
			overallStatus = 'down';
			services = [{ name: 'System', status: 'down', uptime: '—' }];
			historyBlocks = Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				status: 'down' as const
			}));
		} finally {
			loading = false;
		}
	});

	function getStatusClasses(status: ServiceStatus): { dot: string; text: string; bg: string; border: string; label: string } {
		switch (status) {
			case 'operational': return { dot: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'text-emerald-700' };
			case 'degraded': return { dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'text-amber-700' };
			case 'down': return { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'text-red-700' };
			default: return { dot: 'bg-slate-500', text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', label: 'text-slate-700' };
		}
	}

	function statusLabel(status: ServiceStatus): string {
		switch (status) {
			case 'operational': return 'All Systems Operational';
			case 'degraded': return 'Degraded Performance';
			case 'down': return 'System Outage';
			default: return 'Checking...';
		}
	}

	function blockColor(status: ServiceStatus): string {
		switch (status) {
			case 'operational': return 'bg-emerald-500';
			case 'degraded': return 'bg-amber-500';
			case 'down': return 'bg-red-500';
			default: return 'bg-slate-300';
		}
	}

	const overallClasses = $derived(getStatusClasses(overallStatus));
	const overallUptime = $derived(
		historyBlocks.length > 0
			? `${((historyBlocks.filter((b) => b.status === 'operational').length / historyBlocks.length) * 100).toFixed(1)}%`
			: '—'
	);
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
		{#if loading}
			<div class="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">
				Checking...
			</div>
		{:else}
			<div class="rounded-lg {overallClasses.bg} border {overallClasses.border} px-3 py-1.5 text-xs font-semibold {overallClasses.label}">
				{statusLabel(overallStatus)}
			</div>
		{/if}
	</div>

	<div class="mb-10 rounded-xl border border-slate-200 bg-white shadow-xs divide-y divide-slate-100">
		{#if loading}
			{#each Array(3) as _}
				<div class="flex items-center justify-between p-4">
					<div class="flex items-center gap-3">
						<span class="h-2.5 w-2.5 rounded-full bg-slate-200 animate-pulse"></span>
						<span class="text-sm font-medium text-slate-300">Loading...</span>
					</div>
					<div class="flex items-center gap-4 text-xs">
						<span class="font-mono text-slate-200">— uptime</span>
						<span class="font-medium text-slate-200 capitalize">—</span>
					</div>
				</div>
			{/each}
		{:else}
			{#each services as service}
				{@const classes = getStatusClasses(service.status)}
				<div class="flex items-center justify-between p-4">
					<div class="flex items-center gap-3">
						<span class="h-2.5 w-2.5 rounded-full {classes.dot}"></span>
						<span class="text-sm font-medium text-slate-700">{service.name}</span>
					</div>
					<div class="flex items-center gap-4 text-xs">
						<span class="font-mono text-slate-400">{service.uptime} uptime</span>
						<span class="font-medium {classes.text} capitalize">{service.status}</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
		<div class="mb-4 flex items-center justify-between text-xs font-medium text-slate-500">
			<span>30 Days Ago</span>
			<span class="text-slate-900 font-semibold">{overallUptime} Overall Uptime</span>
			<span>Today</span>
		</div>
		
		<div class="flex gap-1.5">
			{#each historyBlocks as block}
				<div 
					class="h-8 flex-1 rounded-xs {blockColor(block.status)} transition hover:opacity-80" 
					title="Day {block.day}: {block.status}"
				></div>
			{/each}
		</div>
	</div>
</div>