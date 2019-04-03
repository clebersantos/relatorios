<template>
    <v-hover
        open-delay="250"
    >
        <v-navigation-drawer
            app
            clipped
            fixed
            hide-overlay
            v-model="drawerLeft"
            left
            :mini-variant="mini && !hover"
            slot-scope="{ hover }"
        >
            <v-list class="" dense two-line color="primary">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-icon class="green lighten-1 white--text">{{ infos.icone_ativo }}</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>abc</v-list-tile-title>
                        <v-list-tile-sub-title>efg hijklmnop</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                            icon
                            ripple
                            @click.stop="mini = !mini"
                        >
                            <v-icon color="grey lighten-1" v-if="mini">lock_open</v-icon>
                            <v-icon color="grey lighten-1" v-else>lock</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-list class="my-0" dense >
                <template v-for="(item) in items">
                    <v-list-group
                        v-if="item.children"
                        :prepend-icon="item.icon"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-title><span v-html="item.text"></span></v-list-tile-title>
                        </v-list-tile>

                        <template v-for="(subMenu) in item.children">
                            <v-list-group
                                v-if="subMenu.children"
                                no-action
                                sub-group
                            >
                                <v-list-tile slot="activator">
                                    <v-list-tile-title>{{subMenu.text}}</v-list-tile-title>
                                </v-list-tile>

                                <v-list-tile
                                    v-for="(subitem, i) in subMenu.children"
                                    :key="i"
                                    :to="subitem.route"
                                >
                                    <v-list-tile-title v-text="subitem.text"></v-list-tile-title>
                                    <v-list-tile-action if="subitem.icon">
                                        <v-icon v-if="subitem.icon" v-text="subitem.icon"></v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-group>
                            <v-list-tile v-else :href="subMenu.route">
                                <span v-html="subMenu.text"></span>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                    <v-list-tile v-else-if="item.route" :to="item.route">
                        <v-list-tile-action v-if="item.icon">
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title><span v-html="item.text"></span></v-list-tile-title>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
    </v-hover>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'Sidebar',
        data() {
            return {
                drawerLeft: true,
                mini: true,
                infos: {},
                items: [
                    { icon: 'dashboard', text: 'Dashboard', route: 'dashboard' },
                    { icon: 'loyalty', text: 'Release', route: 'release'},
                    // { icon: 'content_copy', text: 'Duplicates' },
                    // {
                    //     icon: 'keyboard_arrow_up',
                    //     'icon-alt': 'keyboard_arrow_down',
                    //     text: 'Labels',
                    //     model: true,
                    //     children: [
                    //         { icon: 'add', text: 'Create label' }
                    //     ]
                    // },
                    // {
                    //     icon: 'keyboard_arrow_up',
                    //     'icon-alt': 'keyboard_arrow_down',
                    //     text: 'More',
                    //     model: false,
                    //     children: [
                    //         { text: 'Import' },
                    //         { text: 'Export' },
                    //         { text: 'Print' },
                    //         { text: 'Undo changes' },
                    //         { text: 'Other contacts' }
                    //     ]
                    // },
                    // { icon: 'settings', text: 'Settings' },
                    // { icon: 'chat_bubble', text: 'Send feedback' },
                    // { icon: 'help', text: 'Help' },
                    // { icon: 'phonelink', text: 'App downloads' },
                    // { icon: 'keyboard', text: 'Go to the old version' }
                ]
            };
        },
        watch: {
            drawerLeft(value) {
            },
        },
    };
</script>

<style>
    .v-navigation-drawer--mini-variant .v-list__group__items {
        display: none !important;
    }
</style>
