<template>
  <div class="chart">
    <PaymentDetails
      v-bind="{ mortgagePayment, hoaFee, insurancePayment, taxPayment }"
    />

    <div class="description">
      *Based on {{ priceInfo.term }}-Year
      {{ rateMode === "fixed" ? "Fixed" : "Adjustable" }} Rate Mortgage at
      {{ priceInfo.rates[rateMode] }}% with a
      {{ priceInfo.downPayment * 100 }}% down payment.

      <strong>
        <a
          v-if="!change"
          href="#"
          @click.prevent="change = true;"
        >
          Change
        </a>
      </strong>

      <select v-if="change" v-model="rateMode">
        <option value="fixed">30-year Fixed ({{ priceInfo.rates.fixed }}%)</option>
        <option value="adjustable">5/1 ARM ({{ priceInfo.rates.adjustable }}%)</option>
      </select>

      <div class="disclaimer">
        {{ disclaimer }}

        Broker does not guarantee the accuracy of this information.
        One is advised to independently verify the accuracy of all
        information through their own due diligence.
      </div>
    </div>
  </div>
</template>

<script>
import PaymentDetails from './PaymentDetails';

export default {
  name: 'MortgageCalculator',
  components: { PaymentDetails },
  props: {
    priceInfo: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    showDetails: false,
    rateMode: 'fixed',
    change: false,
  }),
  computed: {
    hasHoaFee() {
      return this.hoaFee && this.hoaFee > 0;
    },
    downPaymentAmount() {
      return this.priceInfo.propPrice * this.priceInfo.downPayment;
    },
    principal() {
      return this.priceInfo.propPrice - this.downPaymentAmount;
    },
    yearlyRate() {
      return this.priceInfo.rates[this.rateMode] / 100;
    },
    interest() {
      return this.yearlyRate / 12;
    },
    nPayments() {
      return this.priceInfo.term * 12;
    },
    mortgagePayment() {
      const a = this.interest * ((1 + this.interest) ** this.nPayments);
      const b = ((1 + this.interest) ** this.nPayments) - 1;
      if (b === 0) {
        return 0
      } else {
        return this.principal * (a / b)
      }
    },
    insurancePayment() {
      return this.priceInfo.insuranceRate;
    },
    taxPayment() {
      return this.priceInfo.taxRate;
    },
    hoaFee() {
      return Object.prototype.hasOwnProperty.call(this.priceInfo, 'hoaFee')
        ? this.priceInfo.hoaFee
        : 0;
    },
    disclaimer() {
      return this.hasHoaFee
        ? this.priceInfo.disclaimer
        : '';
    },
    totalPayment() {
      return (
        this.mortgagePayment +
        this.insurancePayment +
        this.taxPayment +
        this.hoaFee
      );
    },
  },
  methods: {
    numberWithCommas(x) {
      return x
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style scoped lang="scss">
.chart {
  padding: 0 10px;
  width: 100%;

  svg {
    display: block;
    margin: 0 auto 0 auto;
  }
}

.description {
  text-align: center;

  strong {
    font-weight: 600;
  }

  select {
    margin: 15px auto 0 auto;
    display: block;
    padding: 5px 10px;
    border: 1px solid rgb(22, 59, 92);
    outline: none;
    color: rgb(22, 59, 92);
  }

  .disclaimer {
    margin-top: 15px;
    font-size: 0.9rem;
    line-height: 0.98rem;
    color: #737373;
  }
}
</style>
