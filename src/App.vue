<template>
  <v-app
    style="background: #FAFAF0;"
  >
    <v-navigation-drawer
      app
      dark
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Space Marine
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content v-if="userinfo.name">
            <v-list-item-title class="text-h6">
              {{ userinfo.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ userinfo.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title class="text-h6">
              스페이스마린
            </v-list-item-title>
            <v-list-item-subtitle>관리자사이트</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item 
          link
          to="/"
        >
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item 
          link
          to="/items"
        >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Items</v-list-item-title>
        </v-list-item>

        <v-list-item 
          link
          to="/accounts"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Accounts</v-list-item-title>
        </v-list-item>

        <v-list-item 
          link
          to="/langs"
        >
          <v-list-item-icon>
            <v-icon>mdi-translate</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Langs</v-list-item-title>
        </v-list-item>

      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card
          color="transparent"
          tile
          class="elevation-0"
        >
          <v-toolbar
            color="transparent"
            flat
            dense
          >
            <h1>
              <v-icon
                class="mr-1"
                large
              >
                {{ $route.meta.icon }}
              </v-icon>
              {{ $route.name }}
            </h1>

            <v-spacer></v-spacer>

            <!-- <v-btn>
              functional buttons
            </v-btn> -->
          </v-toolbar>
        </v-card>

        <!-- If using vue-router -->
        <router-view></router-view>

        <!-- <v-fab-transition>
          <v-btn
            color="indigo"
            dark
            fixed
            bottom
            right
            fab
            @click="$vuetify.goTo(target, options)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-fab-transition> -->
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    prominent: false,
    bg_color: '#FAFAF0',
    type: 'number',
    number: 0,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic',
  }),

  computed: {
    ...mapGetters({
      userinfo: 'user/userinfo'
    }),
    target() {
      return Number(this[this.type])
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    }
  }
};
</script>