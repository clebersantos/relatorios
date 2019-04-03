<template>
  <v-app>
    <r-sidebar></r-sidebar>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>GITHUB</span>
        <span class="font-weight-light">\CULTURA.GOV.BR</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import axios from 'axios';
import RSidebar from "./components/Sidebar";

export default {
  name: 'App',
  components: {
      RSidebar,
    HelloWorld
  },
  mounted() {
      axios
      .get('https://api.github.com/users/culturagovbr/repos?sort=updated')
      .then(response => (this.repos = response.data))
  },
  data () {
    return {
      info: {},
      headers: [
          {
            text: 'Versão',
            align: 'left',
            value: 'tag_name'
          },
          // { text: 'Data', value: 'created_at' },
          { text: 'Conteudo', value: 'body' },
      ],
      desserts: [],
      repos: [],
      repoSelected: {},
      actions: [
          {
              name: 'releases',
              label: 'Releases',
              url: 'releases'
          },
          {
              name: 'commits',
              label: 'Commits',
              url: 'releases'
          },
      ],
      actionSelected: {},
      paginationLength: 6,
      page: 1
    }
  },
  watch: {
      repoSelected() {
          this.buscar();
      },
      actionSelected() {
          this.buscar();
      },
      page() {
          this.buscar();
      }
  },
  methods: {
      buscar() {
          if (Object.keys(this.repoSelected).length > 0 && Object.keys(this.actionSelected).length > 0)   {
            axios
              .get(`https://api.github.com/repos/culturagovbr/${this.repoSelected.name}/${this.actionSelected.url}?page=${this.page}`)
              .then(response => (this.desserts = response.data))
          }
      }
  }
}
</script>
