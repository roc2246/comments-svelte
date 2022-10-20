<script>
import CommentBox from "./Comments/CommentBox.svelte";

</script>

<main>
	<CommentBox/>
</main>

<style lang="scss">
  @import "./global";

main{
	max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
}

@media(max-width: $mobile){
	main{
		width: 20rem;
	}
}
</style>