<template>
  <div class="home">
    <!-- 展示框 -->
    <div class="display-box">
      <el-row :gutter="10">
        <el-col :xs="24"
                :sm="12"
                :lg="6"
                v-for="(list,i) in lists"
                :key="i">
          <div class="display-con"
               :style="{background:list.color}">
            <P>{{list.name}}</P>
            <countTo :startVal="0"
                     :endVal="list.number"
                     :duration="list.duration"></countTo>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 图表 -->
    <div class="mychart">
      <div id="chart1"
           class="chart1"></div>
      <div id="chart2"
           class="chart2"></div>
      <div id="chart3"
           class="chart3"></div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import echarts from 'echarts'
export default {
  name: 'Home',
  data () {
    return {
      lists: [{
        name: '最高可借金额',
        color: '#67ca3a',
        number: 13594,
        duration: 2000
      },
      {
        name: '回报率',
        color: '#f60',
        number: 9833,
        duration: 3000
      },
      {
        name: '业绩领跑',
        color: '#f56c6c',
        number: 8888,
        duration: 1500
      },
      {
        name: '安稳底薪战队',
        color: '#409eff',
        number: 6666,
        duration: 3500
      }
      ],
      chart1: null,
      chart2: null,
      chart3: null
    }
  },
  methods: {
    initChart () {
      // 基于准备好的dom，初始化echarts实例
      this.chart1 = echarts.init(document.getElementById('chart1', 'light'))
      this.chart2 = echarts.init(document.getElementById('chart2', 'light'))
      this.chart3 = echarts.init(document.getElementById('chart3', 'light'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        color: ['#4993f6', '#e07ca1'],
        legend: {
          data: ['2018', '2019'],
          top: 20
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '2018',
          type: 'line',
          stack: '总量',
          areaStyle: {
            color: '#fff',
            opacity: 0.5
          },
          data: [
            120,
            136,
            250,
            340,
            650,
            780,
            1200,
            1600,
            1700,
            1000,
            600,
            480
          ]
        },
        {
          name: '2019',
          type: 'line',
          stack: '总量',
          areaStyle: {
            opacity: 0
          },
          data: [
            200,
            360,
            500,
            680,
            780,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320
          ]
        }
        ]
      }
      var option2 = {
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      var option3 = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [{
            value: 335,
            name: '直接访问'
          },
          {
            value: 310,
            name: '邮件营销'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 135,
            name: '视频广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.chart1.setOption(option)
      this.chart2.setOption(option2)
      this.chart3.setOption(option3)
    }
  },
  mounted () {
    //挂载完成
    this.initChart()
    window.onresize = () => {
      //根据窗口大小自适应
      this.chart1.resize()
      this.chart2.resize()
      this.chart3.resize()
    }
  },
  components: {
    CountTo
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  margin-top: 40px;
}

.home .display-box .display-con {
  padding: 20px 0 40px;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.home .display-box .display-con p {
  color: #323133;
  margin-bottom: 10px;
}

.home .display-box .el-col-sm-12 {
  margin-bottom: 10px;
}

.home .mychart {
  margin-top: 20px;
}

.home .mychart .chart1 {
  width: 100%;
  height: 500px;
  background-color: #c7e4db;
}

.home .mychart .chart2,
.home .mychart .chart3 {
  width: 50%;
  height: 400px;
  margin-top: 30px;
}

.home .mychart .chart2 {
  float: left;
}

.home .mychart .chart3 {
  float: right;
}
</style>