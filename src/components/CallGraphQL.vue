<script setup>
  import { onMounted } from 'vue';
  import { getItems, handleDeleteItem, handleAddItem, dataResponse,addItem, newName, showModal } from "./Api.js"
  onMounted(() => {
    getItems();
  });
</script>

<template>
    <div class="classbutton">
      <input v-model="newName" type="text" placeholder=" New skill" class="input-with-padding">
      <button  class="classbuttonadded" type="button" @click="handleAddItem">Add</button>
    </div>
  
    <div v-if="showModal" class="modal"> 
      <div class="modal-content">
        <p>Please enter a skill before add</p>
        <button class="classbuttonclosed" type="button" @click="showModal = false">Close</button>
      </div>
    </div>

    <div class="contentbuttonskill">
      <ul>
        <li class="listSkill" v-for="item in dataResponse" :key="item.id">
          <div class="skilltext">{{item.name}}</div>
          <button type="button" @click="handleDeleteItem(item.id)">
            <svg class="iconDelete w-[15px] h-[15px] text-gray-800 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
</template>
  