<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
                  v-model="repoSelected"
                  :hint="`${repoSelected.full_name} <br><br> ${repoSelected.description}`"
                  :items="repos"
                  item-text="name"
                  item-value="full_name"
                  label="Repositório"
                  outline
                  persistent-hint
                  return-object
                  single-line
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            :rows-per-page-items="[-1]"
            disable-initial-sort
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <!--<td class="text-xs-left">{{ props.item.created_at }}</td>-->
        <td class="text-xs-justify">{{ props.item.body }}</td>
      </template>
    </v-data-table>

    <div class="text-xs-center">
      <div class="mt-2">
        Páginação da API
      </div>
      <v-container>
        <v-layout justify-center>
          <v-flex xs8>
            <v-card>
              <v-card-text>
                <v-pagination
                        v-model="page"
                        :length="paginationLength"
                ></v-pagination>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>


<script>
    import axios from 'axios';

    export default {
        name: 'App',
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
            page() {
                this.buscar();
            }
        },
        methods: {
            buscar() {
                if (Object.keys(this.repoSelected).length > 0)   {
                    axios
                        .get(`https://api.github.com/repos/culturagovbr/${this.repoSelected.name}/releases?page=${this.page}`)
                        .then(response => (this.desserts = response.data))
                }
            }
        }
    }
</script>