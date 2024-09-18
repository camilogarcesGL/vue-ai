import { ref } from 'vue';
import axios from 'axios';
  
  const API_URL = 'http://localhost:5000/graphql';
  export const dataResponse = ref([]);
  export const newName = ref('');
  export const showModal = ref(false);
  
  export const getItems = async () => {
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
  
  export const addItem = async (item) => {
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
  
  export const handleAddItem = async () => {
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
  
  export const deleteItem = async (id) => {
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
  
  export const handleDeleteItem = async (id) => {
    const deletedItem = await deleteItem(id);
    if (deletedItem) {
      dataResponse.value = dataResponse.value.filter(item => item.id !== id);
    }
  };