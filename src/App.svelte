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
	width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>