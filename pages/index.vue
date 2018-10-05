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
              OnlinePc(:rigs="rigs")
      div.row.rig-render(v-if="!rigs") SELAM
      div.row.rig-render(v-if="rigs")
        RigList.col-md-4.rig-info-outer(
          v-for="(rig, index) in rigs"
          :key="index"
          :name="rig.name"
          :host="rig.host"
          :eth="rig.eth"
          :temps="rig.temps"
        )


</template>


<script>
import GaugeHash from '~/components/GaugeHash.vue'
import OnlinePc from '~/components/OnlinePc.vue'
import RigList from '~/components/RigList.vue'
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
  components: {
    GaugeHash,
    OnlinePc,
    RigList
  },
  mounted: function () {
    var getHeaderHEIGHT = document.querySelector('.current-info-outer').offsetHeight
    document.querySelector('.rig-render').style.marginTop = (getHeaderHEIGHT + 25 ) + 'px'
  },
  watch: {
    rigs: function (val) {
      let newArr = [];
      val.filter(value => value).forEach(function (e) {
          newArr.push(parseInt(e.eth))
      });
      var removeNan = newArr.filter( value => value)
      var totalVal = removeNan.reduce((a, b) => a + b);
      var b = totalVal.toString();
      var c = b.substring(0,4);
      this.totalEthVal = c;
    }
  },
  methods: {
    // totalEth: function () {


    // },

    intervalRequest: function () {
      var self = this;
      setInterval(function() {
        axios.get('http://192.168.1.13:3000/rigs')
        .then(function (response) {
          self.rigs = response.data.miners;
          self.loadedData = true;
          // self.totalEth();
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
</style>
