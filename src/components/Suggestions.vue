<template>
    <div class="general">
    <div class="contentbuttonsuggestions">
        <h4>According to your skills we suggest the following Study Item for your career path</h4>
    </div>
    <div class="contentbuttonsuggestionsitem">
        {{ result?.name }}
    </div>
</div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { dataResponse } from "./Api.js"
import { DataItem, Result } from './types';

const suggestions = ref<string[]>([]);

onMounted(() => {
  suggestions.value = dataResponse.value.map((item: DataItem) => item.name);
});

function getRandomNameWithIndex(suggestions: string[]): Result {
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  const name = suggestions[randomIndex];

  return { index: randomIndex, name: name }; 
}


const result = ref<Result | null>(null);

onMounted(() => {
  if (suggestions.value.length > 0) {
    result.value = getRandomNameWithIndex(suggestions.value);
  }
});
</script>

