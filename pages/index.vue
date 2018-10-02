<template lang='pug'>
  div.row
    div.col-md-12(v-if="!rigs") YUKLENIYOR
    div.col-md-12(v-if="rigs")
      div.row
        div.col-md-12.current-info-outer
          div.current-info-inner.row
            div.col-md-4.mhs-text
              div.text
                span {{totalEthVal}}
                span.mhs m/HS
            div.col-md-4(style="text-align: center;")
              GaugeHash(:gaugeMhsSetter="totalEthVal || 0")
            div.col-md-4.online-pc
              div.text
                span 45
                span /
                span 45
      div.row.rig-render
        div.col-md-4.rig-info-outer(:class="checkClass(rigs[index].eth)" v-for="(rig, index) in rigs")
          div.controller(v-if="!rig") YUKLENIYOR
          div.rig-info-inner(v-if="rig")
            div.row
              div.col-md-3.rig-ip
                a(:href="`http://${rig.host}`" target="_blank")
                   strong {{rig.name}}
              div.col-md-3.eth-stat(v-if="rig.eth === NaN" ) ANNEN
              div.col-md-3.eth-stat(v-if="rigs[index].eth !== NaN" :class="checkClass(rigs[index].eth)" ) {{rig.eth | hash}}
              div.col-md-2 {{rig.temps | temp}}'C
              div.col-md-3 {{rig.temps | fanSpeed}} %

</template>

<script>
import GaugeHash from '~/components/GaugeHash.vue'
import axios from'axios'

export default {
  data() {
    return {
      loadedData: false,
      gauge: '',
      rigs: [],
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
    GaugeHash
  },
  mounted: function () {
    var getHeaderHEIGHT = document.querySelector('.current-info-outer').offsetHeight
    console.log(getHeaderHEIGHT)
    console.log('selam')
    document.querySelector('.rig-render').style.marginTop = (getHeaderHEIGHT + 25 ) + 'px'
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
      if(ethPretty > 170000) {
        return 'excellent';
      } else if (ethPretty < 170000 && ethPretty > 155000) {
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
  },
  created: function () {
    this.intervalRequest();
  }
}
</script>

<style lang="sass">
body
  background-color: #e5e4e8
.rig-ip
  a
    color: black
    transition: .3s all;
    &:hover
      color: red;
.online-pc
  text-align: center;
  .text
    font-size: 90px;
    text-align: center;
    color: #6b6b6b;
.mhs-text
  font-size: 90px;
  text-align: center;
  color: #6b6b6b;
  .mhs
    font-size: 30px;
    color: black;
.current-info-outer
  position: fixed
  z-index: 1
  background-color: #f1f1f1;
  box-shadow: 0px 3px 31px -4px;
  margin-bottom: 30px;
.rig-info-outer
  border-radius: 5px;
  .rig-info-inner
    color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    background-color: white
    font-size: 19px;
    margin: 10px
    padding: 10px 15px;
    color: black;
    border-bottom: 3px solid
  &.excellent
    .rig-info-inner
      border-color: #4fc54f;
    .eth-stat
      color: #4fc54f

  &.good
    .rig-info-inner
      border-color: #bbad3a;
    .eth-stat
      color: #bbad3a
  &.bad
    .rig-info-inner
      border-color: #ad1d1d;
    .eth-stat
      color: #ad1d1d
</style>
