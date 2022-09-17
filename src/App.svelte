<script>
import CommentBox from "./Comments/CommentBox.svelte";
import Form from "./Components/Form.svelte";
</script>

<main>
	<CommentBox/>
	<Form className="new-comment" formMode="new-comment"/>
</main>

<style>
main{
	width: max(20rem, 40%);
    margin-left: auto;
    margin-right: auto;
}
</style>