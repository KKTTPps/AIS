// JavaScript Document
var store = {  
    save(key,value){  
        localStorage.setItem(key,JSON.stringify(value));  
    },  
    fetch(key){  
        return JSON.parse(localStorage.getItem(key)) || [];  
    }  
}  
//数据  
//去除所有的值  
var list = store.fetch("todolist-class");//从缓存中调用数据  
  
var vm = new Vue({  
    el:"#app",  
    data:{
        listname:'',
        thingname:'',
        selectedIndex:0,
        show:true,
        isSearch:false,
        searchname:'',
        searchList:[],
        lists:[
            {
                lname:'我的一天',
                things:[]
            },
            {
                lname:'To-Do',
                things:[]
            }
        ]
    },  
    watch:{  
        lists:{//这里list是个对象  
            handler:function(){  
                store.save("todolist-class",this.lists);  
            },  
            deep:true //深度监控  
        }  
    },   
    methods:{  
        addList:function(){
            var list={
                lname:this.listname,
                things:[]
            }
            this.lists.push(list);
            this.listname='';
        },
        selectList:function(index){
            this.selectedIndex=index;
        },
        addThing:function(){
            var thing={
                tname:this.thingname,
                done:false
            }
            this.lists[this.selectedIndex].things.push(thing);
            this.thingname=''
        },
        // editThing:function(){},
        finish:function(index){
            var done=this.lists[this.selectedIndex].things[index].done;
            this.lists[this.selectedIndex].things[index].done=!done;
        },
        deleteList:function(){
            this.lists.splice(this.selectedIndex,1);
            this.selectedIndex--;
        },
        getShowName:function(){
            if(this.show)
                return '显示已完成';
            return '隐藏已完成';
        },
        showOk:function(){
            this.show=!this.show;
        },
        isShow:function(index){
            return this.show||!this.lists[this.selectedIndex].things[index].done;
        },
        searchThing:function(){
            this.searchList.splice(0,this.searchList.length);
            for(list in this.lists){
                var li=this.lists[list];
                for(thing in li.things){
                    var th=li.things[thing];
                    if(th.tname.indexOf(this.searchname)!=-1&&this.searchname!=''){
                        var re={
                            tname:th.tname,
                            done:th.done
                        }
                        this.searchList.push(re);
                    }
                }
            }
        },
        deleteThing:function(index){
            this.lists[this.selectedIndex].things.splice(index,1);
        }
    },
    created() {
        if (localStorage.getItem('tablesBackup')) {
            this.lists = JSON.parse(localStorage.getItem("tablesBackup"));
        }
    },
    //生命周期updated
    updated() {
        localStorage.setItem('tablesBackup', JSON.stringify(this.lists));
    },

}); 