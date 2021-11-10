const app = Vue.createApp({
    data: () => ({
        title: "Gradient Gen",
        fcolor: '#d5ee11',
        scolor: '#f59e24',
        orientation: 1,
    }),

    computed:{
        setColor(){
            if(this.orientation == 2){
                return `width: 100%; height: 200px; background: linear-gradient(to left, ${this.fcolor}, ${this.scolor});`;
            }

            if(this.orientation == 3){
                return `width: 100%; height: 200px; background: linear-gradient(to top, ${this.fcolor}, ${this.scolor});`;
            }

            if(this.orientation == 4){
                return `width: 100%; height: 200px; background: linear-gradient(to bottom, ${this.fcolor}, ${this.scolor});`;
            }

            return `width: 100%; height: 200px; background: linear-gradient(to right, ${this.fcolor}, ${this.scolor});`;
            
        }
    }
});

const mountApp = app.mount('#app');