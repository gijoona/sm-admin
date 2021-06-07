<template>
  <v-sheet
    color="transparent"
    class="d-flex align-center justify-center"
    style="width:100%; height:100%;"
  >
    <v-card
      class="elevation-6"
      width="500"
      height="300"
    >
      <v-toolbar
        flat
        tile
        dark
        color="dark"
      >
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      
      <v-card-text>
        <v-form
          v-model="valid"
        >
          <v-text-field
            v-model="username"
            :counter="20"
            :roles="usernameRules"
            label="USER ID"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="PASSWORD"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider
        class="mx-4"
      ></v-divider>

      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn
              block
              dark
              color="indigo"
              @click="login"
            >Login</v-btn>
          </v-col>
          <v-col>
            <v-btn
              block
              dark
              color="green"
            >Join</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      usernameRules: [
        v => !!v || 'ID is required',
        v => (v && v.length >= 5) || 'ID must be more than 5 characters',
        v => (v && v.length <= 20) || 'ID must be less than 20 characters',
      ],
    }
  },
  watch: {
    isLogin(val) {
      if (val) this.$router.push('/');
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.getters['user/username'];
      },
      set(val) {
        this.$store.commit('user/setUsername', val);
      }
    },
    password: {
      get() {
        return this.$store.getters['user/password'];
      },
      set(val) {
        this.$store.commit('user/setPassword', val);
      }
    },
    isLogin() {
      return this.$store.getters['user/isLogin'];
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login');
    }
  }
}
</script>