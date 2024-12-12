<template>
  <div class="wrapper">
    <Header />
    <Main />
  </div>
</template>


<script>
  import { onMounted, onUnmounted, onBeforeMount, onUpdated } from "vue";
  import Header from "./components/header/HeaderComponent.vue"
  import Main from "./components/main/MainComponent.vue"
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  
  
  export default {
    
    setup() {
      const store = useStore();

      const purchasesArr = computed(() => store.getters.purchases)
      const incomesArr = computed(() => store.getters.incomes)
      
      const operations = onMounted(() => {
        store.commit("operations")
        console.log(JSON.parse(localStorage.getItem("incomes")));
        console.log(JSON.parse(localStorage.getItem("purchases")));
        if (JSON.parse(localStorage.getItem("incomes"))) {
          
          if (JSON.parse(localStorage.getItem("incomes")).length != 5) {
            store.commit("changeArrayIncomes")
            console.log("Данные есть в incomes");
          }

        }

        if (JSON.parse(localStorage.getItem("purchases"))) {

          if (JSON.parse(localStorage.getItem("purchases")).length != 6) {
            store.commit("changeArrayPurchases")
            console.log("Данные есть в purchases");
          }

        }
      })

      // const mainOperations = onBeforeMount(() => {
      //   store.commit("mainOperations")
      // })

      // const mainOperations2 = onUpdated(() => {
      //   store.commit("mainOperations")
      //   console.log("mainOperations - onUpdated");
      // })

      return {
        store,
        operations,
        purchasesArr,
        incomesArr,
      }
    },
    components: {Header, Main}
  }

  

  
</script>


<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .btn {
    padding: 7px;
    background-color: #f7f7f7;
    border: 1px solid #01d1b2;
    color: #01d1b2;
    transition: 0.5s;
  }
  .btn:hover {
    background-color: #01d1b2;
    border: 1px solid white;
    color: white;
    transform: scale(0.99);
  }

</style>
