<script>
import CommentBox from "./Comments/CommentBox.svelte";
import Form from "./Components/Form.svelte";
</script>

<main>
	<CommentBox/>
	<Form className="new-comment" formMode="new-comment" />
</main>

<style>
main{
	max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
}

@media(max-width: 375px){
	main{
		width: 20rem;
	}
}
</style>