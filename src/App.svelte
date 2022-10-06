<script>
import CommentBox from "./Comments/CommentBox.svelte";
import Form from "./Components/Form.svelte";

import { writable } from "svelte/store";
  import { onMount } from "svelte";
const userStore = writable(null)
async function getUser() {
	let response = await fetch('/user')
	return response.ok ? await response.json() : null;
}
onMount(async()=>{
	let user = await getUser()
	if(user) userStore.update(data => user);
})
</script>

<main>
	{#if $userStore}
	{$userStore.name}
	{/if}
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