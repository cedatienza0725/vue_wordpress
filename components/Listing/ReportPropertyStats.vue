<template>
  <section class="ReportPropertyStats">
    <div class="market-report-bar-graph-container">
      <div class="container">
        <h4>Historical view of your property performance on top websites</h4>
        <div class="bar-graph">
          <ul class="x-axis">
            <li v-for="val in this.stats.graph_scale">
              {{ val }}
            </li>
          </ul>
          <div class="bars">
              <div v-for="bar in this.bars" class="element">
                <div class="bar" v-bind:style="{ height: bar.height + '%' }"><span class="value">{{ bar.value }}</span></div>
              </div>
          </div>
          <ul class="y-axis">
            <li v-for="val in this.stats.graph_dates">
              {{ val }}
            </li>
          </ul>
        </div><!--.bar-graph-->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReportPropertyStats',

  props: {
    stats: {
      type: Object,
      default: () => {},
    },
    bars: {
      type: Array,
      default: [],
    },
  }
  
}
</script>

<style scoped lang="scss">
  .ReportPropertyStats {
    padding: 70px 0;
    background: #f3f3f3;
  }
 
  h4 {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 30px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .market-report-bar-graph-container {
    width: 100%;
    margin-bottom: 3rem;
  }

  .bar-graph {
    width: 100%;
    margin: 0 auto;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  .x-axis {
    display: flex;
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
    width: 100%;
    position: absolute;
    height: 500px;

    li {
      font-size: 15px;
      color: #000000;

      &:after {
        content: "";
        display: block;
        border-bottom: 1px solid rgba(31, 32, 33, 0.5);
        position: absolute;
        width: 100%;
      }
    }
  }

  .y-axis {
    display: flex;
    list-style-type: none;
    width: 90%;
    margin: 1rem 0 0 10%;
    padding: 0;

    li {
      color: #000000;
      text-align: center;
      width: 6%;

      & + li {
        margin-left: 2%;
      }
    }
  }

  .bars {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 90%;
    margin-left: 10%;
    overflow: hidden;
  }

  .bar {
    background-color: #003b5c;
    transform-origin: bottom;
    transform: scale(1);
    margin: 0 auto;
    width: 100%;
    text-align: center;
    position: relative;
    border-top-left-radius: 100em;
    border-top-right-radius: 100em;

    .value {
      font-size: 15px;
      bottom: 1.5rem;
      color: #fff;
      transform: rotate(180deg) translateX(50%);
      writing-mode: tb-rl;
      position: absolute;
      bottom: 1rem;
      left: 50%;
    }
  }

  .element {
    height: 100%;
    margin: 0;
    padding: 0 1.5%;
    width: 6%;
    display: flex;
    align-items: flex-end;
    transition: transform .1s ease-in-out;
    transform-origin: center bottom;

    & + .element {
      margin-left: 2%;
    }
  }
</style>