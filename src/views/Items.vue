<template>
  <v-data-table
    :headers="headers"
    :items="items"
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

            <v-divider class="mx-2"></v-divider>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    @click="$refs.imagefile.click()"
                  >
                    <Img-Component
                      :path="editedItem.pig"
                      max-width="170"
                      max-height="282"
                    ></Img-Component>
                    <input type="file"
                      ref="imagefile"
                      @change="fileUpload"
                      class="d-none"
                    >
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.code"
                          label="CODE"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.category_code"
                          label="CATEGORY"
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.nameKor"
                          label="NAME(KR)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.nameEng"
                          label="NAME(EN)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.unit"
                          label="UNIT"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.marker"
                          label="MARKER"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.sellPlace"
                          label="PLACE(SELL)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.sellPrice"
                          label="PRICE(SELL)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.buyPrice"
                          label="PRICE(BUY)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.buyPrice1"
                          label="PRICE-1(BUY)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.buyPrice2"
                          label="PRICE-2(BUY)"
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
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

    <template v-slot:item.pig="{ item }">
      <Img-Component
        :path="item.pig"
        max-width="100"
        max-height="100"
      ></Img-Component>
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
  name: 'Items',
  data() {
    return {
      search: '',
      headers: [
        { text: '이미지', value: 'pig', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline py-2' },
        { text: '코드', value: 'code', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '한글명', value: 'nameKor', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '영문명', value: 'nameEng', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '단위', value: 'unit', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '구매가', value: 'buyPrice', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '구매가1', value: 'buyPrice1', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '구매가2', value: 'buyPrice2', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '판매가', value: 'sellPlace', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '판매처', value: 'sellPrice', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '비고', value: 'marker', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '카테고리', value: 'category_code', divider: true, align: 'center', class: 'grey lighten-1 text-subtitle-1 font-weight-bold', cellClass: 'text-overline' },
        { text: '', value: 'actions', class: 'grey lighten-1' }
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        buyPrice: 0,
        buyPrice1: 0,
        buyPrice2: 0,
        category_code: '',
        code: '',
        marker: '',
        nameEng: '',
        nameKor: '',
        pig: '',
        sellPlace: '',
        sellPrice: 0,
        unit: ''
      },
      defaultItem: {
        buyPrice: 0,
        buyPrice1: 0,
        buyPrice2: 0,
        category_code: '',
        code: '',
        marker: '',
        nameEng: '',
        nameKor: '',
        pig: '',
        sellPlace: '',
        sellPrice: 0,
        unit: ''
      },
      noImage: '/photo_1280.png'
    }
  },
  computed:{
    pageNum() {
      return this.$store.getters['item/pageNum'] + 1;
    },
    limit() {
      return this.$store.getters['item/limit'];
    },
    loading() {
      return this.$store.getters['item/loading'];
    },
    total() {
      return this.$store.getters['item/total'];
    },
    items() {
      return this.$store.getters['item/items'];
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
      this.$store.dispatch('item/find', { search: this.search })
    },
    updatePage(pageNum) {
      this.$store.commit('item/setPageNum', pageNum - 1);
      this.onSearch();
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$store.dispatch('item/delete', { code: this.editedItem.code });
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
      this.$store.dispatch('item/save', { cmd: this.editedIndex, savedItem: this.editedItem });
      this.close()
    },
    fileUpload(file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('category', '00');
      this.$store
          .dispatch('item/fileUpload', formData)
          .then(data => {
            console.log(data);
            // 서버에 업로드되면서 encoding된 파일명을 넣어준다.
            this.editedItem.pig = `/${data.filename}`;
          });
    }
  },
  mounted() {
    this.$store.dispatch('item/find', { search: this.search })
  }
}
</script>