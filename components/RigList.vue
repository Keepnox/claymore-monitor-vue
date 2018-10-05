<template lang="pug">
  div.outer-beyb
    div.rig-info-inner.controller(v-if="!eth")
      div.row
          div.col-md-12.rig-ip YÜKLENİYOR YA DA KAPALI
    div.rig-info-inner(:class="checkClass(eth)" v-if="eth")
      div.row
        div.col-md-3.rig-ip
          a(:href="`http://${host}`" target="_blank")
             strong {{name}}
        div.col-md-3.eth-stat(v-if="eth !== NaN" :class="checkClass(eth)" ) {{eth | hash}}
        div.col-md-2 {{temps | temp}}'C
        div.col-md-3 {{temps | fanSpeed}} %
</template>

<script>
export default {
  data() {
    return {
      propRigs:""
    }
  },
  props: ['host','name','temps','eth'],
  methods: {
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


