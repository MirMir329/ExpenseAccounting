<template>
  <header class="header">
    <span>Учет расходов</span>
    <div class="info">
        <button>Add purchase</button>
        <button>Add income</button>
    </div>
    <div class="info">
        <span>417 руб.</span>
        <span>Шамилов Эмирхан</span>
    </div>
  </header>
</template>


<script>
   

   export default {
    setup() {
        

        return {

        }
    },
    components: {}
   }

  

  
</script>


<style scoped>
    .header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        padding: 0 60px 0 ;
        align-items: center;
        background-color: #f7f7f7;
        
    }
    .info {
        display: flex;
        align-items: center;
        gap: 50px;
    }
</style>