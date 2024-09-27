<script setup>
import { ref } from 'vue';
import CallGraphQL from './CallGraphQL.vue';
import Componentesuggestion from './Suggestions.vue';
const activeTab = ref('skills'); 
</script>

<template>
 <div class="bg-gray-100 p-4 rounded-lg shadow-md">
  <nav class="navbar">
    <div class="contentTabs">
      <div class="tab skills" :class="{ 'active': activeTab === 'skills' }" @click="activeTab = 'skills'">Skills</div>
      <div class="tab suggestions" :class="{ 'active': activeTab === 'suggestions' }" @click="activeTab = 'suggestions'">Suggestions</div>
    </div>
  </nav>
  </div>

<div class="generalContent">
  <div class="contentSkills" v-if="activeTab === 'skills'">
    <CallGraphQL />
  </div>
  <div class="contentSuggestions" v-if="activeTab === 'suggestions'">
    <Componentesuggestion></Componentesuggestion>
  </div>
</div>


</template>

