<template>

    <button @click="createPurchase">Add purchase</button>

</template>
  
  
  <script>
      import { computed } from "vue";
      import { useStore } from "vuex";
      
      export default {
        setup() {
          let visible = false; 
          const store = useStore();
    
          const purchasesArr = computed(() => store.getters.purchases)
           
          const createPurchase = () => {
  
          }
      
          return {
            store,
            visible,
            purchasesArr,

          }
        },
        components: {}
      }
    </script>
  
  
  <style scoped>
      
  </style>