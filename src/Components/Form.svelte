<script>
  import {currentUser} from "../comments-store";
  export let formMode;
  export let content = null
  export let replyTo = null
</script>

<form on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
  {/if}
  {#if formMode === "new-reply"}
    <textarea name="" id="" cols="30" rows="10"> Add a reply... </textarea>
  {:else if formMode === "new-comment"}
    <textarea name="" id="" cols="30" rows="10"> Add a comment... </textarea>
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
    <textarea name="" id="" cols="30" rows="10">
     @{replyTo} {content}
    </textarea>
    {:else}
    <textarea name="" id="" cols="30" rows="10">
      {content}
     </textarea>
    {/if}
  {/if}
  <button>Submit</button>
</form>
