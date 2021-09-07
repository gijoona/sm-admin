<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
        class="pt-10"
      >
        <v-data-table
          :headers="masterHeaders"
          :items="masters"
          @click:row="selectMaster"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item, 'master')"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item, 'master')"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col
        cols="12"
        md="8"
        style="margin-top: -35px;"
      >
        <v-data-table
          :headers="slaveHeaders"
          :items="slaves"
        >
          <template v-slot:top>
            <v-toolbar
              flat
              color="#FAFAF0"
            >
              <v-toolbar-title>
                <v-text-field
                  v-model="slaveSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  @keydown.enter="onSearch"
                ></v-text-field>
              </v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="slaveDialog"
                max-width="800px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    fab
                    small
                    class="mb-2 elevation-1"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-divider class="mx-1"></v-divider>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="slaveEditedItem.code"
                            label="CODE"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="slaveEditedItem.type"
                            label="TYPE"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="slaveEditedItem.text"
                            label="TEXT"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            v-model="slaveEditedItem.sort"
                            label="SORT"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          md="3"
                        >
                          <v-select
                            v-model="slaveEditedItem.isUse"
                            :items="useItems"
                            label="USE"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="slaveDialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this Product?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item, 'slave')"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item, 'slave')"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '',
  data() {
    return {
      masterSearch: '',
      slaveSearch: '',
      currentMasterId: 0,
      masterHeaders: [
        { text: 'ID', value: 'id', class: 'd-none', cellClass: 'd-none' },
        { text: 'NAME', value: 'name', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'SORT', value: 'sort', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'USE', value: 'isUse', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { value: 'actions', class: 'grey lighten-1' }
      ],
      slaveHeaders: [
        { text: 'ID', value: 'id', class: 'd-none', cellClass: 'd-none' },
        { text: 'MASTER', value: 'masterId', class: 'd-none', cellClass: 'd-none' },
        { text: 'CODE', value: 'code', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'TYPE', value: 'type', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'TEXT', value: 'text', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'SORT', value: 'sort', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'USE', value: 'isUse', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { value: 'actions', class: 'grey lighten-1' }
      ],
      masterDialog: false,
      masterDialogDelete: false,
      slaveDialog: false,
      slaveDialogDelete: false,
      masterEditedIndex: -1,
      slaveEditedIndex: -1,
      masterEditedItem: {
        id: 0,
        name: '',
        sort: 0,
        isUse: 'Y',
      },
      slaveEditedItem: {
        id: 0,
        code: '',
        type: '',
        text: '',
        sort: 0,
        isUse: 'Y',
        masterId: 0
      },
      masterDefaultItem: {
        id: 0,
        name: '',
        sort: 0,
        isUse: 'Y',
      },
      slaveDefaultItem: {
        id: 0,
        code: '',
        type: '',
        text: '',
        sort: 0,
        isUse: 'Y',
        masterId: 0
      },
      useItems: ['Y', 'N']
    }
  },
  computed: {
    ...mapGetters({
      masters: 'lang/masters',
      slaves: 'lang/slaves'
    }),
    formTitle () {
      return this.slaveEditedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  methods: {
    ...mapActions({
      findAll: 'lang/findAll'
    }),
    selectMaster(master) {
      this.currentMasterId = master.id;
      this.$store.commit('lang/setSlaves', master.slaves);
    },
    editItem (item, type) {
      if (type === 'master') {
        this.masterEditedIndex = this.masters.indexOf(item)
        this.masterEditedItem = Object.assign({}, item)
        this.masterDialog = true
      } else {
        this.slaveEditedIndex = this.slaves.indexOf(item)
        this.slaveEditedItem = Object.assign({}, item)
        this.slaveDialog = true
      }
    },
    deleteItem (item, type) {
      if (type === 'master') {
        this.masterEditedIndex = this.masters.indexOf(item)
        this.masterEditedItem = Object.assign({}, item)
        this.masterDialogDelete = true
      } else {
        this.slaveEditedIndex = this.slaves.indexOf(item)
        this.slaveEditedItem = Object.assign({}, item)
        this.slaveDialogDelete = true
      }
    },
    deleteItemConfirm () {
      this.$store.dispatch('lang/delete', { id: this.slaveEditedItem.id });
      this.closeDelete()
    },
    close () {
      this.masterDialog = false;
      this.slaveDialog = false;
      this.$nextTick(() => {
        this.masterEditedItem = Object.assign({}, this.masterDefaultItem)
        this.masterEditedIndex = -1
        this.slaveEditedItem = Object.assign({}, this.slaveDefaultItem)
        this.slaveEditedIndex = -1
      })
    },
    closeDelete () {
      this.masterDialogDelete = false
      this.slaveDialogDelete = false
      this.$nextTick(() => {
        this.masterEditedItem = Object.assign({}, this.masterDefaultItem)
        this.masterEditedIndex = -1
        this.slaveEditedItem = Object.assign({}, this.slaveDefaultItem)
        this.slaveEditedIndex = -1
      })
    },
    save () {
      this.slaveEditedItem.masterId = this.currentMasterId;
      this.$store.dispatch('lang/save', { savedItem: this.slaveEditedItem });
      this.close()
    },
  },
  mounted() {
    this.findAll();
  }
}
</script>