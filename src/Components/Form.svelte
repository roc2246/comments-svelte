<script>
  import { currentUser, comments } from "../comments-store";
  export let formMode;
  export let id = null;
  export let content = null;
  export let replyTo = null;
  export let username = null;

  let editReplyTxt = "@" +replyTo + " " + content

  let replyText = "Add a reply...";
  let commentText = "Add a comment...";

  const addData = (text, commentID, username) => {
    const generateID = () => {
      let id = $comments.length + 1;
      for (let i = 0; i < $comments.length; i++) {
        id = id + $comments[i].replies.length;
      }
      return id;
    };
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
        username = null;
        newData.replies = [];
        comment = [...comment, newData];
      }

      if (text === replyText) {
        newData.replyingTo = username;
        comment[commentID - 1].replies = [
          ...comment[commentID - 1].replies,
          newData,
        ];
      }

      return [...comment];
    });
  };

  const updateData = (id, text) => {
   
      $comments[id - 1].content = text
      console.log($comments[id - 1].content)
      return [...$comments];

}
$: console.log(replyText)
</script>

<form on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
  {/if}
  {#if formMode === "new-reply"}
    <textarea name="" id="" cols="30" rows="10" bind:value={replyText} />
    <button
      on:click={() =>
        addData(
          replyText,
          Object.values({ id })[0],
          Object.values({ username })[0]
        )}>Submit</button
    >
  {:else if formMode === "new-comment"}
    <textarea name="" id="" cols="30" rows="10" bind:value={commentText} />
    <button on:click={() => addData(commentText)}>Submit</button>
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea name="" id="" cols="30" rows="10" bind:value={editReplyTxt} />
      <button on:click={() => updateData(Object.values({ id })[0], Object.values({ editReplyTxt })[0])}>Submit</button>
    {:else}
      <textarea name="" id="" cols="30" rows="10" bind:value={content} />
      <button on:click={() => updateData()}>Submit</button>
    {/if}
  {/if}
</form>
