<template>
  <div class="rec-exp">
    <div class="decoration">
        <img src="" alt="#">
        <span>Приходы и расходы</span>
    </div>
  </div>
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
    .rec-exp {
    width: 65%;
    min-height: 300px;
    border: 3px solid #e9e7e7;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: 50px;
  }
  .decoration {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    background-color: #e9e7e7;
    font-size: 21px;
  }
</style>