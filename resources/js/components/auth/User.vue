<template>
  <user-form :count=10 @setName="setName" :name="name"></user-form>
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