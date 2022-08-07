<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="useImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登陆时间：<span>2022-07-22</span></p>
          <p>上次登陆地点：<span>南京</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 462px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(value, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="value"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top:20px" :span="16">
      <div class="num">
        <el-card
        v-for="c in countData"
        :key="c.name"
        :body-style="{display:'flex',padding:0}"
        >
            <i class="icon" :class="`el-icon-${c.icon}`" :style="{background:c.color}"></i>
            <div class="detail">
                <p class="num">￥{{c.value}}</p>
                <p class="txt">{{c.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <!-- <div style="height:280px" ref="echarts"></div> -->
        <Echart :chartData="echartData.order" style="height:280px"/>
      </el-card>
        <div class="graph">
            <el-card style="height:240px">
              <Echart :chartData="echartData.use" style="height:240px"/>
            </el-card>
            <el-card style="height:240px">
              <Echart :chartData="echartData.video" :isAxisChart="false" style="height:240px"/>
            </el-card>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../../api/data'
import Echart from '../../components/ECharts.vue'
export default {
  name: "Home",
  components:{
    Echart
  },
  data() {
    return {
      //引入图片
      useImg: require("../../assets/img/login.jpg"),
      //表格数据
      tableData: [],
      //列名称
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      //订单数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData:{
        order:{
          xData:[],
          series:[]
        },
        use:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    };
  },
  mounted(){
    getData().then(res=>{
        const {code,data} = res.data
        if(code === 20000){
          this.tableData = data.tableData
          // 处理折线图数据
          const order = data.orderData
          const keyArray = Object.keys(order.data[0])
          const series = []
          keyArray.forEach(key =>{
            series.push({
              name:key,
              data:order.data.map(item => item[key]),
              type:'line'
            })
          })
          // 定义折线图数据
          //#region
          // const option = {
          //   xAxis:{
          //     data:order.date
          //   },
          //   yAxis:{

          //   },
          //   legend:{
          //     data:keyArray
          //   },
          //   series
          // }
          //#endregion
          //绘制折线图
          //#region
          // const E = echarts.init(this.$refs.echarts)
          // E.setOption(option)
          //#endregion
          this.echartData.order.xData = order.date
          this.echartData.order.series = series
          //用户图
          //#region
          // const userOptions = {
          //   legend: {
          //     // 图例文字颜色
          //     textStyle: {
          //       color: "#333",
          //     },
          //   },
          //   grid: {
          //     left: "20%",
          //   },
          //   // 提示框
          //   tooltip: {
          //     trigger: "axis",
          //   },
          //   xAxis: {
          //     type: "category", // 类目轴
          //     data:data.userData.map(item => item.date) ,
          //     axisLine: {
          //       lineStyle: {
          //         color: "#17b3a3",
          //       },
          //     },
          //     axisLabel: {
          //       interval: 0,
          //       color: "#333",
          //     },
          //   },
          //   yAxis: [
          //     {
          //       type: "value",
          //       axisLine: {
          //         lineStyle: {
          //           color: "#17b3a3",
          //         },
          //       },
          //     },
          //   ],
          //   color: ["#2ec7c9", "#b6a2de"],
          //   series: [
          //     {
          //       name:"新增用户",
          //       data:data.userData.map(item => item.new),
          //       type:'bar'
          //     },
          //     {
          //       name:"活跃用户",
          //       data:data.userData.map(item => item.active),
          //       type:'bar'
          //     },
          //   ],
          // }
          // const U = echarts.init(this.$refs.userEcharts)
          // U.setOption(userOptions)
          //#endregion
          this.echartData.use.xData = data.userData.map(item => item.date)
          this.echartData.use.series = [
              {
                name:"新增用户",
                data:data.userData.map(item => item.new),
                type:'bar'
              },
              {
                name:"活跃用户",
                data:data.userData.map(item => item.active),
                type:'bar'
              },
            ]
          
          //饼图
          //#region
          // const videoOptions ={
          //   tooltip: {
          //   trigger: "item",
          //   },
          //   color: [
          //     "#0f78f4",
          //     "#dd536b",
          //     "#9462e5",
          //     "#a6a6a6",
          //     "#e1bb22",
          //     "#39c362",
          //     "#3ed1cf",
          //   ],
          //   series: [
          //     {
          //       data:data.videoData,
          //       type:'pie'
          //     }
          //   ],
          // }
          // const V = echarts.init(this.$refs.videoEcharts)
          // V.setOption(videoOptions)
          //#endregion
          this.echartData.video.series = [
              {
                data:data.videoData,
                type:'pie'
              }
            ]
        }
    })
  }
};
</script>

<style>
</style>