<template>
  <h1>user</h1>
</template>
<script>
import UserForm from '../form/UserForm';
export default {
    components: {
      UserForm
    },
    data() {
      return {
          name: '',
          email: '',
          select: null,
          items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
          ],
          checkbox: false,
      }
    },
    methods: {
      setName(name){
        this.name = name;
      },
      setEmail(email){
        this.email = email;
      },
    }
  }
</script>