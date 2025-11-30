<script lang="ts">
  import { filterState } from '$lib/client/stores';
  import { 
    validateFilterExpression, 
    getFilterExamples, 
    getAvailableFields, 
    getCurrentWord, 
    getAutocompleteSuggestions 
  } from '$lib/shared/filter-utils';

  interface Props {
    scoreTypes: string[];
    filteredCount: number;
    totalCount: number;
  }

  let { scoreTypes, filteredCount, totalCount }: Props = $props();

  // Autocomplete state
  let filterInput: HTMLInputElement;
  let showAutocomplete = $state(false);
  let autocompleteIndex = $state(-1);
  let currentWord = $state({ word: '', startPos: 0, endPos: 0 });
  let suggestions = $state<string[]>([]);

  // Get filter examples for help
  let filterExamples = $derived(getFilterExamples());
  
  // Get available fields for autocomplete
  let availableFields = $derived(getAvailableFields(scoreTypes));
  
  // Validate filter expression
  let filterError = $derived.by(() => {
    return validateFilterExpression(filterState.value.filterExpression);
  });

  // Autocomplete functions
  function updateAutocomplete() {
    if (!filterInput) return;
    
    const cursorPosition = filterInput.selectionStart || 0;
    const text = filterState.value.filterExpression || '';
    
    currentWord = getCurrentWord(text, cursorPosition);
    suggestions = getAutocompleteSuggestions(currentWord.word, availableFields);
    
    showAutocomplete = suggestions.length > 0 && currentWord.word.length > 0;
    autocompleteIndex = -1;
  }

  function handleFilterInput() {
    updateAutocomplete();
  }

  function handleFilterKeydown(event: KeyboardEvent) {
    if (!showAutocomplete) return;
    
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      autocompleteIndex = Math.min(autocompleteIndex + 1, suggestions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      autocompleteIndex = Math.max(autocompleteIndex - 1, -1);
    } else if (event.key === 'Enter' && autocompleteIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[autocompleteIndex]);
    } else if (event.key === 'Escape') {
      showAutocomplete = false;
      autocompleteIndex = -1;
    }
  }

  function selectSuggestion(suggestion: string) {
    const text = filterState.value.filterExpression || '';
    const newText = text.slice(0, currentWord.startPos) + suggestion + text.slice(currentWord.endPos);
    
    filterState.value.filterExpression = newText;
    showAutocomplete = false;
    autocompleteIndex = -1;
    
    // Set cursor position after the inserted suggestion
    setTimeout(() => {
      if (filterInput) {
        const newCursorPos = currentWord.startPos + suggestion.length;
        filterInput.setSelectionRange(newCursorPos, newCursorPos);
        filterInput.focus();
      }
    }, 0);
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (!target.closest('.autocomplete-container')) {
      showAutocomplete = false;
      autocompleteIndex = -1;
    }
  }
</script>

