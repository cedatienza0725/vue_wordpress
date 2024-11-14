<template>
  <section class="ReportPropertyLinks">
    <div class="container">
      <div class="row">

        <div class="col-sm col-md-4" v-if="(this.stats.open_houses !== undefined && this.stats.open_houses.length > 0)">
          <h4>Open Houses</h4>
          <ul>
            <li v-for="open_house in this.stats.open_houses">
              {{ $moment(open_house.date).format("ddd MMM D, YYYY") }} {{ open_house.time }}
            </li>
          </ul>
        </div>
        <div class="col-sm col-md-4" v-if="(this.stats.digital_media_links !== undefined && this.stats.digital_media_links.length > 0)">
          <h4>Digital Media Links</h4>
          <ul>
            <li v-for="digital_media in this.stats.digital_media_links">
              <a :href="digital_media.link.url">{{ digital_media.link.title }}</a>
            </li>
          </ul>
        </div>
        <div class="col-sm col-md-4" v-if="(this.stats.newsletter_links !== undefined && this.stats.newsletter_links.length > 0)">
          <h4>Newsletter Features</h4>
          <ul>
            <li v-for="newsletter in this.stats.newsletter_links">
              <a :href="newsletter.mailchimp_url">{{ newsletter.date }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReportPropertyLinks',

  props: {
    stats: {
      type: Object,
      default: () => {},
    },
  },

  filters: {
    formatDate(dateStr) {
      return Intl.DateTimeFormat("us-EN").format(new Date(dateStr));
    }
  }
}
</script>

<style scoped lang="scss">
.ReportPropertyLinks {
  padding: 60px 0;
}

.col-sm {
  border-left: 1px solid #c4c4c4;
  padding-left: 40px;
  padding-right: 40px;
}

h4 {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 40px;
  color: #1F2021;
}

ul {
  list-style-type: none;
  padding: 0;
  font-size: 16px;

  li {
    line-height: 1.4;
    margin-bottom: 6px;

    a {
      color: #1172A8;
      font-weight: 600;
      text-decoration: underline;
    }
  }
}
</style>