import {createStore} from "vuex";


const store = createStore({
    state: {
        purchasesMain: 
        [ {category: "Продукты питания", sum: 0}, {category: "Коммунальные услуги", sum: 0}, {category: "Одежда и обувь", sum: 0}],
        // 41000 -- 23000 -- 24000
        incomesMain: 
        [ {category: "Трудовой", sum: 0}, {category: "Незаработанный", sum: 0}],
        // 212,000 -- 27000

        purchases: 
        [ {id: 0, category: "Продукты питания", sum: 15000, date: "2024-07-20"}, {id: 1, category: "Коммунальные услуги", sum: 11000, date: "2024-07-03"}, {id: 2, category: "Продукты питания", sum: 8000, date: "2024-07-05"}, {id: 3, category: "Одежда и обувь", sum: 24000, date: "2024-07-18"}, {id: 4, category: "Продукты питания", sum: 18000, date: "2024-07-10"}, {id: 5, category: "Коммунальные услуги", sum: 12000, date: "2024-07-13"}],

        incomes: 
        [ {id: 0, category: "Трудовой", sum: 107000, date: "2024-07-02"}, {id: 1, category: "Незаработанный", sum: 5000, date: "2024-07-04"}, {id: 2, category: "Трудовой", sum: 105000, date: "2024-07-05"}, {id: 3, category: "Незаработанный", sum: 10000, date: "2024-07-07"}, {id: 4, category: "Незаработанный", sum: 12000, date: "2024-07-11"}],

        sumPurchases: 0,
        sumIncomes: 0,
        balance: 0,
        largestPurchase: 0,
        largestIncome: 0,
        arrPurchasesFiltr: ""
    },
    mutations: {
        mainOperations(state) {
            console.log("MainOperations");
            const products = state.purchases.filter(item => {
                return item.category == "Продукты питания"
            })
            state.purchasesMain[0].sum = 0;
            products.forEach(element => {
                state.purchasesMain[0].sum += element.sum
            });

            const communalServices = state.purchases.filter(item => {
                return item.category == "Коммунальные услуги"
            })
            state.purchasesMain[1].sum = 0
            communalServices.forEach(element => {
                state.purchasesMain[1].sum += element.sum
            });

            const clothes = state.purchases.filter(item => {
                return item.category == "Одежда и обувь"
            })
            state.purchasesMain[2].sum = 0
            clothes.forEach(element => {
                state.purchasesMain[2].sum += element.sum
            });
            console.log(state.purchasesMain);
        },
        mainOperationsIncomes(state) {
            console.log("mainOperationsIncomes");
            const products = state.incomes.filter(item => {
                return item.category == "Трудовой"
            })
            state.incomesMain[0].sum = 0;
            products.forEach(element => {
                state.incomesMain[0].sum += element.sum
            });

            const communalServices = state.incomes.filter(item => {
                return item.category == "Незаработанный"
            })
            state.incomesMain[1].sum = 0
            communalServices.forEach(element => {
                state.incomesMain[1].sum += element.sum
            });
        },
        operations(state) {
            console.log("Operations");
            state.sumPurchases = 0;
            state.sumIncomes = 0;
            state.balance = 0
            console.log(state.purchases);

            state.purchases.forEach(element => {
                state.sumPurchases += element.sum
            });

            state.incomes.forEach(element => {
                state.sumIncomes += element.sum
            });

            state.balance = state.sumIncomes - state.sumPurchases
        },
        createIncome(state, newIncome) {
            state.incomes.push(newIncome)
            console.log(newIncome);

        },
        createPurchase(state, newPurchase) {
            state.purchases.push(newPurchase)
            console.log(newPurchase);
        },
        theLargestPurchase(state) {
            state.largestPurchase = 0
            for (let i = 0; i < state.purchases.length; i++) {
                if (state.purchases[i].sum > state.largestPurchase) {
                    state.largestPurchase  = state.purchases[i].sum;
                }
            }
        },
        theLargestIncome(state) {
            state.largestIncome = 0
            for (let i = 0; i < state.incomes.length; i++) {
                if (state.incomes[i].sum > state.largestIncome) {
                    state.largestIncome  = state.incomes[i].sum;
                }
            }
        },
        deletePurchase(state, id) {
            console.log(id);
            state.purchases = state.purchases.filter(item => item.id != id)
        },
        deleteIncome(state, id) {
            console.log(id);
            state.incomes = state.incomes.filter(item => item.id != id)
        },
        changeArrayIncomes(state) {
            state.incomes =  JSON.parse(localStorage.getItem("incomes"))
            
            console.log("перезаписали incomes");
        },
        changeArrayPurchases(state) {
            state.purchases = JSON.parse(localStorage.getItem("purchases"))

            console.log("перезаписали purchases");
        },
        nearThree(state) {
            console.log("Произошло");
            const dateNow = Date.now()
            console.log(dateNow, "259200000");
            const borderLand = dateNow - 259200000
            state.purchases = state.purchases.filter(item => {
                let dateObject = new Date(item.date);
                let milliseconds = dateObject.getTime();
                
                 return milliseconds > borderLand
            })
        },
        nearSeven(state) {
            console.log("Произошло");
            const dateNow = Date.now()
            console.log(dateNow, "259200000");
            const borderLand = dateNow - 604800000
            state.purchases = state.purchases.filter(item => {
                let dateObject = new Date(item.date);
                let milliseconds = dateObject.getTime();
                
                 return milliseconds > borderLand
            })
        },
        // choosePeriod(state) {
        //     console.log("Произошло");
        //     const dateNow = Date.now()
        //     console.log(dateNow, "259200000");
        //     const borderLand = dateNow - 259200000
        //     state.purchases = state.purchases.filter(item => {
        //         let dateObject = new Date(item.date);
        //         let milliseconds = dateObject.getTime();
                
        //          return milliseconds > borderLand
        //     })
        // },

    },
    actions: {
        
    },
    getters: {
        incomes: state => state.incomes,
        purchases: state => state.purchases,
        incomesMain: state => state.incomesMain,
        purchasesMain: state => state.purchasesMain,
        sumPurchases: state => state.sumPurchases,
        sumIncomes: state => state.sumIncomes,
        balance: state => state.balance,
        largestPurchase: state => state.largestPurchase,
        largestIncome: state => state.largestIncome
        
    }
})

export default store