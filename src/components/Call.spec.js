import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { handleAddItem, newName, showModal } from './Api.js';


const mock = new MockAdapter(axios);

describe('API functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('get new item', async () => {
    newName.value = '';
    expect(newName.value).toHaveLength(0); 
  });


  it('shows modal when adding an empty item', async () => {
    await handleAddItem();
    expect(showModal.value).toBe(true); 
  });
});