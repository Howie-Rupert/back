<template>
    <div class="tabs">
        <el-tag
        size="small"
        v-for="(t,index) in tags"
        :key="t.name"
        :closable="t.name !== 'home'"
        :effect="$route.name === t.name ? 'dark' : 'plain'"
        @click="changeMenu(t)"
        @close="handleClose(t,index)"
        style="margin-right:5px;cursor:pointer;"
        >
        {{t.label}}
        </el-tag>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'CommonTags',
    data(){
        return{

        }
    },
    computed:{
        ...mapState({
            tags: state=> state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({
            close:'closeTag'
        }),
        changeMenu(t){
            this.$router.push({name:t.name})
        },
        handleClose(t,index){
            const len = this.tags.length - 1
            this.close(t)
            if(t.name !== this.$route.name){
                return;
            }
            if(index === len){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
            
        }
    }
}
</script>

<style>
.tabs{
    padding:20px;
}
</style>