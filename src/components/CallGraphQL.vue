<template>
    <div class="classbutton">
      <input v-model="newName" type="text" placeholder=" New skill">
      <button  class="classbuttonadded" type="button">
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
        <li v-for="name in dataResponse" :key="name">
          {{name.name}}
        </li>
      </ul>
    </div>
  </template>
  
<script setup>
import { ref, onMounted }    from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mis_skills';
const dataResponse = ref([]);

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