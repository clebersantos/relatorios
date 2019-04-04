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
        <v-flex xs12 sm6 d-flex>
          <v-select
                  v-model="releaseSelected"
                  :hint="`${releaseSelected.start_date}/${releaseSelected.desired_end_date} <br><br> ${releaseSelected.description}`"
                  :items="releases"
                  item-text="title"
                  item-value="release_id"
                  label="Release Report"
                  outline
                  persistent-hint
                  return-object
                  single-line
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    {{issues}}
    <v-data-table
            :headers="headers"
            :items="issues"
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

    const instanceZenHub = axios.create({
        baseURL: 'https://api.zenhub.io',
        timeout: 1000,
        headers: {'X-Authentication-Token': 'PREENCHER COM O TOKEN DO ZENHUB'}
    });

    const instanceGitHub = axios.create({
        baseURL: 'https://api.github.com',
        timeout: 1000,
    });

    export default {
        name: 'ReleaseReport',
        mounted() {
            instanceGitHub
                .get('/users/culturagovbr/repos?sort=updated')
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
                issues: [],
                repos: [],
                releases: [],
                repoSelected: {},
                releaseSelected: {},
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
                // this.buscar();
                this.buscarRelease();
            },
            releaseSelected() {
                // this.buscar();
                this.buscarIssuesRelease();
            },
            page() {
                this.buscar();
            }
        },
        methods: {
            buscar() {
                if (Object.keys(this.repoSelected).length > 0)   {
                    instanceGitHub
                        .get(`/repos/culturagovbr/${this.repoSelected.name}/releases?page=${this.page}`)
                        .then(response => (this.desserts = response.data))
                }
            },
            buscarRelease() {
                if (Object.keys(this.repoSelected).length > 0)   {
                    instanceZenHub
                        .get(`/p1/repositories/${this.repoSelected.id}/reports/releases`)
                        .then(response => (this.releases = response.data))
                }
            },
            buscarIssuesRelease() {
                if (Object.keys(this.releaseSelected).length > 0)   {
                    instanceZenHub
                        .get(`/p1/reports/release/${this.releaseSelected.release_id}/issues`)
                        .then(response => (this.issues = response.data))
                }
            }
        }
    }
</script>