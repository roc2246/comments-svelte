<script>
  import { currentUser, comments } from "../comments-store";
  export let formMode;
  export let content = null;
  export let replyTo = null;

  let replyText =  "Add a reply..." 
  let commentText =  "Add a comment..." 

  const addData = (text) => {
    comments.update((comment) => {
      const newData = {
        id: comment.length + 1,
        content: text,
        createdAt: "DATE",
        score: 0,
        user: {
          image: {
            png: $currentUser[0].image.png,
            webp: $currentUser[0].image.webp,
          },
          username: $currentUser[0].username,
        },
        replies: []
      };

      comment = [...comment, newData]
    return [...comment]
    });
  };
  $: console.log(commentText)
</script>

<form on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
  {/if}
  {#if formMode === "new-reply"}
    <textarea name="" id="" cols="30" rows="10" bind:value={replyText}></textarea>
  {:else if formMode === "new-comment"}
    <textarea name="" id="" cols="30" rows="10" bind:value={commentText}></textarea>
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea name="" id="" cols="30" rows="10">
        @{replyTo}
        {content}
      </textarea>
    {:else}
      <textarea name="" id="" cols="30" rows="10">
        {content}
      </textarea>
    {/if}
  {/if}
  <button on:click={()=> addData(commentText)}>Submit</button>
</form>
