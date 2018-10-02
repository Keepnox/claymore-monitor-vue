<template lang='pug'>
  div.row
    div.col-md-12(v-if="!rigs") YUKLENIYOR
    div.col-md-12(v-if="rigs")
      div.row
        div.col-md-12.current-info-outer
          div.current-info-inner
            div.col-md-4
              div.row
                div.col-md-12 TOPLAM HASH
                div.col-md-12
                  h2 {{totalEthVal}}
                div.col-md-12
                  canvas#gauge
      div.row
        div.col-md-3.rig-info-outer(v-for="(rig, index) in rigs")
          div.controller(v-if="!rig") YUKLENIYOR
          div.rig-info-inner(v-if="rig")
            div.row
              div.col-md-2
                strong {{rig.name}}
              div.col-md-2.eth-stat(v-if="rig.eth === NaN" :class="checkClass(rigs[index].eth)" ) ANNEN
              div.col-md-2.eth-stat(v-if="rigs[index].eth !== NaN" :class="checkClass(rigs[index].eth)" ) {{rig.eth | hash}}
              div.col-md-2 {{rig.temps | temp}}'C
              div.col-md-3 {{rig.temps | fanSpeed}} %
              //- div.col-md-1
              //-   a(:href="`http://${rig.host}`" target="_blank") GIR

</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from'axios'

export default {
  data() {
    return {
      loadedData: false,
      gauge: '',
      rigs: [{
        comments:"ASUS 7950",
        dcr:"0;0;0",
        dcr_hr:"off;off;off;off;off;off",
        error:null,
        eth:"180735;3312;0",
        eth_hr:"30422;30801;30529;29811;29359;29810",
        host:"192.168.1.107:3333",
        name:"R1P07",
        offline:false,
        pools:"coinotron.com:3344",
        temps:"57;67;59;67;53;67;56;67;58;67;58;67",
        ti:null,
        uptime:"test",
        ver:"11.5 - ETH",
      }],
      totalEthVal: ""
    }
  },
  filters: {
    hash: function (value) {
      if(value) {
        var newVal = value.split(';')[0].length
        if(newVal >= 6) {
          return value.substring(0,3)
        }
        return value.substring(0,2)
      }
      // return value.substring(0,3)
      // return value
    },
    temp: function (value) {
      var newArr = value.split(';');
      var tempr = [];
      for (var i = 0; i < newArr.length; i++) {
        if(i % 2 === 0) { // index is even
          tempr.push(parseInt(newArr[i]));
        }
      }
      var sum, avg = 0;
      if (tempr.length)
      {
        sum = tempr.reduce(function(a, b) { return a + b; });
        avg = sum / tempr.length;
      }
      return Math.round(avg);
    },
    fanSpeed: function (value) {
      var newArr = value.split(';');
      var tempr = [];
      for (var i = 0; i < newArr.length; i++) {
        if(i % 2 === 1) { // index is even
          tempr.push(parseInt(newArr[i]));
        }
      }
      var sum, avg = 0;
      if (tempr.length)
      {
        sum = tempr.reduce(function(a, b) { return a + b; });
        avg = sum / tempr.length;
      }
      return Math.round(avg);
    }
  },
  components: {
    Logo
  },
  methods: {
    totalEth: function () {
      let newArr = [];

      this.rigs.filter(value => value).forEach(function (e) {
          newArr.push(parseInt(e.eth))
      });

      var removeNan = newArr.filter( value => value)

      var totalVal = removeNan.reduce((a, b) => a + b);

      var convString = totalVal.toLocaleString();

      var beautyHash = convString.replace(',','')

      this.totalEthVal = parseInt(beautyHash);

    },
    checkClass: function (eth) {
      var ethPretty = eth.split(';')[0];
      // console.log(eth)
      if(ethPretty > 165000) {
        return 'excellent';
      } else if (ethPretty < 165000 && ethPretty > 155000) {
        return 'good';
      } else {
        return 'bad';
      }
    },
    intervalRequest: function () {
      var self = this;
      setInterval(function() {
        axios.get('http://192.168.1.13:3000/rigs')
        .then(function (response) {
          self.rigs = response.data.miners;
          self.loadedData = true;
          self.totalEth();
        })
      },3000)
    },
    gaugeAddOn: function () {
      var opts = {
        angle: 0,
        lineWidth: 0.14,
        radiusScale: 1,
        pointer: {
          length: 0.6,
          strokeWidth: 0.035,
          color: '#000000'
        },
        staticZones: [
           {strokeStyle: "#de4c58", min: 0, max: 3000},
           {strokeStyle: "#f6c24b", min: 3000, max: 7000},
           {strokeStyle: "#8dc95b", min: 7000, max: 8000},
        ],
        staticLabels: {
          font: "10px sans-serif",
          labels: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
          color: "#000000",
          fractionDigits: 0
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#6FADCF',
        colorStop: '#8FC0DA',
        strokeColor: '#E0E0E0',
        generateGradient: true,
        highDpiSupport: true,
      };
      var target = document.getElementById('gauge');
      this.gauge = new Gauge(target).setOptions(opts);
      this.gauge.maxValue = 8000;
      this.gauge.setMinValue(0);
      this.gauge.animationSpeed = 32;
      this.gauge.set(this.totalEthVal);

    }
  },
  watch: {
    totalEthVal: function (val) {
      if(this.loadedData) {
        var self = this;
        setTimeout(function () {
          self.gauge.set(val)
        }, 500)
      }
    }
  },
  mounted: function () {
    var self = this;
    setTimeout(function () {
      if (document && self.loadedData == true) {
        self.gaugeAddOn();
      }
    }, 5000)
  },
  created: function () {
    this.intervalRequest();
  }
}
</script>

<style lang="sass">
body
  background-color: #e5e4e8
.current-info-outer
  background-color: #cacaca;
  border-bottom: 1px solid #ddd;
.rig-info-outer
  .rig-info-inner
    color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    background-color: white
    font-size: 19px;
    margin: 10px
    padding: 5px;
    color: black;
    .eth-stat
      &.excellent
        color: #4fc54f
      &.good
        color: #bbad3a
      &.bad
        color: #ad1d1d
</style>
