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
            div.col-md-4.d-none.d-sm-block.d-md-block.d-lg-block(style="text-align: center;")
              GaugeHash(v-if="loadedData" :gaugeMhsSetter="totalEthVal || 0")
            div.col-md-4.online-pc
              OnlinePc(v-if="loadedData" :rigs="rigs")
      div.row.rig-render
        div.col-md-4(v-for="(a, index) in 3")
          .row
            RigList.col-md-12.rig-info-outer(
              v-if="rigIndex >= (rigs.length / 3) * index && rigIndex < (rigs.length / 3) * (index + 1)"
              v-for="(rig, rigIndex) in rigs"
              :key="rigIndex"
              :ind="rigIndex"
              :name="!rig.name ? 'nameyok':rig.name"
              :host="rig.host"
              :eth="rig.eth"
              :temps="rig.temps"
              :ethhr="rig.eth_hr"
              :comment="rig.comments"
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
    setInterval(() => {
      this.intervalRequest();
    }, 3000)
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
    intervalRequest: async function () {
      let self = this;
      let minerData = await axios.get('/rigs');
      self.rigs = minerData.data.miners;
      self.loadedData = true;
    },
  },
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
  font-family: 'Fredericka the Great', cursive;
  color: #00c09e;
  text-align: center;
  .text
    font-size: 60px;
    @media (min-width: 768px)
      font-size: 90px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    .mhs
      font-size: 30px;
      color: black;
.current-info-outer
  // height: 170px;
  padding: 5px 0px;
  position: fixed;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 3px 1px -4px;
  margin-bottom: 30px;
</style>