<div class="card-enhanced bg-base-100 shadow-lg border border-base-300/20">
  <div class="card-body">
    <h2 class="text-xl font-bold flex items-center gap-2 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-primary">
        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375v3.026a4.5 4.5 0 0 0 3.78 4.454c.75.090 1.404.930 1.404 1.681v2.034c0 .980.625 1.823 1.5 2.122V21h9v-1.933c.875-.299 1.5-1.142 1.5-2.122v-2.034c0-.75.654-1.591 1.404-1.681A4.5 4.5 0 0 0 22.5 9.401V6.375C22.5 5.34 21.661 4.5 20.625 4.5H3.375Z" />
      </svg>
      Filters
    </h2>

    <!-- Search Query -->
    <div class="form-control mb-6">
      <label class="label pb-2">
        <span class="label-text font-semibold">Search in summary</span>
      </label>
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
          <path fill-rule="evenodd" d="M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM2 10.5a8.5 8.5 0 1 1 15.362 5.362l3.968 3.968a.75.75 0 1 1-1.06 1.06l-3.968-3.968A8.5 8.5 0 0 1 2 10.5Z" clip-rule="evenodd" />
        </svg>
        <input
          type="text"
          placeholder="Search transcripts..."
          class="input input-animated input-bordered w-full pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
          bind:value={filterState.value.searchQuery}
        />
      </div>
    </div>

    <!-- Filter Expression -->
    <div class="form-control mb-6 autocomplete-container relative">
      <label class="label pb-2">
        <div class="flex items-center gap-2">
          <span class="label-text font-semibold">Advanced Filter Expression</span>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-xs btn-circle transition-smooth hover:bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="dropdown-content z-[1] menu p-3 shadow-lg bg-base-100 rounded-xl w-80 border border-base-300/20 animate-slide-down">
              <div class="text-sm">
                <h3 class="font-bold mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-primary">
                    <path fill-rule="evenodd" d="M2.25 12c0-6.215 5.034-11.25 11.25-11.25S24.75 5.785 24.75 12s-5.034 11.25-11.25 11.25S2.25 18.215 2.25 12Zm9-4.5a.75.75 0 1 1 1.5 0V9h1.5a.75.75 0 1 1 0 1.5H13v1.5a.75.75 0 1 1-1.5 0V10.5H9.75a.75.75 0 0 1 0-1.5H11V7.5Z" clip-rule="evenodd" />
                  </svg>
                  Filter Examples
                </h3>
                <ul class="space-y-2">
                  {#each filterExamples as example}
                    <li class="p-2 rounded-lg hover:bg-base-200/50 transition-smooth">
                      <code class="text-xs bg-base-300 px-2 py-1 rounded font-mono block mb-1">{example.expression}</code>
                      <span class="text-xs text-base-content/70">{example.description}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </label>

      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
          <path fill-rule="evenodd" d="M9.315 7.584a3 3 0 0 1 5.37 0 3 3 0 0 1 3.84 3.915c-.08.583-.324 1.14-.765 1.591a2.25 2.25 0 0 1-1.591.765h7.5a.75.75 0 0 1 0 1.5h-7.5a2.25 2.25 0 0 1-1.591-.765.75.75 0 0 1-.094-1.025 2.25 2.25 0 1 0-3.612 2.115 1.5 1.5 0 0 0 1.296 2.231h.144c.800 0 1.542-.235 2.165-.654a.75.75 0 0 0-1.33-.75c-.433.324-1.001.5-1.6.5-.426 0-.834-.102-1.205-.301-1.02-.573-1.8-1.568-1.8-2.699 0-1.130.78-2.126 1.8-2.698.37-.2.78-.302 1.205-.302 1.02 0 1.926.451 2.55 1.169a.75.75 0 0 0 1.33-.75A3.75 3.75 0 1 0 9.315 7.584Z" clip-rule="evenodd" />
        </svg>
        <input
          bind:this={filterInput}
          type="text"
          placeholder="e.g., concerningScore > 5 && model = 'claude-3.5'"
          class="input input-animated input-bordered w-full pl-10 transition-smooth {filterError ? 'input-error focus:ring-2 focus:ring-error/20' : 'focus:ring-2 focus:ring-primary/20'}"
          bind:value={filterState.value.filterExpression}
          oninput={handleFilterInput}
          onkeydown={handleFilterKeydown}
          autocomplete="off"
        />
      </div>

      {#if filterError}
        <label class="label mt-2">
          <span class="label-text-alt text-error flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.5 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6.5 7.5a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm1.75-5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" clip-rule="evenodd" />
            </svg>
            {filterError}
          </span>
        </label>
      {/if}

      <!-- Autocomplete dropdown -->
      {#if showAutocomplete}
        <div class="absolute top-full left-0 right-0 bg-base-100 border border-base-300/50 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto mt-1 animate-slide-down">
          {#each suggestions as suggestion, index}
            <button
              type="button"
              class="w-full text-left px-4 py-2.5 hover:bg-primary/10 transition-smooth {index === autocompleteIndex ? 'bg-primary/20 text-primary' : ''} border-b border-base-300/20 last:border-b-0"
              onclick={() => selectSuggestion(suggestion)}
            >
              <code class="text-sm font-mono">{suggestion}</code>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Results Counter and Clear Button -->
    <div class="flex justify-between items-center pt-4 border-t border-base-300/20">
      <div class="flex items-center gap-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-primary">
          <path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm2 10.5a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75v-2.25a.75.75 0 0 0-.75-.75H4.25Z" clip-rule="evenodd" />
        </svg>
        <span class="font-semibold">
          Showing <span class="text-primary font-bold">{filteredCount.toLocaleString()}</span> of <span class="font-bold">{totalCount.toLocaleString()}</span>
        </span>
      </div>
      {#if filteredCount !== totalCount}
        <button
          class="btn btn-sm btn-ghost gap-1 transition-smooth hover:bg-base-200"
          onclick={() => {
            filterState.value.searchQuery = '';
            filterState.value.filterExpression = '';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M9.195 18.44c.478.645.738 1.032.938 1.38.2.348.181.72-.039 1.053a1.713 1.713 0 0 1-1.453.605H5.07a2 2 0 0 1-2-2v-.5a6 6 0 0 1 9.356-5.475m0 0a6 6 0 0 0 8.294 5.975" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
          Clear filters
        </button>
      {/if}
    </div>
  </div>
</div>

<svelte:window onclick={handleClickOutside} />