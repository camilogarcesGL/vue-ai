<script setup lang="ts">
import { ref } from 'vue';
import { TabName } from './types';
const activeTab = ref<TabName>('skills'); 
</script>

<template>
  <nav class="navbar">
    <div class="tabs">
      <div class="tab" :class="{ 'active': activeTab === 'skills' }" @click="activeTab = 'skills'">Skills</div>
      <div class="tab" :class="{ 'active': activeTab === 'suggestions' }" @click="activeTab = 'suggestions'">Suggestions</div>
    </div>
    <div class="content">
      <div v-if="activeTab === 'skills'">Content Skills</div>
      <div v-if="activeTab === 'suggestions'">Content Suggestions</div>
    </div>
  </nav>
</template>
