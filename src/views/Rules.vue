<template>
  <div class="about" @right="itemRight('hello')" v-items refs="toMe" >
    <h1 class="bt1" >活动规则</h1>
    <div class="main">
      <h3>1.活动时间：即日起至2018年5月30日</h3>
      <h3>2.活动说明：用户在活动期间每天都可获得2次抽奖机会，通过购买VIP成为VIP会员的用户每天获得3次抽奖机会，中奖后，用户需要填写正确的手机号码才能获得奖品，活动期间用户可在生活频道“看评质生活，做测评达人”活动中查看中奖记录，并对未进行领奖的奖项进行领取操作。抽奖机会限当天使用。奖品数量有限，先到先得，每日0点更新。</h3>
      <h3>3.奖品说明：活动中奖率高达100%，奖品内容包括：现金红包等。</h3>
      <h3>4.参与方式：用户打开电视可在弹出的活动宣传页上参加活动，或者在生活频道中“看评质生活，做测评达人”活动中进行抽奖操作。</h3>
      <h3>5.领奖方式：现金红包：用户获得现金红包后需填写正确的手机号码，并用微信扫码关注公众号即可获得现金红包的奖励</h3>
    </div>
    <p class="p1">此活动最终解释权归评质生活所有</p>
  </div>
</template>

<script>
import Vue from 'vue'

// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     // el.focus()
//     console.log(el);
    
//   }
// })
export default {
  methods:{
    itemRight(msg){
      console.log(msg);
      // console.log(el);
      
          this.$router.go(-1)
          // if(keyCode === 13){
          //   alert(1111)
          // }
        },
        // back(e){
        //   console.log(e);
          
        // }
  },
   mounted(){
       let el = document.getElementsByClassName("about");
       this.$service.move(el); //vue-epg封装的移动焦点的方法
       this.$service.actions['back'] = this.back
    //    this.$service.actions['back'] = this.back
   },
}
</script>

<style scoped lang="scss">
.about {
  // width: 1120px;
  // margin: 0 auto;
  // margin-top: 30px;
  width: 1280px;
  height: 720px;
  background: url(../assets/imgs/rulesBg.png) no-repeat;
  background-size: 1280px 720px;
  overflow: hidden;
  position: absolute;
  .bt1 {
    text-align: center;
    margin-bottom: 50px;
    color: white;
    position: relative;
    top: 35px;
    margin-top: 100px;
  }
  .main {
    width: 750px;
    height: 500px;
    margin-left: 250px;
    margin-top: -80px;
    padding: 20px;
    padding-top: 50px;
    background: url(../assets/imgs/rules.png) no-repeat;
    background-size: 800px 500px;
    h3 {
      margin-top: 30px;
      color: white;
      // font-family: PingFang-SC-Medium;
    }
  }
  .p1 {
    text-align: center;
    font-size: 14px;
    color: white;
    margin-top: 150px;
    margin: 0;
  }
}
</style>
