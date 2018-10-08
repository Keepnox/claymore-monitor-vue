<template lang='pug'>
  div.row
    div.col-md-12(v-show="!loadedData")
      Loaded
    div.col-md-12(v-show="loadedData")
      div.row
        div.col-md-12.current-info-outer(v-bodyResizer)
          div.current-info-inner.row
            div.col-md-4.mhs-text
              div.text
                span(v-if="loadedData") {{totalEthVal}}
                span.mhs m/HS
            div.col-md-4(style="text-align: center;")
              GaugeHash(v-if="loadedData" :gaugeMhsSetter="totalEthVal || 0")
            div.col-md-4.online-pc
              OnlinePc(v-if="loadedData" :rigs="rigs")
      div.row.rig-render
        RigList.col-md-4.rig-info-outer(
          v-if="loadedData"
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
import Loaded from '~/components/Loaded.vue'
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
  directives: {
    bodyResizer: {
      inserted: function (el) {
        // setTimeout(() => {
        //   document.querySelector('.rig-render').style.marginTop = (el.offsetHeight + 25 ) + 'px'
        // }, 500)
      }
    }
  },
  components: {
    GaugeHash,
    OnlinePc,
    RigList,
    Loaded
  },
  mounted: function () {

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
    intervalRequest: function () {
      var self = this;
      setInterval(function() {
        axios.get('http://192.168.1.12:3000/rigs')
        .then(function (response) {
          self.rigs = response.data.miners;
          self.loadedData = true
        })
      },5000)
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
.rig-render
  transition: all .4s
  margin-top: 180px
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
  height: 170px
  position: fixed
  z-index: 1
  background-color: #f1f1f1;
  box-shadow: 0px 3px 31px -4px;
  margin-bottom: 30px;
</style>
