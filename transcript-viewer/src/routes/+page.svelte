<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import TranscriptTable from '$lib/client/components/TranscriptTable.svelte';
	import FilterControls from '$lib/client/components/common/FilterControls.svelte';
	import ViewModeToggle from '$lib/client/components/common/ViewModeToggle.svelte';
	import ErrorDisplay from '$lib/client/components/ErrorDisplay.svelte';
	import { filterState, viewSettings, initializeStores } from '$lib/client/stores';
	import { createFilterFunction } from '$lib/shared/filter-utils';
	import { createTranscriptDataLoader } from '$lib/shared/services/transcript-data.svelte';
	import { extractAllTranscriptsFromTree, filterFolderTree } from '$lib/client/utils/folder-tree';
	import { collectScoreDescriptions } from '$lib/shared/utils/transcript-utils';
	// Live update SSE removed for simplified API

	// Create data loader
	const dataLoader = createTranscriptDataLoader();

	// Get current subdirectory path from URL parameter
	let currentPath = $derived($page.url.searchParams.get('path') || '');
	
	// Create breadcrumb segments for current path
	let breadcrumbSegments = $derived.by(() => {
		if (!currentPath) return [];
		
		const pathParts = currentPath.split('/').filter(Boolean);
		const segments = [];
		
		// Build cumulative paths for each segment
		for (let i = 0; i < pathParts.length; i++) {
			const segment = pathParts[i];
			const cumulativePath = pathParts.slice(0, i + 1).join('/');
			
			segments.push({
				name: segment,
				path: cumulativePath
			});
		}
		
		return segments;
	});

	// Load initial data
	onMount(() => {
		console.log('🚀 [DEBUG] onMount() called, initializing stores...');
		initializeStores();
		console.log('📊 [DEBUG] Stores initialized, calling loadData()...');
		// Load all metadata in one request
		dataLoader.loadData('list', currentPath || undefined);
		console.log('✅ [DEBUG] onMount() completed');

		// SSE updates removed; no subscription cleanup needed
		return () => {};
	});

	// Watch for changes in path and reload data (view mode changes no longer trigger reload!)
	let previousPath = $state('');
	
	$effect(() => {
		console.log('🔄 [DEBUG] $effect() triggered for path change');
		
		if (currentPath !== previousPath) {
			console.log('📂 [DEBUG] Path changed, reloading data:', { 
				path: { from: previousPath, to: currentPath }
			});
			
			previousPath = currentPath;
			
			if (typeof window !== 'undefined') { // Only reload in browser
				console.log('🌐 [DEBUG] Window available, calling loadData()...');
				// View mode no longer matters for loading - always load full metadata in one request
				dataLoader.loadData('list', currentPath || undefined);
			} else {
				console.log('🚫 [DEBUG] Window not available, skipping loadData()');
			}
		} else {
			console.log('➡️ [DEBUG] Path unchanged:', { path: currentPath });
		}
	});

	// Extract unique values for dropdowns from both list and tree data
	let allTranscripts = $derived.by(() => {
		console.log('🔍 [DEBUG] Computing allTranscripts...', { 
			viewMode: viewSettings.value.viewMode, 
			transcriptsLength: dataLoader.transcripts.length, 
			folderTreeLength: dataLoader.folderTree.length 
		});
		const result = viewSettings.value.viewMode === 'list' ? dataLoader.transcripts : extractAllTranscriptsFromTree(dataLoader.folderTree || []);
		console.log('📊 [DEBUG] allTranscripts computed, length:', result.length);
		return result;
	});
	
	// Extract all unique score types for table columns
	let scoreTypes = $derived.by(() => {
		console.log('🏷️ [DEBUG] Computing scoreTypes from', allTranscripts.length, 'transcripts...');
		const result = [...new Set(allTranscripts.flatMap(t => Object.keys(t.scores || {})))].sort();
		console.log('🏷️ [DEBUG] scoreTypes computed:', result);
		return result;
	});
	
	// Collect score descriptions from all transcripts for tooltips
	let scoreDescriptions = $derived.by(() => {
		console.log('📝 [DEBUG] Collecting score descriptions from', allTranscripts.length, 'transcripts...');
		const result = collectScoreDescriptions(allTranscripts);
		console.log('📝 [DEBUG] scoreDescriptions collected:', Object.keys(result));
		return result;
	});
	
	// Create filter function from expression
	let filterFunction = $derived.by(() => {
		console.log('🔧 [DEBUG] Creating filter function for expression:', filterState.value.filterExpression);
		const result = createFilterFunction(filterState.value.filterExpression);
		console.log('🔧 [DEBUG] Filter function created');
		return result;
	});
	
	// Filter transcripts for list view
	let filteredTranscripts = $derived(dataLoader.transcripts
		.filter(transcript => {
			// Apply search query filter
			if (filterState.value.searchQuery && !transcript.summary.toLowerCase().includes(filterState.value.searchQuery.toLowerCase())) return false;
			
			// Apply expression filter
			return filterFunction(transcript);
		}));

	// Filter tree data with safety check
	let filteredFolderTree = $derived(filterFolderTree(dataLoader.folderTree || [], filterState.value, filterFunction));

	// Count filtered transcripts
	let filteredTranscriptCount = $derived(viewSettings.value.viewMode === 'list' 
		? filteredTranscripts.length 
		: extractAllTranscriptsFromTree(filteredFolderTree).length);
	
	let totalTranscriptCount = $derived(allTranscripts.length);

	function handleTranscriptSelect(transcript: any) {
		// Use the file path directly from transcript metadata and prefix with currentPath if present
		const filePath = transcript._filePath || '';
		const withPrefix = currentPath ? `${currentPath}/${filePath}` : filePath;
		const encodedPath = withPrefix.split('/').map((segment: string) => encodeURIComponent(segment)).join('/');
		window.location.href = `/transcript/${encodedPath}`;
	}

	// Folder expansion is now handled entirely by TranscriptTable
