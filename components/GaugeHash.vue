<template lang="pug">
  div.row
    div.col-md-12
      canvas#gauge
</template>

<script>
export default {
  data() {
    return {
      gaugeMhs: "",
      // gaugeMhsSetter: {type: String}
    }
  },
  props: ['gaugeMhsSetter'],
  methods: {
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
      this.gaugeMhs = new Gauge(target).setOptions(opts);
      this.gaugeMhs.maxValue = 8000;
      this.gaugeMhs.setMinValue(0);
      this.gaugeMhs.animationSpeed = 32;
      this.gaugeMhs.set(this.gaugeMhsSetter);

    }
  },
  watch: {
    gaugeMhsSetter: function (val) {
      this.gaugeMhs.set(val);
    }
  },
  mounted: function () {
    this.gaugeAddOn();
  }
}
</script>
