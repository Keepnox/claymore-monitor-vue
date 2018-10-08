<template lang="pug">
  .loading-page
    .counter
      p
        strong loading
      h1 0%
      hr
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
        c: 0,
      }
    },
    mounted: function () {
      const self = this;
      var i = setInterval(function() {
        document.querySelector('h1').innerHTML = self.c + "%";
        document.querySelector('hr').style.width = self.c + '%';
        self.counter++;
        self.c++;

        if(self.counter == 101) {
          clearInterval(i);
        }
      }, 50);
    }
  }
</script>


<style lang="sass">

.loading-page
  position: fixed
  padding: 0
  left: 0
  right: 0
  top: 0
  bottom: 0
  overflow: hidden
  background: #0d0d0d
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

  .counter
    text-align: center

    p
      font-size: 40px
      font-weight: 100
      color: #f60d54

    h1
      color: white
      font-size: 60px
      margin-top: -10px

    hr
      background: #f60d54
      border: none
      height: 1px

  .counter
    position: relative
    width: 200px
    h1.abs
      position: absolute
      top: 0
      width: 100%
    .color
      width: 0px
      overflow: hidden
      color: #f60d54
</style>
