<template lang="pug">
  div.outer-beyb
    div.rig-info-inner.controller(v-if="!eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.rig-ip
          a(:href="`http://${host}`" target="_blank")
            img(class="rig-icon" src="~/assets/icons/001-coding.png")
            span(v-if="eth !== NaN") {{name}}
        div.col-md-3.eth-stat(v-if="eth !== NaN" ) 
          img(class="rig-icon" src="~/assets/icons/002-car.png")
          span 0
        div.col-md-3 
          img(class="rig-icon" src="~/assets/icons/004-thermometer.png")
          span 0'C
        div.col-md-3
          img(class="rig-icon" src="~/assets/icons/003-fan.png")
          span 0 %
      b-collapse(:id="`collapse${ind}`" class="mt-2")
        b-card
          p OFFLINE
    div.rig-info-inner(:class="checkClassEth(eth)" v-if="eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.rig-ip
          a(:href="host | urlRegex" target="_blank")
             img(class="rig-icon" src="~/assets/icons/001-coding.png")
             span(v-if="eth !== NaN") {{name}}
        div.col-md-3.eth-stat(v-if="eth !== NaN" :class="checkClassEth(eth)" ) 
          img(class="rig-icon" src="~/assets/icons/002-car.png")
          span {{eth | hash}}
        div.col-md-3(:class="checkClassTemp(temps)") 
          img(class="rig-icon" src="~/assets/icons/004-thermometer.png")
          span {{temps | temp}}'C
        div.col-md-3(:class="checkClassFanSpeed(temps)")
          img(class="rig-icon" src="~/assets/icons/003-fan.png" )
          span {{temps | fanSpeed}} %
      b-collapse(:id="`collapse${ind}`" class="mt-2")
        .row
          div.col-md-4.gpu-name RIG NAME
            div.col-md-12(v-for="(h, index) in this.allCardMhs(this.ethhr)") GPU {{index + 1}}
          div.col-md-4.gpu.hash HASH
            div.col-md-12(v-for="h in this.allCardMhs(this.ethhr)") {{h / 1000}}
          div.col-md-4.gpu.temp TEMP
            div.col-md-12(v-for="g in allCardTemp(this.temps)") {{g[0]}}

            
           
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
  props: ["host", "name", "temps", "eth", "ind", "ethhr"],
  
  methods: {
    allCardMhs: function (gpuEth) {
      var g = gpuEth.split(";")
      console.log('selam')
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
    border-radius: 5px
    cursor: pointer
    // user-select: none
    font-family: 'Squada One', cursive
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


