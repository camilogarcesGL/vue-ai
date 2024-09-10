<template>
    <div class="general">
    <div class="contentbuttonsuggestions">
        <h4>According to your skills we suggest the following Study Item for your career path</h4>
    </div>
    <div class="contentbuttonsuggestionsitem">
        {{ result.name }}
    </div>
</div>
</template>


<script setup>

const suggestions = ['Node', 'GraphQL', 'FullStack', 'Stack MERN', 'NodeJs', 'AWS3', 'Docker', 'VUE'];

function getRandomNameWithIndex(suggestions) {
 
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  const name = suggestions[randomIndex];

  return { index: randomIndex, name: name }; 
}


const result = getRandomNameWithIndex(suggestions);

</script>

<style>
.linear {
    background-color: #f6f6f6;
    height: 50px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    color: white;
    font-size: 24px;
}
</style>