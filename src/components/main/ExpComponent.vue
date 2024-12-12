<template>
    <div class="rec-exp" @changeChartIncomes="createChart">
      <div class="decoration">
          <img class="img" src="/icons8-улучшение-экономической-ситуации-100.png" alt="#">
          <span>Приходы</span>
      </div>
      <div class="canvas">
        <canvas id="myChart2"></canvas>
      </div>
      
    </div>
  </template>
  
  
  <script>
    import { onMounted, computed } from "vue";
    import Chart from 'chart.js/auto';
    import { useStore } from "vuex";
    
    export default {
      setup() {
        const store = useStore();
        let chart = null;
  
        const incomesArr = computed(() => store.getters.incomesMain)
        console.log(incomesArr);

        const createChart = () => {
          if (chart) {
            console.log("Destroy");
            chart.destroy(); // Destroy the previous chart instance
          }

          const xDataPurch = incomesArr.value.map(item => item.category);
          const yDataPurch = incomesArr.value.map(item => item.sum);

          const data = {
            labels: xDataPurch,
            datasets: [{
              label: "Incomes",
              data: yDataPurch,
              // backgroundColor: ['rgba(75, 192, 192, 0.2)'],
              // borderColor: ['rgba(75, 192, 192, 1)'],
              // borderWidth: 1,
            }]
          };

          const config = {
            type: "doughnut",
            data: data,
            options: {}
          };



          chart = new Chart(document.getElementById("myChart2"), config);
        };

        onMounted(() => {
          store.commit("mainOperationsIncomes");
          createChart();
        });

        store.subscribe((mutation, newIncome) => {
          if (mutation.type == "mainOperationsIncomes") {
            createChart();
          } 
          // else if (mutation.type == "changeArrayIncomes") {
          //   createChart();
            
          // }
        })
  
  
          return {
            store,
            incomesArr,
            createChart,
            chart
            
          }
      },
      components: {}
    }
  
    
  
    
  </script>
  
  
  <style scoped>
    .rec-exp {
      width: 45%;
      min-height: 500px;
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
      gap: 10px;
      padding-left: 30px;
      background-color: #e9e7e7;
      font-size: 21px;
    }
    .canvas {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #myChart2 {
      width: 500px !important;
      height:500px !important;
      margin-bottom: 25px;
    }
    .img {
      width: 40px;
      height: 40px;
    }
  </style>