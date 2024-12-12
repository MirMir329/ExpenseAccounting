<template>
    <div class="rec-exp">
      <div class="decoration">
        <div class="for-decoration">
          <img class="img" src="/icons8-счет-фактура-100.png" alt="#">
          <span>Список приходов</span>
        </div>
        <div class="for-decoration">
          Самый большой доход: {{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(theLargestPurchase)}}
        </div>
      </div>
      <div class="list">
        <div class="line" v-for="(el, index) in incomesArr">
          <img class="img" v-if="el.category == 'Трудовой'" src="/icons8-портфель-100.png" alt="#">
          <img class="img" v-if="el.category == 'Незаработанный'" src="/icons8-перевод-денег-100.png" alt="#">
          

          <span>Сумма: {{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(el.sum)}}</span>

          <span>Дата: {{ el.date }}</span>

          <button class="btn" @click="deleteIncome(el.id)">Удалить</button>
        </div>
      </div>
      
    </div>
  </template>
  
  
  <script>
    import { computed, onMounted } from "vue";
    import { useStore } from "vuex";
    
    export default {
      setup(props, { emit }) {
        const store = useStore();
  
        const incomesArr = computed(() => store.getters.incomes)

        onMounted(() => {
          store.commit("theLargestIncome");
        });

        const theLargestPurchase = computed(() => store.getters.largestIncome)

        store.subscribe((mutation) => {
          if (mutation.type == "createIncome") {
            store.commit("theLargestIncome");
            localStorage.setItem("incomes", JSON.stringify(incomesArr.value))
          } else if(mutation.type == "deleteIncome") {
            store.commit("operations")
            store.commit("mainOperationsIncomes")
            store.commit("theLargestIncome");
            localStorage.setItem("incomes", JSON.stringify(incomesArr.value))
          } else if (mutation.type == "changeArrayIncomes") {
            store.commit("operations")
            store.commit("mainOperationsIncomes")
            store.commit("theLargestIncome");
          }
        })

        const deleteIncome = (id) => {
          store.commit("deleteIncome", id)
          emit("changeChartIncome")
        }
    
        return {
            store,
            incomesArr,
            theLargestPurchase,
            deleteIncome,
        }
      },
      components: {}
    }
  </script>
  
  
  <style scoped>

    .rec-exp {
      width: 50%;
      min-height: 300px;
      border: 3px solid #e9e7e7;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .decoration {
      width: 100%;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      background-color: #e9e7e7;
      font-size: 21px;
    }
    .for-decoration {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      overflow-y: scroll;

    }
    .img {
      width: 50px;
      height: 50px;
    }
    .line {
      width: 90%;
      display: flex;
      padding: 7px 0;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      border-top: 1px solid #e9e7e7;
      border-bottom: 1px solid #e9e7e7;

    }
  </style>