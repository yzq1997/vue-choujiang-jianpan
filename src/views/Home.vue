<template>
  <div class="jgg_index_bk">
    <div class="sweepstake_jgg">
      <ul>
        <li
          v-for="(v, i) in jggData"
          :key="i"
          :data-index="i"
          :class="jggClass[i]"
          :v-if="i===4?true:fals"
          v-items
          @left="left()"
          @right="right()"
          @up="up()"
          @down="down()"
          class="list_box"
          @click="jggbtn(i)"
        >
          <p>{{ v.name }}{{i === 4?qqsj.LeftNumber:''}}</p>
          <!-- <p>{{this.data.initOppo}}</p> -->
        </li>
      </ul>
    </div>
    <div class="vip">
      <p>用户类型：每天抽奖次数</p>
      <p>普通用户：1次 | VIP：3次</p>
      <p v-items @left="left()" @right="right()" @up="up()" @down="down()" @click="goVip()">订购成为VIP</p>
    </div>
    <div class="rules">
      <p @click="rules()" v-items @left="left()" @right="right()" @up="up()" @down="down()">活动规则</p>
      <p v-items @left="left()" @right="right()" @up="up()" @down="down()" @click="zjjj()">中奖记录</p>
      <!-- <el-button type="primary">主要按钮</el-button> -->
      <!-- <el-button type="primary" @click="open">点击打开 </el-button> -->
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
// import aa from "../assets/imgs/lb.png"
import Vue from "vue";
import $ from "jquery";
import axios from "axios";
import { ConfigApi } from "../api/api";
import { Button } from "element-ui";
// import App from './App.vue';

Vue.component(Button.name, Button);

Vue.prototype.$axios = axios;
export default {
  data() {
    return {
      centerDialogVisible: false, //中奖弹框默认不显示
      qqsj: {},
      jggData: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: "点击抽奖"
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ],
      jggClass: [
        "jgg0",
        "jgg1",
        "jgg2",
        "jgg8",
        "jgg_btn",
        "jgg4",
        "jgg7",
        "jgg6",
        "jgg5"
      ],
      count: 9, //位置总数
      speed: 10, //初始速度
      timer: 0, //定时器时间
      currentIndex: 0, //转动的当前位置
      rotateNum: 0, //转动次数
      basicCycle: 32, //运动初始次数
      prizePlace: 0, //中奖位置
      isClick: false, //是否重复点击抽奖
      initOppo: null, //初始抽奖次数
      IsVip: false, //是否是vip
      LeftNumber: 0, //剩余抽奖次数
      isStop: false // 防流氓操作
    };
  },

  mounted() {
    let el = document.getElementsByClassName("list_box")[4];
    this.$service.move(el); //vue-epg封装的移动焦点的方法
    //  this.$service.actions['back'] = this.back
  },
  methods: {
    left() {
      this.$service.move("left");
    },
    right() {
      this.$service.move("right");
    },
    up() {
      this.$service.move("up");
      this.$service.pointer.$el.scrollIntoView(true);
    },
    down() {
      this.$service.move("down");
      this.$service.pointer.$el.scrollIntoView(true);
    },
    //跳转到规则页面
    rules() {
      this.$router.push("./rules");
    },

    //跳转到中奖纪录页面
    zjjj() {
      // this.$router.push("./rules");
      alert("跳到中奖纪录页面")
    },

    //跳转到充值vip页面
    goVip() {
      // this.$router.push("./rules");
      alert("跳到充值Vip页面")
    },

    //初始化方法，点击抽奖事件
    jggbtn(index) {
      //请求后台数据
      this.$axios({
        method: "post",
        url: ConfigApi.qqDomain + "/api/LotteryDraw/GetAwards",
        data: {
          //这里是发送给后台的数据
          UserId: "U00050",
          IsVip: true
        }
      }).then(res => {
        this.qqsj = JSON.parse(res.data);
        // console.log(this.qqsj);
        this.qqsj.LeftNumber === 0
          ? (this.isClick = true)
          : (this.isClick = false);
      });

      if (this.isStop) {
        return;
      }
      if (this.isClick) {
        //防止在转动过程中,重复点击抽奖按钮
        // alert("你已用完抽奖次数");
        this.centerDialogVisible = true;
        // open()
        return;
      } else {
        this.speed = 100;
        this.rotateNum = 0;
        // this.initOppo = this.initOppo-1;
        this.turning();
        this.isClick = true; //一次完成后，可继续抽
        this.isStop = true;
        return false;
      }
    },

    //为即将转到下一个节点添加class:active
    addNextItemClass() {
      // let this = this;
      $(".sweepstake_jgg ul")
        .find(".jgg" + this.currentIndex)
        .removeClass("jgg_acitve");
      this.currentIndex += 1;
      if (this.currentIndex >= this.count) {
        this.currentIndex = 0;
      }
      $(".sweepstake_jgg ul")
        .find(".jgg" + this.currentIndex)
        .addClass("jgg_acitve");
    },
    //浮层转动的逻辑都在该方法内实现
    turning() {
      // var this = this;
      this.rotateNum += 1;
      this.addNextItemClass();
      //判断是否转动完毕
      if (
        this.rotateNum > this.basicCycle + 7 &&
        this.prizePlace == this.currentIndex
      ) {
        clearTimeout(this.timer);
        setTimeout(() => {
          this.isStop = false;
          this.qqsj.LeftNumber === 0
            ? (this.isClick = true)
            : (this.isClick = false);

          // alert("您抽中的是" + this.qqsj.AwardName);
          this.centerDialogVisible = true;
        }, 500);
        // this.prizePlace = -1;
        this.timer = 0;
      } else {
        //该判断内是对转动速度speed的处理
        if (this.rotateNum < this.basicCycle) {
          this.speed -= 5;
        } else if (this.rotateNum == this.basicCycle) {
          // 此处是随机数获取中奖的，后期由后台给出
          this.prizePlace = Math.floor(Math.random() * this.count);
          // this.prizePlace = 1
          this.prizePlace == 9
            ? (this.prizePlace = 0)
            : (this.prizePlace = this.prizePlace);
        } else {
          // 如果中奖位置和当前位置的位差在一到多圈时，加快转动速度
          if (
            (this.rotateNum > this.basicCycle + 7 &&
              this.prizePlace == 0 &&
              this.currentIndex == 7) ||
            this.prizePlace == this.currentIndex + 1
          ) {
            this.speed += 100;
          } else {
            this.speed += 20;
          }
        }
        // 此处做匀速阶段的处理
        if (this.speed < 50) {
          this.speed = 50;
        }
        // 定时器做整个转动处理
        this.timer = setTimeout(this.turning.bind(this), this.speed); //此处使用bind(),防止setTimeout改变this的指向
      }
      return false;
    }
  },

  //在这个生命周期中拿到剩余次数
  created() {
    this.$axios
      .get(`${ConfigApi.qqDomain}` + "/api/LotteryDraw/Index", {
        // url: ConfigApi.qqDomain + "/api/LotteryDraw/Index",
        params: {
          //这里是发送给后台的数据
          UserId: "U00050",
          IsVip: true
        }
      })
      .then(res => {
        this.qqsj = JSON.parse(res.data);
        console.log(this.qqsj);
        this.qqsj.LeftNumber === 0
          ? (this.isClick = true)
          : (this.isClick = false);
        // this.initOppo = JSON.parse(res.data).LeftNumber;
        // console.log(this.initOppo);
      });
  }
};
</script>

