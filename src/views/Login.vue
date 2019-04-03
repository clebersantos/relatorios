<template>
    <v-container>
        Login
        <v-text-field
            label="Usuario"
            v-model="usuario"
            :rules="nameRules"
            :counter="10"
            required
            ></v-text-field>
        <v-text-field
            label="Senha"
            v-model="senha"
            :rules="senhaRules"
            required
            ></v-text-field>
        <v-btn
            :disabled="!valid"
            @click="submit"
            >
           entrar
        </v-btn>
    </v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  components: {
    HelloWorld
  },
  data() {
      return {
          valid: true,
          nameRules: [ v => !! v || 'Não pode ser vazio!'],
          senhaRules: [v => !! v || 'Senha não pode ser vazia!'],
          usuario: null,
          senha: null
      }
  },
  methods: {
    submit() {
        console.log('enviado!')
    }
  }
}
</script>
