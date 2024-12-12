<template>
    <div class="rec-exp">
      <div class="decoration">
        <div class="for-decoration">
          <img class="img" src="/icons8-счет-фактура-100.png" alt="#">
            <span>Список расходов</span>
        </div>

        <!-- <select @change="showPurchasesForPeriod" class="select" v-model="selectPeriod">
          <option disabled>Выберите фильтр</option>
          <option value="nearThree">Ближайшие 3 дня</option>
          <option value="nearSeven">Ближайшие 7 дней</option>
          <option value="choosePeriod">Выбрать период</option>
        </select> -->
            
        <div class="for-decoration">
          Самый большой расход: {{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(theLargestPurchase)}}
        </div>
      </div>
      <div class="list">
        <div class="line" v-for="(el, index) in purchasesArr">
          <img class="img-products" v-if="el.category == 'Продукты питания'" src="/icons8-ingredients-30.png" alt="#">
          <img class="img" v-if="el.category == 'Коммунальные услуги'" src="/icons8-счет-фактура-100.png" alt="#">
          <img class="img" v-if="el.category == 'Одежда и обувь'" src="/icons8-джемпер-100.png" alt="#">

          <span>Сумма: {{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "KZT"}).format(el.sum)}}</span>

          <span>Дата: {{ el.date }}</span>

          <button class="btn" @click="deletePurchase(el.id)">Удалить</button>
        </div>
      </div>
      
    </div>
  </template>
  
  
  <script>
    import { computed, onMounted, ref } from "vue";
    import { useStore } from "vuex";
    
    export default {
      setup() {
        const store = useStore();
  
        const purchasesArr = computed(() => store.getters.purchases)

        const selectPeriod = ref("");

        onMounted(() => {
          store.commit("theLargestPurchase");
        });

        const theLargestPurchase = computed(() => store.getters.largestPurchase)

        const deletePurchase = (id) => {
          store.commit("deletePurchase", id)
        }

        const showPurchasesForPeriod = () => {
          if (selectPeriod.value == "nearThree") {
            store.commit("nearThree")
          } else if (selectPeriod.value == "nearSeven") {
            store.commit("nearSeven")
          }
          //  else if (selectPeriod.value == "choosePeriod") {
          //   store.commit("choosePeriod")
          // }
        }

        store.subscribe((mutation) => {
          if (mutation.type == "createPurchase") {
            store.commit("theLargestPurchase");
            console.log(purchasesArr);
            localStorage.setItem("purchases", JSON.stringify(purchasesArr.value))
          } else if(mutation.type == "deletePurchase") {
            store.commit("operations")
            store.commit("mainOperations")
            store.commit("theLargestPurchase");
            console.log(purchasesArr);
            localStorage.setItem("purchases", JSON.stringify(purchasesArr.value))
          } else if (mutation.type == "changeArrayPurchases") {
            store.commit("operations")
            store.commit("mainOperations")
            store.commit("theLargestPurchase");
          } else if (mutation.type == "nearThree" || mutation.type == "nearSeven") {
            store.commit("operations")
            store.commit("mainOperations")
            store.commit("theLargestPurchase");
          }
        })
    
        return {
          store,
          purchasesArr,
          theLargestPurchase,
          deletePurchase,
          selectPeriod,
          showPurchasesForPeriod
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
    .img-products {
      width: 45px;
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