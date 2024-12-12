<template>
  <div class="modal-window">
    <div class="main">
        <h3>Внесение дохода</h3>
        <form @submit.prevent="sendNewPurchase" action="submit">
            <label for="category">
                Категория:
                <select v-model="selectCategory" name="category">
                  <option v-for="(el, index) in purchasesMain" :key="index" :value="el.category"> {{ el.category }}</option>
                </select>
            </label>
            <label for="date">
                Дата:
                <input v-model="inputDate" name="date" type="date">
            </label>
            <label for="sum">
                Сумма:
                <input v-model="inputSum" name="sum" type="number">
            </label>
            <input type="submit">
        </form>
    </div>
  </div>  
</template>
  
  
  <script>
      import { ref, computed } from "vue";
      import { useStore } from "vuex";
      
      export default {
        setup(props, { emit }) {
          const store = useStore();

          const selectCategory = ref("");
          const inputDate = ref("");
          const inputSum = ref("");
          
          let id = 5;
          const purchasesArr = computed(() => store.getters.purchases)
          const purchasesMain = computed(() => store.getters.purchasesMain)
          console.log(purchasesMain);
          console.log(purchasesMain.value[0].category);
      
          const sendNewPurchase = () => {
            id++
            
            store.commit("createPurchase", {id: id, category: selectCategory.value, date: inputDate.value, sum: inputSum.value })
            emit("changeVis")
            store.commit("operations")
            store.commit("mainOperations")
          }

          return {
            store,
            purchasesArr,
            purchasesMain,
            sendNewPurchase,
            selectCategory,
            inputDate,
            inputSum
          }
        },
        components: {}
      }
    </script>
  
  
  <style scoped>
  .modal-window {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    background-color: #0000007f;
  }
  .main {
    width: 60%;
    padding: 50px 70px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: aliceblue;

  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>