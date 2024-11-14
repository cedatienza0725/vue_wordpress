<template>
  <section class="ReportPropertyPerformance">
    <div class="container">
      <h3 class="report--section_title"><span>{{ this.address.full | titleize }}</span></h3>
      <p>Your property performance on top real estate websites</p>
      <p>{{ this.stats.weekly_views }} views on Zillow, Realtor, and Trulia, who have 90.2% of the market share of real estate website traffic (source: comscore)</p>

      <div class="row">
        <div class="col-sm-6 text-center">
          <div class="view-circle">
            <div>
              <h4>{{ this.stats.total_views }}</h4>
              <p>{{ this.stats.weekly_views }} reached this week</p>
            </div>
          </div>
        </div>

        <div class="col-sm-6 text-center">
          <img
            src="~/assets/images/pills.png"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReportPropertyPerformance',

  props: {
    address: {
      type: Object,
      default: () => {},
    },
    stats: {
      type: Object,
      default: () => {},
    },
  },

  filters: {
    titleize(value){
        return value.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
}

p {
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 12px;

  & + p {
    font-size: 12px;
    margin-bottom: 60px;
  }
}

.view-circle {
  text-align: center;
  background-color: #e3f5ff;
  margin: 0 auto;
  padding: 12px;
  border-radius: 1000em;
  width: 230px;
  height: 230px;

  div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    border: 2px solid #1172a8;
    border-radius: 1000em;
    width: 206px;
    height: 206px;
  }

  h4 {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  p {
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
  }
}
</style>