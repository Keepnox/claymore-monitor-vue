<template lang="pug">
  div.row.rig-length-text
    span {{totalRig - deactiveRig}}
    span /
    span {{totalRig}}
</template>

<script>
export default {
  data() {
    return {
      totalRig: "",
      deactiveRig: "",
      selam: ""
    }
  },
  props: ['rigs'],
  created: function () {

  },
  watch: {
    rigs: function (newVal) {
      var self = this;
      var a = []
      var b = []
      newVal.forEach( function(rig, index) {
        a.push(rig)
        self.totalRig = a.length
        if(rig.eth === '') {
          b.push(rig)
          self.deactiveRig = b.length
        }
      });
      // console.log(newVal)
    }
  }
}
</script>

<style lang="sass">
  .rig-length-text
    font-size: 90px;
    text-align: center;
    color: #6b6b6b;
    span:first-child
      color: #df5766
</style>
