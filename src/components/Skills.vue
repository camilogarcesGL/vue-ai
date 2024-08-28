
<template>
    <div class="flex flex-col mb-12">
        <div v-for="skill in skillsAll" :key="skill" class="flex items-center mb-6">
            <li>{{ skill }}</li>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const skillsAll = ref([
    'React',
        'Javascript',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'PostgreSQL',   
]);

</script>

<style>

</style>