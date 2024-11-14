<template>
  <svg
    height="340"
    width="100%"
    viewBox="0 0 340 340"
  >
    <g>
      <text text-anchor="middle" :x="cx" :y="cy" class="total">
        ${{ numberWithCommas(dataTotal.toFixed(0)) }}
      </text>
      <text dy="1em" text-anchor="middle" :x="cx" :y="cy" class="per-month">
        per month
      </text>
    </g>

    <g
      v-for="(entry, index) in chartData"
      :key="'text-' + index"
      class="segment"
    >
      <circle
        :cx="cx"
        :cy="cy"
        :r="radius"
        fill="transparent"
        :stroke="entry.color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference - 2"
        :stroke-dashoffset="entry.dashOffset"
        :transform="entry.rotate"
      />
    </g>

    <g
      v-for="(entry, index) in textData"
      :key="index"
      :style="{ fill: entry.color }"
    >
      <text :x="entry.x" :y="entry.y" class="amount" fill="entry.color">
        ${{ entry.amount }}
      </text>
      <text dy="1em" :x="entry.x" :y="entry.y" class="title">
        {{ entry.text1 }}
      </text>
      <text dy="2em" :x="entry.x" :y="entry.y" class="title">
        {{ entry.text2 }}
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PaymentDetails',
  props: {
    mortgagePayment: {
      required: true,
      type: Number,
    },
    hoaFee: {
      required: false,
      type: Number,
    },
    insurancePayment: {
      required: true,
      type: Number,
    },
    taxPayment: {
      required: true,
      type: Number,
    },
  },
  data: () => ({
    cx: 170,
    cy: 170,
    radius: 100,
    strokeWidth: 50,
    angleOffset: -225,
    principalColor: '#033B5F',
    hoaColor: '#383838',
    insuranceColor: '#479AC9',
    taxColor: '#000000',
  }),
  computed: {
    hasHoaFee() {
      return this.hoaFee && this.hoaFee > 0;
    },
    dataTotal() {
      return (
        this.mortgagePayment +
        this.hoaFee +
        this.insurancePayment +
        this.taxPayment
      );
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    chartData() {
      const data = [];
      if (this.hasHoaFee) {
        data.push(this.calculateDataEntry(-240, 10, this.principalColor)); // Principal
        data.push(this.calculateDataEntry(10, 40, this.hoaColor)); // HOA
      } else {
        data.push(this.calculateDataEntry(-240, 40, this.principalColor)); // Principal
      }

      return [
        ...data,
        this.calculateDataEntry(40, 65, this.insuranceColor), // Insurance6
        this.calculateDataEntry(65, 120, this.taxColor), // TAx
      ];
    },
    textData() {
      const data = [];

      data.push({
        amount: this.numberWithCommas(this.mortgagePayment.toFixed(0)),
        text1: 'principal',
        text2: '+ interest*',
        x: 0,
        y: 40,
        color: this.principalColor,
      });

      if (this.hasHoaFee) {
        data.push({
          amount: this.numberWithCommas(this.hoaFee.toFixed(0)),
          text1: 'HOA fee',
          x: 295,
          y: 230,
          color: this.hoaColor,
        });
      }

      data.push({
        amount: this.numberWithCommas(this.insurancePayment.toFixed(0)),
        text1: 'insurance',
        x: 250,
        y: 290,
        color: this.insuranceColor,
      });

      data.push({
        amount: this.numberWithCommas(this.taxPayment.toFixed(0)),
        text1: 'taxes',
        x: 145,
        y: 315,
        color: this.taxColor,
      });

      return data;
    },
  },
  methods: {
    numberWithCommas(x) {
      return x
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    calculateDataEntry(start, end, color) {
      const data = {
        start,
        end,
        color,
        rotate: `rotate(${start}, ${this.cx}, ${this.cy})`,
        dashOffset: 0,
      };

      let length;
      if (start < 0) {
        if (end < 0) {
          length = Math.abs(start) + end;
        } else {
          length = Math.abs(start) + end;
        }
      } else {
        length = end - start;
      }

      data.dashOffset = this.circumference - ((length / 360) * this.circumference);

      return data;
    },
  },
};
</script>

<style scoped lang="scss">
.total {
  color: rgb(22, 59, 92);
  font-size: 2em;
  font-weight: 600;
}

.per-month {
  color: rgb(22, 59, 92);
  font-size: 1.2em;
  font-weight: 500;
  text-transform: capitalize;
}

.amount {
  font-weight: 700;
  font-size: 1.05em;
}
</style>
