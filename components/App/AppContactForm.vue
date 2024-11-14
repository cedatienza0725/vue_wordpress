<template>
  <client-only>
    <section class="AppContactForm">
      <div v-if="isSubmitted" class="AppContactForm__submittedContainer">
        <div>
          Thanks for contacting us! We will get in touch with you shortly.
        </div>
      </div>
      <div v-else class="container">
        <h2 v-if="content.section_headline" class="AppContactForm__title">
          {{ content.section_headline }}
        </h2>

        <p
          v-if="content.form_description"
          class="AppContactForm__subtitle"
          v-html="content.form_description"
        />

        <form
          class="AppContactForm__form"
          autocomplete="off"
          @submit.prevent="onSubmit()"
        >
          <div class="row">
            <div
              v-for="(item, index) in form.fields"
              :key="index"
              :class="
                checkConditionalLogic(item) && [
                  'col-12',
                  {
                    'col-md-6':
                      item.cssClass === 'left_half' ||
                      item.cssClass === 'right_half',
                  },
                ]
              "
            >
              <div
                v-if="item.type === 'text' && checkConditionalLogic(item)"
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <input
                  v-model="field.contactform_data[item.defaultValue]"
                  class="AppContactForm__field"
                  :name="field.contactform_data[item.defaultValue]"
                  type="text"
                />
              </div>

              <div
                v-if="item.type === 'phone' && checkConditionalLogic(item)"
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <input
                  v-model="field.contactform_data[item.defaultValue]"
                  class="AppContactForm__field"
                  :name="field.contactform_data[item.defaultValue]"
                  type="phone"
                />
              </div>

              <div
                v-else-if="item.type === 'email' && checkConditionalLogic(item)"
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <input
                  v-model="field.contactform_data[item.defaultValue]"
                  :name="field.contactform_data[item.defaultValue]"
                  class="AppContactForm__field"
                  type="email"
                />
              </div>

              <div
                v-else-if="
                  item.type === 'select' && checkConditionalLogic(item)
                "
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <select
                  v-model="field.contactform_data[item.defaultValue]"
                  class="AppContactForm__field"
                  :name="field.contactform_data[item.defaultValue]"
                >
                  <option
                    v-for="(select, selectIndex) in item.choices"
                    :key="selectIndex"
                    :value="select.value"
                  >
                    {{ select.text }}
                  </option>
                </select>
              </div>

              <div
                v-else-if="item.type === 'radio' && checkConditionalLogic(item)"
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <div
                  v-for="(radio, radioIndex) in item.choices"
                  :key="radioIndex"
                  class="AppContactForm__radio"
                >
                  <input
                    :id="radio.text"
                    v-model="field.contactform_data[radio.value]"
                    :name="field.contactform_data[radio.value]"
                    type="radio"
                    :value="radio.text"
                  />

                  <label class="AppContactForm__label" :for="radio.text">
                    {{ radio.text }}
                  </label>
                </div>
              </div>

              <div
                v-else-if="
                  item.type === 'textarea' && checkConditionalLogic(item)
                "
                class="AppContactForm__item"
              >
                <label class="AppContactForm__label">
                  {{ item.label }}
                </label>

                <textarea
                  v-model="field.contactform_data[item.defaultValue]"
                  :name="field.contactform_data[item.defaultValue]"
                  class="AppContactForm__textarea"
                  type="text"
                  rows="10"
                  cols="100%"
                  placeholder="Tell us a little bit more!"
                />
              </div>

              <div
                v-else-if="
                  item.type === 'checkbox' && checkConditionalLogic(item)
                "
                class="AppContactForm__item AppContactForm__checkbox"
              >
                <input
                  id="mailing"
                  v-model="field.contactform_data[item.choices[0].value]"
                  :value="field.contactform_data[item.choices[0].value]"
                  :name="field.contactform_data[item.choices[0].value]"
                  class="AppContactForm__field"
                  type="checkbox"
                />

                <label class="AppContactForm__label" for="mailing">
                  {{ item.label }}
                </label>
              </div>
            </div>
          </div>

          <AppButton
            :text="form.button.text"
            color="pink"
            @click.native.prevent="onSubmit()"
          />
        </form>
      </div>
    </section>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    form: {
      type: Object,
      default: () => {},
    },

    content: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      field: {
        contactform_data: [],
      },
      isSubmitted: false,
    };
  },

  mounted() {
    this.form.fields.map((field) => {
      console.log("***field label: ", field.label, field.conditionalLogic);
    });
  },

  methods: {
    ...mapActions({
      sendContact: "contact/sendContact",
    }),

    checkConditionalLogic(item) {
      let conditions = [];
      if (
        item.conditionalLogic.rules &&
        item.conditionalLogic.rules.length > 0
      ) {
        item.conditionalLogic.rules.map((rule) => {
          const conditionalField = this.form.fields.filter(
            (field) => field.id == rule.fieldId
          )[0];
          if (
            conditionalField &&
            this.field.contactform_data[conditionalField.defaultValue] !==
              rule.value
          ) {
            conditions.push(false);
          } else {
            conditions.push(true);
          }
        });
      }
      if (
        conditions.length === 0 ||
        conditions.filter((condition) => condition === true).length > 0
      ) {
        return true;
      }
      return false;
    },

    async onSubmit() {
      const params = {};

      params.form_id = this.form.id;

      if (this.field.contactform_data.firstName) {
        params[1] = this.field.contactform_data.firstName;
      }

      if (this.field.contactform_data.lastName) {
        params[2] = this.field.contactform_data.lastName;
      }

      if (this.field.contactform_data.phoneNumber) {
        params[3] = this.field.contactform_data.phoneNumber;
      }

      if (this.field.contactform_data.email) {
        params[4] = this.field.contactform_data.email;
      }

      if (this.field.contactform_data.howcanwehelpyou) {
        params[16] = this.field.contactform_data.howcanwehelpyou;
      }

      if (this.field.contactform_data.zipcode) {
        params[21] = this.field.contactform_data.zipcode;
      }

      if (this.field.contactform_data.ownerrenter) {
        params[20] = this.field.contactform_data.ownerrenter;
      }

      if (this.field.contactform_data.preffercontact) {
        params[22] = this.field.contactform_data.preffercontact;
      }

      if (this.field.contactform_data.comments) {
        params[13] = this.field.contactform_data.comments;
      }

      if (this.field.contactform_data.hearAboutUs) {
        if (this.form.id === 14) {
          params[10] = this.field.contactform_data.hearAboutUs;
        }
        params[14] = this.field.contactform_data.hearAboutUs;
      }

      if (this.field.contactform_data.mailing) {
        params[15] = this.field.contactform_data.mailing;
      }

      this.field.contactform_data = "";
      this.isSubmitted = true;
      try {
        await this.sendContact(JSON.stringify(params));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.AppContactForm {
  position: relative;
  padding: 80px 0;

  &__submittedContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      text-align: center;
      max-width: 600px;
      background-color: #cccccc;
      color: white;
      padding: 24px 36px;
      font-size: 20px;
      line-height: 150%;
    }
  }

  &__form {
    padding-top: 28px;
  }

  &__title {
    text-align: center;
    font-weight: 400;
    line-height: 1.3;
    letter-spacing: 0px;
    margin-bottom: 20px;
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    color: $grey;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 28px;
  }

  &__field {
    color: #212121;
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 0;
    vertical-align: middle;
    padding: 0.35em 0.6em;
    outline: none;
    transition: border 0.3s ease;

    &:hover {
      border: 1px solid rgb(119, 119, 119);
    }

    &:focus {
      border: 1px solid rgb(119, 119, 119);
    }
  }

  &__textarea {
    color: #212121;
    padding: 10px;
    font-size: 18px;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 0;
    vertical-align: middle;
    padding: 0.35em 0.6em;
    outline: none;
    transition: border 0.3s ease;

    &:hover {
      border: 1px solid rgb(119, 119, 119);
    }

    &:focus {
      border: 1px solid rgb(119, 119, 119);
    }
    &::placeholder {
      font-size: 18px;
      color: #9b9b9b;
    }
  }

  &__error {
    position: absolute;
    bottom: 5px;
    left: 0;
    line-height: 1.2rem;
    color: #d40003;
    font-weight: 300;
    font-size: 16px;
  }

  &__label {
    color: #484954;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    margin: 0;
  }

  &__checkbox {
    flex-direction: row;
    align-items: center;

    .AppContactForm__label {
      margin-left: 14px;
    }
  }

  @media (min-width: $medium-devices-width) {
    &__title {
      font-size: 38px;
    }
  }
}
</style>
