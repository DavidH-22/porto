<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BE_URL } from '$env/static/public';

	let status = $state<'operational' | 'degraded' | 'down' | 'loading'>('loading');
	let latency = $state<number | null>(null);

	onMount(async () => {
		try {
			const start = performance.now();
			const base = PUBLIC_BE_URL.replace(/\/api\/?$/, '');
			const res = await fetch(`${base}/api/status`);
			const data = await res.json();
			latency = Math.round(performance.now() - start);
			status = data.status;
		} catch {
			status = 'down';
		}
	});
</script>

<a
	href="/status"
	class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-xs transition hover:border-slate-300"
>
	<span class="relative flex h-2 w-2">
		{#if status === 'operational'}
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
			<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
		{:else if status === 'degraded'}
			<span class="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
		{:else if status === 'down'}
			<span class="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
		{:else}
			<span class="relative inline-flex h-2 w-2 rounded-full bg-slate-300"></span>
		{/if}
	</span>

	<span>
		{#if status === 'operational'}
			Systems Normal
		{:else if status === 'degraded'}
			Degraded Performance
		{:else if status === 'down'}
			System Issue
		{:else}
			Checking...
		{/if}
	</span>

	{#if latency !== null}
		<span class="border-l border-slate-200 pl-1.5 font-mono text-[10px] text-slate-400">
			{latency}ms
		</span>
	{/if}
</a>