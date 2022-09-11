<script>
  import { currentUser, comments } from "../comments-store";
  export let formMode;
  export let id = null;
  export let content = null;
  export let replyTo = null;

  let replyText = "Add a reply...";
  let commentText = "Add a comment...";

  const addData = (text, commentID) => {
    const generateID = () => {
          let id = $comments.length + 1;
          for(let i = 0; i<$comments.length; i++){
            id = id + $comments[i].replies.length
          }
          return id;
        }
    comments.update((comment) => {
      const newData = {
        id: generateID(),
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
      };

      if (text === commentText) {
        commentID = null;
        newData.replies = [];
        comment = [...comment, newData];
      }

      if (text === replyText) {
        console.log(Object.values(comment).includes(1))
        newData.replyingTo = comment[commentID - 1].user.username;
        comment[commentID - 1].replies = [
          ...comment[commentID - 1].replies,
          newData,
        ];
      }

      console.log(newData)
      return [...comment];
    });
  };
</script>

<form on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
  {/if}
  {#if formMode === "new-reply"}
    <textarea name="" id="" cols="30" rows="10" bind:value={replyText} />
  {:else if formMode === "new-comment"}
    <textarea name="" id="" cols="30" rows="10" bind:value={commentText} />
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
  {#if formMode === "new-comment"}
    <button on:click={() => addData(commentText)}>Submit</button>
  {:else if (formMode = "new-reply")}
    <button on:click={() => addData(replyText, Object.values({ id })[0])}
      >Submit</button
    >
  {/if}
</form>
