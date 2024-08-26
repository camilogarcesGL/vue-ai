<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('skills'); 
</script>

<template>
 <div class="bg-gray-100 p-4 rounded-lg shadow-md">
  <nav class="navbar">
    <div class="contentTabs">
      <div class="tab skills" :class="{ 'active': activeTab === 'skills' }" @click="activeTab = 'skills'">Skills</div>
      <div class="tab suggestions" :class="{ 'active': activeTab === 'suggestions' }" @click="activeTab = 'suggestions'">suggestions</div>
    </div>
  </nav>
  </div>

<div class="generalContent">
  <div class="contentSkills" v-if="activeTab === 'skills'">Content Skills</div>
  <div v-if="activeTab === 'suggestions'"> Content Suggestions</div>
</div>


</template>

<style>
.contentTabs {
  display: flex;
  justify-content: flex-end;
}
.generalContent {
  display: flex;
  justify-content: flex-end;
}

.contentSkills {
  background-color: #999;
  margin: 4px;
  width: 50%;
}

.skills {
  margin: 4px;
}
.suggestions{
  margin: 4px;
}
</style>