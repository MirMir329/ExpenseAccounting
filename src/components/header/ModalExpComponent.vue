<template>
  <div class="modal-window">
      <div class="main">
          <h3>Внесение дохода</h3>
          <form @submit.prevent="sendNewIncome" class="form" action="submit">
              <label for="category">
                  Категория:
                  <select v-model="selectCategory" name="category">
                    <option v-for="(el, index) in incomesMain" :key="index" :value="el.category">{{ el.category }}</option>
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
        setup(props, {emit}) {
          const store = useStore();

          const selectCategory = ref("");
          const inputDate = ref("");
          const inputSum = ref("");
          let id = 4;
          console.log(selectCategory);
    
          const incomesArr = computed(() => store.getters.incomes)
          const incomesMain = computed(() => store.getters.incomesMain)
  
          const sendNewIncome = () => {
            id++
            console.log(selectCategory);
            store.commit('createIncome', {id: id, category: selectCategory.value, date: inputDate.value, sum: inputSum.value })
            emit("changeVis")
            store.commit("operations")
            store.commit("mainOperationsIncomes")
          }
      
          return {
            store,
            incomesArr,
            incomesMain,
            sendNewIncome,
            selectCategory,
            inputDate,
            inputSum,
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
        width: 40%;
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