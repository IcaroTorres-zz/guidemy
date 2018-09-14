<template>
  <v-container fill-height align-center justify-center>
    <v-card color="primary" :width="smAndDown ? 400 : 900" >
      <v-card-title class="headline secondary">
        Search for this App users
      </v-card-title>
      <v-card-title>
        Explore this Agile Management Prototype's data
        <v-spacer></v-spacer>
        check here 
        <a
          class="success--text subheading pl-2"
          href="https://github.com/guidemy"
          target="_blank"
        >The project's repo</a>.
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="info"
          hide-no-data
          hide-selected
          item-text="displayName"
          item-value="id"
          label="Search for users details"
          placeholder="Start typing to Search"
          prepend-icon="group"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="red lighten-3">
          <v-list-tile
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="field.value"></v-list-tile-title>
              <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!model"
          color="grey darken-3"
          @click="model = null"
        >
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      stringLimit: 200,
      entries: [],
      isLoading: false,
      model: null,
      search: null
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key: key,
            value: this.model[key] || 'n/a'
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          Object.keys(entry).forEach(key => {
            if (typeof entry[key] === 'string') {
              const newVal = entry[key].length > this.stringLimit
                ? entry[key].slice(0, this.stringLimit) + '...'
                : entry[key]
              entry = Object.assign({}, entry, { newVal })
            }
          })
          return entry
        })
      },
      generate () {
        return Object.values(this.users)
      }
    },
    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        // Lazily load input items
        new Promise(resolve => {
          resolve(this.generated.filter(user => {
            console.log(user, 'detailed user')
            return user.username.toLowerCase().includes(val) || user.displayName.toLowerCase().includes(val)
          }))
        })
          .then(res => {
            this.count = res.length
            this.entries = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    }
  }
</script>