<script lang="ts">
    import { profile } from '$lib/data/career';
</script>

<section id="about" class="py-20 max-w-3xl mx-auto px-6">
    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-200/60 text-slate-700 border border-slate-300/50 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        Available for new opportunity
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
        Hi, I'm <span class="bg-linear-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{profile.name}</span>
    </h1>
    
    <p class="text-sm font-semibold text-teal-600 mb-6 tracking-wide uppercase">
        {profile.role}
    </p>
    
    <p class="text-sm text-slate-600 max-w-xl mb-8 leading-relaxed font-normal">
        {profile.bio}
    </p>
    
    <div class="flex gap-4">
        <!-- LinkedIn Button with Icon -->
        <a href={profile.linkedin} target="_blank" rel="noreferrer" 
           class="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
            Connect on LinkedIn
        </a>
        
        <!-- GitHub Button with Icon -->
        <a href={profile.github} target="_blank" rel="noreferrer" 
           class="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-medium text-xs transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub Profile
        </a>
    </div>
</section>