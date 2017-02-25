<template lang="jade">
  .row
    .col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1
      p
        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!
</template>

<script lang="babel">

export default {
	store: ['message', 'currentUser', 'currentModal'],

  // beforeCreate and create are both run on the server before the html is sent. The api library used, "axios", is isomorphic so it works both on client and server
  beforeCreate: async function() {

	},
  metaInfo: {
    title: 'Home',
  }
}
</script>

<style lang="stylus">

</style>
