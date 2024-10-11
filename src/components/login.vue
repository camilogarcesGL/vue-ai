<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({ 
    name: {
        type: String,
    },
})

const inputName = ref<string>("example 1") //null
const inputPassword = ref<string>("example 2") //null
const handleLogin = () => {
    console.log(inputName, inputPassword)
}
</script>

<template>
    <div class="contentLogin">
        <div class="login">
            <h2>Please Authenticated</h2>
            <label>Name:</label>
            <input class= "input-with-padding" type="text" v-model="inputName" />
            <label>Password:</label>
            <input class="input-with-padding" type="password"  v-model="inputPassword" />
            <button  class="classbuttonadded" type="button" @click="handleLogin">Login</button>
        </div>
        <div>
     
        </div>
    </div>

</template>