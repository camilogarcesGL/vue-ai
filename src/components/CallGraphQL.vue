<template>
    <div class="classbutton">
      <input v-model="newName" type="text" placeholder=" New skill">
      <button  class="classbuttonadded" type="button" @click="handleAddItem">
        <span>Add</span>
      </button>
    </div>
  
    <div v-if="showModal" class="modal"> 
      <div class="modal-content">
        <p>Please enter a skill before add.</p>
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
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const API_URL = 'http://localhost:5000/graphql';
  const dataResponse = ref([]);
  const newName = ref('');
  const showModal = ref(false);
  
  const getItems = async () => {
    try {
      const query = `
        query {
          getSkills {
            id
            name
            description
          }
        }
      `;
      const response = await axios.post(API_URL, { query });
      dataResponse.value = response.data.data.getSkills;
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  const addItem = async (item) => {
    try {
      const mutation = `
        mutation {
          addSkill(name: "${item.name}", description: "${item.description || ''}") {
            id
            name
            description
          }
        }
      `;
      const response = await axios.post(API_URL, { query: mutation });
      return response.data.data.addSkill;
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  const handleAddItem = async () => {
    if (!newName.value.trim()) {
      showModal.value = true;
      return;
    }
  
    const newItem = { name: newName.value.trim() };
  
    const addedItem = await addItem(newItem);
    if (addedItem) {
      dataResponse.value.push(addedItem); 
      newName.value = '';
    }
  };
  
  const deleteItem = async (id) => {
    try {
      const mutation = `
        mutation {
          deleteSkill(id: "${id}") {
            id
          }
        }
      `;
      const response = await axios.post(API_URL, { query: mutation });
      return response.data.data.deleteSkill;
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  const handleDeleteItem = async (id) => {
    const deletedItem = await deleteItem(id);
    if (deletedItem) {
      dataResponse.value = dataResponse.value.filter(item => item.id !== id);
    }
  };
  
  onMounted(() => {
    getItems();
  });
  </script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center; 
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
}
</style> 