<template>
  <div>
    <!-- Start Navbar -->
    <div>
      <b-navbar type="dark" variant="warning" class="fixed-top">
        <b-navbar-nav>
          <b-nav-item href="#">
            <img src="../assets/sr.svg" class="search" alt /> SmartSearch
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <!-- End Navbar -->
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-5 box1">
            <div>
              <h3 class="title pt-3">An Amazing Country Directory App</h3>
              <p class="text">
                Just a click away you get to see the list of all countries, their states and cities.
                Interesting right?
              </p>
              <a class="btn-rounded get_started" href="#steps">Get Started</a>
            </div>
          </div>
          <div class="col-md-7 box2 pt-4">
            <img src="../assets/bg.png" class="img-fluid" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div id="steps">
      <div class="steps mt-5 mb-5">
        <div class="text-center mb-5">
          <h3>How It Works</h3>
          <hr class="border" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card py-4 px-4 text-center">
                <div class="image_layer mb-4 mt-2">
                  <img src="../assets/1.png" class="icon" />
                </div>
                <h4>STEP 1</h4>
                <p>
                  Click on the input field for "Select Country". It will automatically
                  populate the list of all countries. Feel free to select any country.
                </p>
              </div>
            </div>
            <div class="col">
              <div class="card py-4 px-4 text-center">
                <div class="image_layer mb-4 mt-2">
                  <img src="../assets/2.png" class="icon two" />
                </div>
                <h4>STEP 2</h4>
                <p>
                  Click on the input field for "Select State".This will populate the
                  respective states of the country you selected earlier. Select your favourite state.
                </p>
              </div>
            </div>
            <div class="col">
              <div class="card py-4 px-4 text-center">
                <div class="image_layer mb-4 mt-2">
                  <img src="../assets/3.png" class="icon pt-0" />
                </div>
                <h4>STEP 3</h4>
                <p>
                  Click on the input field for "Select City". Here you'll have the list of cities in a particular state.
                  populate the list of all countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Let's Get Started -->
    <div class="start mb-5">
      <div class="text-center mb-3">
        <h3>Let's Get Started</h3>
        <hr class="border" />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-4 mt-2">
            <label for>Select Country</label>
            <select
              class="form-control"
              v-model="selectedCountry"
              @change="selectCountry"
              name="countries"
              id="countries"
            >
              <option
                :value="country.name"
                v-for="country in getCountries"
                :key="country.id"
              >{{country.name}}</option>
            </select>
          </div>
          <div class="col-md-4 mt-2">
            <label for>Select State</label>
            <select
              class="form-control"
              v-model="selectedState"
              @change="selectState"
              name="states"
              id="states"
            >
              <option :value="state.name" v-for="state in getStates" :key="state.id">{{state.name}}</option>
            </select>
            <div
              v-if="stateError"
              :class="{ empty: stateError }"
              class="alert alert-warning"
              role="alert"
            >This Country Has No States!</div>
          </div>
          <div class="col-md-4 mt-2">
            <label for>Select City</label>
            <select class="form-control" v-model="selectedCity" name="cities" id="cities">
              <option :value="city.name" v-for="city in getCities" :key="city.id">{{city.name}}</option>
            </select>
            <div
              v-if="cityError"
              :class="{ empty: cityError }"
              class="alert alert-warning"
              role="alert"
            >This State Doesn't Have Any City!</div>
          </div>
        </div>
        <div class="mt-4 text-center">
          <h4 class="selected_value" v-if="selectedCountry !== '' ">
            Selected Country:
            <span>{{selectedCountry}}</span>
          </h4>
          <h4 class="selected_value" v-if="selectedState !== '' ">
            Selected State:
            <span>{{selectedState}}</span>
          </h4>
          <h4 class="selected_value" v-if="selectedCity !== '' ">
            Selected City:
            <span>{{selectedCity}}</span>
          </h4>
        </div>
      </div>
    </div>

    <!-- Footer Social Links -->
    <div class="footer pt-5 pb-5">
      <div class="container text-center">
        <img src="../assets/social.svg" class="icon mb-5" alt />
        <h3 class="mb-5">SOCIAL</h3>
        <a href>
          <img src="../assets/twitter.svg" class="icons p-2 m-2" alt />
        </a>
        <a href>
          <img src="../assets/facebook.svg" class="icons p-2 m-2" alt />
        </a>
        <a href>
          <img src="../assets/github.svg" class="icons p-2 m-2" alt />
        </a>
        <a href>
          <img src="../assets/linkedin.svg" class="icons p-2 m-2" alt />
        </a>
        <a href>
          <img src="../assets/medium.svg" class="icons p-2 m-2" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters } from "vuex";

export default {
  name: "Countries",
  data() {
    return {
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
      stateError: false,
      cityError: false,
    };
  },
  created() {
    this.$store.dispatch("loadCountries");
  },
  computed: {
    ...mapGetters(["getCountries", "getStates", "getCities"]),
  },
  methods: {
    selectCountry(e) {
      this.$store.dispatch("selectCountry", { selected: e.target.value });
      // console.log(this.getStates.length, 'state length')
      if (this.getStates.length === 0) {
        this.stateError = !this.stateError;
      } else {
        this.stateError = false;
      }
    },
    selectState(a) {
      this.$store.dispatch("selectState", { selected: a.target.value });
      if (this.getCities.length === 0) {
        this.stateError = !this.stateError;
      } else {
        this.stateError = false;
      }
    },
  },
};
</script>


<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: #fff;
  font-family: fantasy;
  font-weight: 700;
  font-size: x-large;
}
.nav-link {
  padding: 0rem 1rem !important;
}
img.search {
  width: 30px;
}
.box1 {
  display: flex;
  align-items: center;
}
p.text {
  font-size: large;
  color: #2f2e41;
}
h3.title {
  font-size: 45px;
  color: #2f2e41;
  font-weight: 700;
}
a.get_started {
  background: orange;
  color: #fff;
  padding: 8px 30px;
  font-size: large;
  border: none;
  text-decoration: none;
  border-radius: 7px;
}
a.get_started:hover {
  background: rgb(241, 162, 15) !important;
}
.steps .card {
  width: 21em;
  background-color: white;
  text-align: center;
  line-height: 1.3em;
  border: none;
  border-radius: 0.2em;
  box-shadow: -1px 1px 10px 10px rgb(236, 234, 234);
}
img.icon {
  width: 45%;
  border-radius: 50%;
  border: 1px solid orange;
  padding-top: 10px;
}
.icon.two {
  width: 47%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.steps h4 {
  color: #2f2e41;
  font-weight: 700;
}
.steps h3,
.start h3 {
  color: #2f2e41;
  font-weight: 700;
  font-size: 35px;
}
hr.border {
  border: 2px solid orange !important;
  width: 50px;
}
.form-control {
  line-height: 1.5;
  color: #fff !important;
  background-color: orange !important;
  background-clip: padding-box;
  border: 1px solid #ffffff !important;
}
.form-control:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(255, 165, 0) !important;
}
.footer {
  background: orange;
}
.footer .icon {
  width: 50px;
}
.footer .icons {
  width: 50px;
  background: #2f2e41;
  border-radius: 50%;
}
.footer h3 {
  color: #2f2e41;
  font-family: auto;
  font-weight: 600;
}
.selected_value {
  color: #2f2e41;
  font-weight: 700;
}
.selected_value span {
  color: #2f2e41;
  font-weight: 500;
}

@media screen and (max-width: 780px) {
  .box2 {
    order: 1;
  }
  .box1 {
    order: 2;
  }
  h3.title {
    font-size: 32px;
  }
}
</style>
