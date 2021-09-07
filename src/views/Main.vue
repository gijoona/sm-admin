<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <v-card
          color="light-blue"
          height="120"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            평균 방문자 수
          </v-card-title>
          <v-sheet
            class="text-right text-h3"
            color="light-blue"
          >
            <h1
              style="margin-top: -20px;"
            >{{ loginData.avg }} <span class="mr-5 text-subtitle-2">명</span></h1>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="teal"
          height="120"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            누적 방문자 수
          </v-card-title>
          <v-sheet
            class="text-right text-h3"
            color="teal"
          >
            <h1
              style="margin-top: -20px;"
            >{{ loginData.total }} <span class="mr-5 text-subtitle-2">명</span></h1>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="cyan"
          height="120"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            전체 회원 수
          </v-card-title>
          <v-sheet
            class="text-right text-h3"
            color="cyan"
          >
            <h1
              style="margin-top: -20px;"
            >{{ joinData.total }} <span class="mr-5 text-subtitle-2">명</span></h1>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          color="light-blue darken-4"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            일별 접속현황
          </v-card-title>
          <v-sheet
            color="light-blue darken-2"
          >
            <v-sparkline
              :labels="loginData.labels"
              :value="loginData.values"
              color="white"
              label-size="5"
              auto-draw
            ></v-sparkline>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="indigo darken-1"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            누적 회원가입 현황
          </v-card-title>
          <v-sheet
            color="indigo lighten-1"
          >
            <v-sparkline
              :labels="joinData.accs"
              :value="joinData.accs"
              color="white"
              label-size="5"
              auto-draw
            ></v-sparkline>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          color="cyan darken-3"
          dark
        >
          <v-card-title
            class="text-h6 font-weight-black"
          >
            제품 선호현황
          </v-card-title>
          <v-sheet
            color="cyan"
          >
            <BarChart
              v-if="render"
              :labels="cartData.labels"
              :values="cartData.values"
            />
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/chart/Bar-chart'
// @ is an alias to /src
export default {
  components: {
    BarChart
  },
  name: 'Main',
  data: () => {
    return {
      render: false
    }
  },
  computed: {
    ...mapGetters({
      logData: 'log/getLogData',
      loginData: 'log/getLoginData',
      joinData: 'log/getJoinData',
      cartData: 'log/getCartData'
    })
  },
  watch: {
    cartData() {
      this.render = true;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch('log/findChart');
  }
}
</script>