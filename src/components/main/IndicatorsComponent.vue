<template>
  <div class="indicators">
    <div class="indicator coming">
        <h2>{{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(incomes)}}</h2>
        <span>Приходы</span>
    </div>

    <div class="indicator balance">
        <h2>{{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(balance)}}</h2>
        <span>Баланс</span>
    </div>

    <div class="indicator expenses">
        <h2>{{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(purchases)}}</h2>
        <span>Расходы</span>
    </div>
  </div>
</template>


<script>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";

    export default {
        setup() {
            const store = useStore();
            const purchases = computed(() => store.getters.sumPurchases)
            const incomes = computed(() => store.getters.sumIncomes)
            const balance = computed(() => store.getters.balance)



            return {
                store,
                purchases,
                incomes,
                balance
            }
        }
    }

    

  components: {}
</script>


<style scoped>
    .indicators {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .indicator {
        width: 400px;
        height: 150px;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-around;
        color: white;
        border-radius: 10px;
        padding: 20px;
        font-size: 24px;
    }
    .coming {
        background-color: #5cb85d;
    }
    .balance {
        background-color: #337ab6;
    }
    .expenses {
        background-color: #d8534e;
    }
    .indicator span {
        font-size: 28px;
    }
</style>