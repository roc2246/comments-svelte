<script>
import CommentBox from "./Comments/CommentBox.svelte";
import Form from "./Components/Form.svelte";

</script>

<main>
	<CommentBox/>
	<Form className="new-comment" formMode="new-comment"/>
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