<template>
  <v-data-table
    :headers="headers"
    :items="accounts"
    :search="search"
    item-key="id"
    :page="pageNum"
    :items-per-page="limit"
    :server-items-length="total"
    :loading="loading"
    @update:page="updatePage"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        color="#FAFAF0"
      >
        <v-toolbar-title>
          <v-text-field
            v-model="search"
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
          v-model="dialog"
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
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.ceoNm"
                      label="CEO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.pass"
                      label="PASSWARD"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="EMAIL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.tel"
                      label="TEL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.fax"
                      label="FAX"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="PHONE"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.zipCode"
                      label="ZIP CODE"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.addr1"
                      label="ADDRESS"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.addr2"
                      label="ADDRESS DETAIL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.nation"
                      label="NATION"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.area1"
                      label="AREA"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.area2"
                      label="AREA DETAIL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="editedItem.type"
                      label="TYPE"
                      :items="typeItems"
                      item-text="text"
                      item-value="value"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.companyNo"
                      label="COMPANY REG NO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.corpNo"
                      label="CORPORATION NO"
                    ></v-text-field>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this Account?</v-card-title>
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

    <template v-slot:item.type="{ item }">
      {{ getText(item.type) }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'Accounts',
  data() {
    return {
      search: '',
      headers: [
        { text: 'code', value: 'code', class: 'd-none', cellClass: 'd-none' },
        { text: '아이디', value: 'id', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline py-2' },
        { text: '이름', value: 'name', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '대표자', value: 'ceoNm', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '이메일', value: 'email', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '전화번호', value: 'tel', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '핸드폰', value: 'phone', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '팩스', value: 'fax', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '구분', value: 'type', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '사업자등록번호', value: 'companyNo', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '가입일자', value: 'createdAt', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: 'isPaidMember', value: 'isPaidMember', class: 'd-none', cellClass: 'd-none' },
        { text: 'paidStart', value: 'paidStart', class: 'd-none', cellClass: 'd-none' },
        { text: 'paidEnd', value: 'paidEnd', class: 'd-none', cellClass: 'd-none' },
        { text: 'zipCode', value: 'zipCode', class: 'd-none', cellClass: 'd-none' },
        { text: 'addr1', value: 'addr1', class: 'd-none', cellClass: 'd-none' },
        { text: 'addr2', value: 'addr2', class: 'd-none', cellClass: 'd-none' },
        { text: 'nation', value: 'nation', class: 'd-none', cellClass: 'd-none' },
        { text: 'area1', value: 'area1', class: 'd-none', cellClass: 'd-none' },
        { text: 'area2', value: 'area2', class: 'd-none', cellClass: 'd-none' },
        { text: 'corpNo', value: 'corpNo', class: 'd-none', cellClass: 'd-none' },
        { text: 'pass', value: 'pass', class: 'd-none', cellClass: 'd-none' },
        { text: 'updatedAt', value: 'updatedAt', class: 'd-none', cellClass: 'd-none' },
        { text: '', value: 'actions', class: 'grey lighten-1' }
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        addr1: '',
        addr2: '',
        area1: '',
        area2: '',
        ceoNm: '',
        companyNo: '',
        corpNo: '',
        createdAt: '',
        email: '',
        fax: '',
        id: '',
        isPaidMember: 'N',
        name: '',
        nation: '',
        paidEnd: '',
        paidStart: '',
        phone: '',
        tel: '',
        type: '',
        updatedAt: '',
        zipCode: ''
      },
      defaultItem: {
        addr1: '',
        addr2: '',
        area1: '',
        area2: '',
        ceoNm: '',
        companyNo: '',
        corpNo: '',
        createdAt: '',
        email: '',
        fax: '',
        id: '',
        isPaidMember: 'N',
        name: '',
        nation: '',
        paidEnd: '',
        paidStart: '',
        phone: '',
        tel: '',
        type: '',
        updatedAt: '',
        zipCode: ''
      },
      typeItems: [ 
        { text: '마린', value: 'M'},
        { text: '종합상사', value: 'C'},
        { text: '공급처', value: 'P'},
      ]
    }
  },
  computed:{
    pageNum() {
      return this.$store.getters['account/pageNum'] + 1;
    },
    limit() {
      return this.$store.getters['account/limit'];
    },
    loading() {
      return this.$store.getters['account/loading'];
    },
    total() {
      return this.$store.getters['account/total'];
    },
    accounts() {
      return this.$store.getters['account/accounts'];
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods:{
    onSearch() {
      this.$store.dispatch('account/find', { search: this.search })
    },
    updatePage(pageNum) {
      this.$store.commit('account/setPageNum', pageNum - 1);
      this.onSearch();
    },
    editItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem);
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$store.dispatch('account/delete', { code: this.editedItem.code });
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.$store.dispatch('account/save', { cmd: this.editedIndex, savedItem: this.editedItem });
      this.close()
    },
    getText(code) {
      let item = this.typeItems.find(type => type.value === code);
      return item ? item.text : '';
    }
  },
  mounted() {
    this.$store.dispatch('account/find', { search: this.search })
  }
}
</script>