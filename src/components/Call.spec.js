import { render, fireEvent, screen, waitFor } from '@testing-library/vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getItems, handleDeleteItem, handleAddItem, dataResponse, addItem, newName, showModal } from './Api.js';

// Configura el adaptador de mock para axios
const mock = new MockAdapter(axios);

describe('API functions', () => {
  afterEach(() => {
    // Limpia los mocks después de cada prueba
    mock.reset();
  });

  it('fetches items on mount using getItems', async () => {
    // Mock de la respuesta de la API para getItems
    mock.onPost('http://localhost:5000/graphql').reply(200, {
      data: {
        getSkills: [
          { id: 1, name: 'Skill 1', description: 'Description 1' },
          { id: 2, name: 'Skill 2', description: 'Description 2' },
        ],
      },
    });

    // Renderiza el componente (aunque no lo uses directamente aquí, activará onMounted)
    render(() => {}); 

    // Espera a que se complete la llamada a la API y se actualice dataResponse
    await waitFor(() => {
      expect(dataResponse.value).toHaveLength(2);
    });

    // Verifica que los datos se hayan cargado correctamente
    expect(dataResponse.value[0].name).toBe('Skill 1');
    expect(dataResponse.value[1].name).toBe('Skill 2');
  });

  it('adds a new item using handleAddItem', async () => {
    // Mock de la respuesta de la API para addItem
    mock.onPost('http://localhost:5000/graphql').reply(200, {
      data: {
        addSkill: { id: 3, name: 'New Skill', description: '' },
      },
    });

    newName.value = 'New Skill'; // Establece el nuevo nombre

    // Llama a la función handleAddItem
    await handleAddItem();

    // Espera a que se complete la llamada a la API y se actualice dataResponse
    await waitFor(() => {
      expect(dataResponse.value).toHaveLength(1); 
    });

    // Verifica que el nuevo elemento se haya agregado
    expect(dataResponse.value[0].name).toBe('New Skill');
    expect(newName.value).toBe(''); // Verifica que se haya limpiado el input
  });

  it('deletes an item using handleDeleteItem', async () => {
    dataResponse.value = [{ id: 1, name: 'Skill to Delete' }];

    // Mock de la respuesta de la API para deleteItem
    mock.onPost('http://localhost:5000/graphql').reply(200, {
      data: {
        deleteSkill: { id: 1 },
      },
    });

    // Llama a la función handleDeleteItem
    await handleDeleteItem(1);

    // Espera a que se complete la llamada a la API y se actualice dataResponse
    await waitFor(() => {
      expect(dataResponse.value).toHaveLength(0); 
    });
  });

  it('shows modal when adding an empty item', async () => {
    newName.value = ''; // Simula un nombre vacío

    // Llama a la función handleAddItem
    await handleAddItem();

    // Verifica que se muestre el modal
    expect(showModal.value).toBe(true); 
  });
});