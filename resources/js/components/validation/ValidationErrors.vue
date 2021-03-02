<template>
    <div class="alert alert-danger">
            <ul>
                <li v-for="value in errors" :key="value">{{value}}</li>
            </ul>
    </div>
</template>
<script>
export default {
    props: ['errors'],
}
</script>