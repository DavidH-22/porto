<script lang="ts">
    import { experiences } from '$lib/data/career';
</script>

<section id="experience" class="py-16 max-w-3xl mx-auto px-6 border-t border-slate-200">
    <h2 class="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-10">
        Experience
    </h2>

    <div class="space-y-6">
        {#each experiences as exp}
            <div class="group bg-white border border-slate-200 p-6 rounded-xl shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
                
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                        <h3 class="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {exp.role}
                        </h3>
                        
                        <!-- Padded Company line with real building/briefcase SVG -->
                        <p class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            {exp.company}
                        </p>
                    </div>
                    
                    <span class="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                        {exp.period}
                    </span>
                </div>
                
                <p class="text-xs text-slate-600 mb-5 leading-relaxed font-normal">
                    {exp.description}
                </p>
                
                <div class="flex flex-wrap gap-1.5">
                    {#each exp.skills as skill}
                        <span class="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200/80 font-mono rounded">
                            {skill}
                        </span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</section>