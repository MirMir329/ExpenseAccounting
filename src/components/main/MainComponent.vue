<template>
  <main class="main">
    <h1>Дашборд</h1>
    <div class="line"></div>
    <div class="for-main-info">
      <div class="decoration"><span>Ключевые показатели</span></div>
      <Indicators/>
      <div class="main-info">
        <div class="info">
          <Receipts/>
          <ReceiptsList/>
        </div>
        <div class="info">
          <Expenses/>
          <ExpensesList @changeChartIncome="changeChartIncomes"/>
        </div>
      </div>  
    </div>
  </main>
</template>


<script>
  import Receipts from "./RecComponent.vue"
  import Expenses from "./ExpComponent.vue"
  import Indicators from "./IndicatorsComponent.vue"
  import ExpensesList from "./ExpListComponent.vue"
  import ReceiptsList from "./RecListComponent.vue"

  export default {
    setup(props, { emit }) {

      const changeChartIncomes = () => {
        emit("changeChartIncomes")
      }

      return {
        changeChartIncomes
      }
    },
    components: {Receipts, Indicators, Expenses, ExpensesList, ReceiptsList}

  }

  

  
</script>


<style scoped>
  .main {
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    
  }
  h1 {
    font-size: 44px;
  }
  .line {
    width: 90%;
    height: 3px;
    background-color: #f0f0f0;
  }
  .for-main-info {
    width: 100%;
    min-height: 600px;
    border: 5px solid #e9e7e7;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 35px;
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
  .info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .main-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
</style>