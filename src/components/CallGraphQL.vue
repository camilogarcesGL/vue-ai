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
        <li v-for="name in dataResponse" :key="name._id">
          {{name.name}}
          <button class="" type="button" @click="handleDeleteItem(name._id)">
            <svg class="w-[15px] h-[15px] text-gray-800 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
<script setup>
import { ref, onMounted }    from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mis_skills';
const dataResponse = ref([]);
const newName = ref('');
const showModal = ref(false);

const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    dataResponse.value = response.data;
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

const addItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
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
};
}
const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

const handleDeleteItem = async (id) => {
  const deletedItem = await deleteItem(id);
  if (deletedItem) {
    dataResponse.value = dataResponse.value.filter(item => item._id !== id);
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