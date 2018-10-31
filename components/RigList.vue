<template lang="pug">
  div.outer-beyb
    div.rig-info-inner.controller(v-if="!eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.col-3.rig-ip
          a(:href="`http://${host}`" target="_blank")
            img(class="rig-icon" src="~/assets/icons/001-coding.png")
            span(v-if="eth !== NaN") {{name}}
        div.col-md-3.col-3.eth-stat(v-if="eth !== NaN" ) 
          img(class="rig-icon" src="~/assets/icons/002-car.png")
          span 0
        div.col-md-3.col-3 
          img(class="rig-icon" src="~/assets/icons/004-thermometer.png")
          span 0'C
        div.col-md-3.col-3
          img(class="rig-icon" src="~/assets/icons/003-fan.png")
          span 0 %
      b-collapse(:id="`collapse${ind}`" class="mt-2")
        b-card
          p OFFLINE
    div.rig-info-inner(:class="checkClassEth(eth)" v-if="eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.col-3.rig-ip
          a(:href="host | urlRegex" target="_blank")
             img(class="rig-icon" src="~/assets/icons/001-coding.png")
             span(v-if="name") {{name}}
        div.col-md-3.col-3.eth-stat(v-if="eth !== NaN" :class="checkClassEth(eth)" ) 
          img(class="rig-icon" src="~/assets/icons/002-car.png")
          span {{eth | hash}}
        div.col-md-3.col-3(:class="checkClassTemp(temps)") 
          img(class="rig-icon" src="~/assets/icons/004-thermometer.png")
          span {{temps | temp}}'C
        div.col-md-3.col-3(:class="checkClassFanSpeed(temps)")
          img(class="rig-icon" src="~/assets/icons/003-fan.png" )
          span {{temps | fanSpeed}} %
      b-collapse(:id="`collapse${ind}`" class="mt-2 clps-border")
        .row.info-collapse
          div.col-md-4.col-4.gpu-name 
            span GPU 
            div.col-md-12(class="mt-are" v-for="(h, index) in this.allCardMhs(this.ethhr)")  
              img(class="gpu-icon d-none d-sm-inline d-md-inline d-lg-inline" src="~/assets/icons/graphic-card.png")
              span {{index + 1}}
          div.col-md-4.col-4.gpu.hash
            span HASH
            div.col-md-12(class="mt-are" class="gpu-single" :class="checkClassGpu(h)" v-for="h in this.allCardMhs(this.ethhr)") 
              img(class="rig-icon d-none d-sm-inline d-md-inline d-lg-inline" src="~/assets/icons/002-car.png")
              span {{h / 1000}}
          div.col-md-4.col-4.gpu.temp 
            span TEMP
            div.col-md-12(class="mt-are" :class="checkClassTemp(g[0])" v-for="g in allCardTemp(this.temps)") 
              img(class="gpu-icon d-none d-sm-inline d-md-inline d-lg-inline" src="~/assets/icons/004-thermometer.png")
              span {{g[0]}}
          div.col-md-12.note-area
            p {{comment}}
</template>

<script>
export default {
  data() {
    return {
      propRigs: "",
      rigtest: [],
      gpuTemp: [],
    };
  },
  props: ["host", "name", "temps", "eth", "ind", "ethhr","comment"],
  
  methods: {
    allCardMhs: function (gpuEth) {
      var g = gpuEth.split(";")
      return g
    },
    allCardTemp: function(gpuInfo) {
      var g = gpuInfo.split(";");
      var a = g.map((x, i) => {
        if (i % 2 === 1) {
          return [g[i - 1], x];
        }
      }).filter(x => x);
      return a
    },
    checkClassTemp: function(temp) {
      if (temp) {
        var newArr = temp.split(";");
        var tempr = [];
        for (var i = 0; i < newArr.length; i++) {
          if (i % 2 === 0) {
            // index is even
            tempr.push(parseInt(newArr[i]));
          }
        }
        var sum,
          avg = 0;
        if (tempr.length) {
          sum = tempr.reduce(function(a, b) {
            return a + b;
          });
          avg = sum / tempr.length;
        }
        var tempAvarage = Math.round(avg);
      }

      if (tempAvarage <= 59) {
        return "temp excellent";
      } else if (tempAvarage > 59 && tempAvarage < 66) {
        return "temp good";
      } else if (tempAvarage > 65) {
        return "temp bad";
      }
    },
    checkClassFanSpeed: function(temp) {
      if (temp) {
        var newArr = temp.split(";");
        var tempr = [];
        for (var i = 0; i < newArr.length; i++) {
          if (i % 2 === 1) {
            // index is even
            tempr.push(parseInt(newArr[i]));
          }
        }
        var sum,
          avg = 0;
        if (tempr.length) {
          sum = tempr.reduce(function(a, b) {
            return a + b;
          });
          avg = sum / tempr.length;
        }
        var fanAvarage = Math.round(avg);
      }

      if (fanAvarage < 70) {
        return "fan excellent";
      } else if (fanAvarage > 70 && fanAvarage < 90) {
        return "fan good";
      } else {
        return "fan bad";
      }
    },
    checkClassEth: function(eth) {
      var ethPretty = eth.split(";")[0];
      if (ethPretty > 170000) {
        return "excellent";
      } else if (ethPretty < 170000 && ethPretty > 155000) {
        return "good";
      } else {
        return "bad";
      }
    },
    checkClassGpu: function(gpuHash) {
      if (gpuHash > 28000) {
        return "excellent";
      } else if (gpuHash < 28000 && gpuHash > 26000) {
        return "good";
      } else {
        return "bad";
      }
    }
  },
  filters: {
    urlRegex: function(value) {
      let ipUrl = value.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g);
      return "http://" + ipUrl;
    },
    hash: function(value) {
      if (value) {
        var newVal = value.split(";")[0].length;
        if (newVal >= 6) {
          return value.substring(0, 3);
        }
        return value.substring(0, 2);
      }
    },
    temp: function(value) {
      if (value) {
        var newArr = value.split(";");
        var tempr = [];
        for (var i = 0; i < newArr.length; i++) {
          if (i % 2 === 0) {
            // index is even
            tempr.push(parseInt(newArr[i]));
          }
        }
        var sum,
          avg = 0;
        if (tempr.length) {
          sum = tempr.reduce(function(a, b) {
            return a + b;
          });
          avg = sum / tempr.length;
        }
        return Math.round(avg);
      }
    },
    fanSpeed: function(value) {
      if (value) {
        var newArr = value.split(";");
        var tempr = [];
        for (var i = 0; i < newArr.length; i++) {
          if (i % 2 === 1) {
            // index is even
            tempr.push(parseInt(newArr[i]));
          }
        }
        var sum,
          avg = 0;
        if (tempr.length) {
          sum = tempr.reduce(function(a, b) {
            return a + b;
          });
          avg = sum / tempr.length;
        }
        return Math.round(avg);
      }
    }
  }
};
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC|Chakra+Petch|Concert+One|Fredericka+the+Great|Montserrat|Open+Sans+Condensed:300|Poiret+One|Rajdhani|Raleway|Squada+One|Yanone+Kaffeesatz');
  .rig-info-outer
    .note-area > p
      background: white;
      padding: 10px;
      display: inline-block;
      width: 80%;
      margin-top: 17px;
      font-size: 15px;
    border-radius: 5px
    cursor: pointer
    // user-select: none
    font-family: 'Squada One', cursive
    .clps-border 
      border: 1px solid #ececec;
      border-radius: 9px;
      background: #ececec;
      padding: 15px 0px;
    .info-collapse
      text-align: center
      .gpuHash, .gpu.name,
      .gpu-single
        &.excellent
          color: #00b894
        &.good
          color: #fdcb6e
        &.bad
          color: #ff7675
      .mt-are
        margin-bottom: 5px
      .gpu-icon
        width: 28px;
        height: 28px;
        margin-right: 6px;
    .rig-ip
      a
        color: #9c9c9c
    .rig-icon 
      width: 25px;
      margin-right: 10px;
    .rig-info-inner
      color: white;
      border-radius: 7px
      background-color: white
      font-size: 19px;
      margin: 10px
      padding: 10px 15px;
      color: black;
      &.controller
        background-color: #b2b2b2
      .eth-stat
        &.excellent
          color: #00b894
        &.good
          color: #fdcb6e
        &.bad
          color: #ff7675
      .temp
        &.excellent
          color: #74b9ff
        &.good
          color: #fab1a0
        &.bad
          color: #d63031
      .fan
        &.excellent
          color: #a4b0be
        &.good
          color: #57606f
        &.bad
          color: #2f3542
</style>


