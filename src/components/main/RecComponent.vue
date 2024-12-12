<template>
  <div class="rec-exp">
    <div class="decoration">
        <img class="img" src="/icons8-улучшение-экономической-ситуации-100.png" alt="#">
        <span>Расходы</span>
    </div>
    <div class="canvas">
      <canvas id="myChart" ></canvas>
    </div>
    
  </div>
</template>


<script>
  import { onMounted, computed, onBeforeMount, watch } from "vue";
  import Chart from 'chart.js/auto';
  import { useStore } from "vuex";

  
  export default {
    setup() {
      const store = useStore();
      let chart = null;

      const purchasesMain = computed(() => store.getters.purchasesMain);

      console.log("Just", purchasesMain.value);

      // Function to create the chart
      const createChart = () => {

        console.log("In createChart", purchasesMain.value);

        if (chart) {
          console.log("Destroy");
          chart.destroy(); // Destroy the previous chart instance
        }

        const xDataPurch = purchasesMain.value.map(item => item.category);
        const yDataPurch = purchasesMain.value.map(item => item.sum);

        const data = {
          labels: xDataPurch,
          datasets: [{
            label: "Purchases",
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

        

        chart = new Chart(document.getElementById("myChart"), config);
      };

      // Call mainOperations on component mount
      onMounted(() => {
        store.commit("mainOperations");
        createChart();
      });

      // // Watch for changes in purchasesMain and update the chart
      // watch(purchasesMain, () => {
      //   createChart();
      // });

      store.subscribe((mutation, newPurchase) => {
        if (mutation.type == "mainOperations") {
          createChart();
        } 
        // else if (mutation.type == "changeArrayPurchases") {
        //   createChart();
          
        // }
      })

      return {
        store,
        createChart,
        chart,
        purchasesMain
        
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
    gap: 10px;
    align-items: center;
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
  #myChart {
    width: 500px !important;
    height:500px !important;
    margin-bottom: 25px;
  }
  .img {
    width: 40px;
    height: 40px;
  }
  
</style>