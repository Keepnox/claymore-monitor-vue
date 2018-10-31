<template lang="pug">
  div.row.rig-length-text
    div.col-md-12
      span(class="online-rig-count" :class="deactiveRig == 0 ? 'good' : 'bad' ") {{totalRig - deactiveRig}}
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
      this.deactiveRig = document.querySelectorAll('.outer-beyb .controller').length;
      this.totalRig = document.querySelectorAll('.outer-beyb').length
    }
  }
}

</script>

<style lang="sass">
  .rig-length-text
    @media (min-width: 768px)
      text-align: center;
      color: #6b6b6b;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 90px
    font-size: 45px
    text-align: center
    font-family: 'Fredericka the Great', cursive;
    color: #00c09e;
    .online-rig-count
      &.good
        color: #00c09e;
      &.bad
        color: #ff8180
</style>

