new Vue({
    el : '#app',
    data: {
        player_health : 100,
        monster_health : 100,
        game_is_on : false,
        logs : [ ],
        attack_multiple : 10,
        specil_attach_multiple : 25,
        monster_attach_multiple : 15,
        health_up_multiple : 20,
        log_text : {
            attach : "OYUNCU ATAĞI :",
            specil_attach : "ÖZEL OYUNCU ATAĞI :",
            monster_attach : "CANAVAR ATAĞI :",
            heal_up : "İLK YARDIM :",
            give_up : "OYUNCU PES ETTİ :",
        }
        
    },
    methods:{
        start_game : function(){
            this.game_is_on = true
        },
        attach : function (){
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_health-=point;
            this.monster_attach();
            this.add_to_log({turn:"P",text:this.log_text.attach + point});
        },
        specil_attach: function(){
            var point = Math.ceil(Math.random() * this.specil_attach_multiple);
            this.monster_health-=point;
            this.monster_attach();
            this.add_to_log({turn:"P",text:this.log_text.specil_attach+point});
        },
        heal_up : function(){
            var point = Math.ceil(Math.random() * this.health_up_multiple);
            this.player_health+=point;
            this.monster_attach();
            this.add_to_log({turn:"P",text:this.log_text.heal_up+point});
        },
        give_up : function(){
            this.player_health = 0;
            this.add_to_log({turn:"P",text:this.log_text.give_up});
        },
        monster_attach : function(){
            var point = Math.ceil(Math.random()*this.monster_attach_multiple);
            this.player_health-=point;
            this.add_to_log({turn:"M",text:this.log_text.monster_attach+point});
        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch : {
        player_health : function(value){
            if(value <= 0){
                this.player_health = 0;
                if(confirm("Oyunu KAYBETTİN. Tekrar Denemek ister misin?")){
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            } else if(value >= 100){
                this.player_health = 100
            }
        },
        monster_health : function(value){
            if(value <= 0){
                this.monster_health = 0;
                if(confirm("Oyunu KAZANDIN. Tekrar Denemek ister misin?")){
                    this.player_health = 100;
                    this.monster_health = 100;
                }
            }
        },
    },
    computed : {
        user_progress : function (){
            return {
                width : this.player_health + "%"
            }
        },
        monster_progress : function (){
            return {
                width : this.monster_health + "%"
            }
        }
    }
});