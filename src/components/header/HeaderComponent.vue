<template>
  <header class="header">
    <span>Учет расходов</span>
    <div class="info">
        <button class="btn" @click="createIncome">Add income</button>
        <button class="btn" @click="createPurchase">Add purchase</button>
    </div>
    <div class="info">
        <span>Шамилов Эмирхан</span>
    </div>
  </header>

  <ModalPur @changeVis="createPurchase" v-if="visiblePurchaseForm == false"/>
  <ModalExp @changeVis="createIncome" v-else-if="visibleIncomesForm == false"/>
</template>


<script>
    import { ref, computed } from "vue";
    import { useStore } from "vuex";
    import ModalPur from "./ModalPurComponent.vue";
    import ModalExp from "./ModalExpComponent.vue";
    
    export default {
      setup() {
        const store = useStore();

        const visiblePurchaseForm = ref(true);
        const visibleIncomesForm = ref(true);
  
        const purchasesArr = computed(() => store.getters.purchases)
        const incomesArr = computed(() => store.getters.incomes)

        const createPurchase = () => {
          visiblePurchaseForm.value = !visiblePurchaseForm.value
          
        }

        const createIncome = () => {
          visibleIncomesForm.value = !visibleIncomesForm.value
        }
    
        return {
          store,
          createPurchase,
          createIncome,
          visiblePurchaseForm,
          visibleIncomesForm,
          purchasesArr,
          incomesArr,
        }
      },
      components: {ModalExp, ModalPur}
    }
  </script>


<style scoped>
    .header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        padding: 0 60px 0 ;
        align-items: center;
        background-color: #f7f7f7;
        position: relative;
        
    }
    .info {
        display: flex;
        align-items: center;
        gap: 50px;
    }
</style>