<style scoped lang="scss">
.focus {
  border: 1px solid yellow;
  transform: scale(1.1);
  border-radius: 10px;
  box-shadow: 0px 0px 6px 2px #ffff00;
  //  box-sizing: border-box;
}
.jgg_index_bk {
  width: 1280px;
  height: 720px;
  background: url(../assets/imgs/Bg.png) no-repeat;
  background-size: 1280px 720px;
  overflow: hidden;
  position: absolute;
  .sweepstake_jgg {
    width: 500px;
    height: 500px;
    // margin: 55px auto 60px;
    margin-left: 380px;
    margin-top: 100px;
    overflow: hidden;
    ul {
      width: 500px;
      height: 380px;
      background: url(../assets/imgs/bj.png) no-repeat;
      background-size: 500px 500px;
      padding-top: 120px;
      margin: 0;
      padding-left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 130px;
        height: 90px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../assets/imgs/lb.png");
        background-size: 100% 100%;
        border: 2px solid #fff;
        border-radius: 10px;
        // background-repeat: no-repeat;
        // background-size: cover;
        &:nth-of-type(5) {
          background: none;
        }
        p {
          // display: block;
          // width: 100%;
          // height: 100%;
          line-height: 90px;
          text-align: center;
          font-size: 30px;
          color: #fff;
        }
      }
      .jgg_btn {
        // background-image: url("../assets/imgs/jgg_2.png");
        img {
          display: none;
        }
        p {
          display: block;
        }
      }
      .jgg_acitve {
        background-image: url("../assets/imgs/lb2.png");
        p {
          color: #000;
        }
      }
    }
  }
  .vip {
    width: 200px;
    height: 90px;
    background: red;
    position: relative;
    left: 150px;
    top: -450px;
    background: url(../assets/imgs/vip.png) no-repeat;
    background-size: 100% 100%;
    padding: 5px;
    p {
      font-size: 12px;
      color: #fff;
      line-height: 12px;
      padding: 0;
      &:nth-of-type(3) {
        display: block;
        width: 100px;
        height: 25px;
        // background: url(../assets/imgs/jx.png) no-repeat;
        background: #feb36d;
        background-size: 100% 100%;
        font-size: 14px;
        text-align: center;
        border-radius: 10px;
        line-height: 26px;
        cursor: pointer;
        margin-left: 40px;
      }
    }
  }
  .rules {
    width: 200px;
    height: 90px;
    // background: red;
    position: relative;
    left: 1050px;
    top: -600px;
    p {
      // background: url(../assets/imgs/btn.png) no-repeat;
      // background-size: 100% 100%;
      background: #ad75f8;
      border-radius: 10px;
      display: block;
      width: 80px;
      height: 30px;
      padding: 5px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>