</script>

<svelte:head>
	<title>{currentPath ? `${currentPath} - Petri Transcript Viewer` : 'Petri Transcript Viewer'}</title>
</svelte:head>

<div class="container mx-auto p-4 space-y-6">
	<!-- Breadcrumbs (when viewing subdirectory) -->
	{#if breadcrumbSegments.length > 0}
		<div class="breadcrumbs text-sm animate-slide-in-down">
			<ul>
				<li><a href="/" class="font-mono text-xs transition-colors hover:text-primary">Home</a></li>
				{#each breadcrumbSegments as segment, index}
					<li>
						{#if index === breadcrumbSegments.length - 1}
							<span class="font-mono text-xs font-semibold text-primary">
								{segment.name}
							</span>
						{:else}
							<a
								href="/?path={encodeURIComponent(segment.path)}"
								class="font-mono text-xs transition-colors hover:text-primary"
								title="Navigate to {segment.path}"
							>
								{segment.name}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Header Section -->
	<div class="animate-slide-in-down">
		<div class="bg-gradient-to-r from-base-100 to-base-200 dark:from-base-100 dark:to-base-200 rounded-xl p-6 card-enhanced">
			<div class="flex justify-between items-start gap-4">
				<div>
					<h1 class="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
						Petri Transcript Viewer
					</h1>
					{#if currentPath}
						<p class="text-sm text-base-content/70 mt-2 font-mono">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline mr-1">
								<path fill-rule="evenodd" d="M9.315 7.584a3 3 0 0 1 5.37 0 3 3 0 0 1 3.84 3.915c-.08.583-.324 1.14-.765 1.591a2.25 2.25 0 0 1-1.591.765h7.5a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V9a3 3 0 0 0-3-3H6.75a.75.75 0 0 0 0 1.5h2.565Z" clip-rule="evenodd" />
							</svg>
							{currentPath}
						</p>
					{/if}
				</div>
				<div class="flex items-center gap-4">
					<!-- View Mode Toggle -->
					<ViewModeToggle />

					<div class="badge badge-lg badge-outline gap-2 transition-all hover:scale-105">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
							<path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm2 10.5a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75v-2.25a.75.75 0 0 0-.75-.75H4.25Z" clip-rule="evenodd" />
						</svg>
						{#if dataLoader.loading}
							<span class="animate-pulse">Loading...</span>
						{:else if dataLoader.error}
							Error
						{:else}
							{filteredTranscriptCount} / {totalTranscriptCount}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="animate-slide-in-up">
		<FilterControls
			{scoreTypes}
			filteredCount={filteredTranscriptCount}
			totalCount={totalTranscriptCount}
		/>
	</div>

	<!-- Loading Errors Display -->
	{#if dataLoader.loadingErrors && dataLoader.loadingErrors.length > 0}
		<div class="mb-6 animate-fade-in">
			<ErrorDisplay
				errors={dataLoader.loadingErrors}
				title="File Loading Errors"
				showDetails={false}
			/>
		</div>
	{/if}

	<!-- Content Area -->
	{#if dataLoader.loading && dataLoader.transcripts.length === 0}
		<div class="text-center py-20 animate-fade-in">
			<div class="flex justify-center mb-6">
				<div class="relative w-16 h-16">
					<div class="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
					<div class="absolute inset-2 rounded-full bg-primary/10 animate-pulse" style="animation-delay: 100ms;"></div>
					<div class="absolute inset-4 rounded-full bg-primary/5 animate-pulse" style="animation-delay: 200ms;"></div>
				</div>
			</div>
			<p class="text-lg font-semibold text-base-content mb-2">Loading {viewSettings.value.viewMode === 'list' ? 'transcripts' : 'folder tree'}...</p>
			<p class="text-sm text-base-content/70">This may take a moment</p>
		</div>
	{:else if dataLoader.error}
		<div class="text-center py-20 animate-fade-in">
			<div class="inline-block text-error mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
				</svg>
			</div>
			<p class="text-xl font-bold mb-2">Failed to load {viewSettings.value.viewMode === 'list' ? 'transcripts' : 'folder tree'}</p>
			<p class="text-sm text-base-content/70 mb-6">{dataLoader.error}</p>
			<a href="/" class="btn btn-primary gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
					<path fill-rule="evenodd" d="M9 3a1 1 0 0 1 1 1v6h6V4a1 1 0 0 1 2 0v6h3a1 1 0 0 1 0 2h-3v6a1 1 0 0 1-2 0v-6h-6v6a1 1 0 0 1-2 0v-6H2a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
				</svg>
				Back to Home
			</a>
		</div>
	{:else}
		<!-- Unified Table View -->
		<div class="card-enhanced bg-base-100 shadow-lg border border-base-300/20 animate-scale-in">
			<div class="card-body">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-2xl font-bold flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-primary">
							<path fill-rule="evenodd" d="M3 4.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3ZM3 9.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3ZM3 14.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3ZM3 19.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3Z" clip-rule="evenodd" />
						</svg>
						{viewSettings.value.viewMode === 'tree' ? 'Folder Tree' : 'Transcript List'}
					</h2>
				</div>

				<TranscriptTable
					transcripts={filteredTranscripts}
					folderTree={filteredFolderTree}
					{scoreTypes}
					{scoreDescriptions}
					viewMode={viewSettings.value.viewMode}
					currentPath={currentPath}
					onTranscriptClick={handleTranscriptSelect}
				/>
			</div>
		</div>
	{/if}
</div>