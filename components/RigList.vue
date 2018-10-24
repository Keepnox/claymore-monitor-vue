<template lang="pug">
  div.outer-beyb
    div.rig-info-inner.controller(v-if="!eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.rig-ip
          a(:href="`http://${host}`" target="_blank")
             strong(v-if="eth !== NaN") {{name}}
        div.col-md-3.eth-stat(v-if="eth !== NaN" :class="checkClass(eth)" ) 0 Mh/s
        div.col-md-3 0 'C
        div.col-md-3 0 %
      b-collapse(:id="`collapse${ind}`" class="mt-2")
        b-card
          p {{ind}}
    div.rig-info-inner(:class="checkClass(eth)" v-if="eth")
      v-btn.row(v-b-toggle="'collapse'+ind" variant="primary")
        div.col-md-3.rig-ip
          a(:href="host | urlRegex" target="_blank")
             strong(v-if="eth !== NaN") {{name}}
        div.col-md-3.eth-stat(v-if="eth !== NaN" :class="checkClass(eth)" ) {{eth | hash}} Mh/s
        div.col-md-3 Temp: {{temps | temp}}'C
        div.col-md-3 Fan: {{temps | fanSpeed}} %
      b-collapse(:id="`collapse${ind}`" class="mt-2")
        b-card
           
</template>

<script>
export default {
  data() {
    return {
      propRigs:"",
      rigtest: []
    }
  },
  props: ['host','name','temps','eth','ind'],
  mounted() {
    this.gpuInformation()
  },
  methods: {
    gpuInformation: function () {
      var temp = this.temps
    },
    checkClass: function (eth) {
      var ethPretty = eth.split(';')[0];
      if(ethPretty > 170000) {
        return 'excellent';
      } else if (ethPretty < 170000 && ethPretty > 155000) {
        return 'good';
      } else {
        return 'bad';
      }
    },
  },
  filters: {
    urlRegex: function (value) {
      let ipUrl = value.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g)
      return 'http://' + ipUrl
    },
    hash: function (value) {
      if(value) {
        var newVal = value.split(';')[0].length
        if(newVal >= 6) {
          return value.substring(0,3)
        }
        return value.substring(0,2)
      }
    },
    temp: function (value) {
      if(value) {
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
      }
    },
    fanSpeed: function (value) {
      if(value) {
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
    }
  },
}
</script>

<style lang="sass">
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
      &.controller
        background-color: #b2b2b2
    .excellent
      border-color: #4fc54f;
      .eth-stat
        color: #4fc54f
    .good
      border-color: #bbad3a;
      .eth-stat
        color: #bbad3a
    .bad
      border-color: #ad1d1d;
      .eth-stat
        color: #ad1d1d
</style>


