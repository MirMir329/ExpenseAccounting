<template>

    <button @click="createIncome">Add income</button>

    <div v-if="visible == true" class="modal-window">
        <div class="main">
            <h3>Внесение дохода</h3>
            <form action="submit">
                <label for="category">
                    Категория:
                    <select name="category">
                        <option v-for="(el, index) in incomesMain" :key="index" :value="el.category">{{ el.category.toUpperCase() }}</option>
                    </select>
                </label>
                <label for="date">
                    Дата:
                    <input name="date" type="date">
                </label>
                <label for="sum">
                    Сумма:
                    <input name="sum" type="number">
                </label>
            </form>
        </div>
    </div>

  </template>
  
  
  <script>
      import { computed } from "vue";
      import { useStore } from "vuex";
      
      export default {
        setup() {
          let visible = false;
          const store = useStore();
    
          const incomesArr = computed(() => store.getters.incomes)
          const incomesMain = computed(() => store.getters.incomes)
  
          const createIncome = () => {
            visible = !visible
            console.log("Changed", visible);
          }
      
          return {
            store,
            createIncome,
            incomesArr,
            visible,
            incomesMain
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

      }
  </style>