<script>
  import { currentUser, comments } from "../comments-store";
  export let formMode;
  export let id = null;
  export let content = null;
  export let replyTo = null;
  export let username = null;

  let editReplyTxt = "@" + replyTo + " " + content;

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
    if (text === content) {
      let index = $comments.findIndex((comment) => comment.id === id);
      $comments[index].content = text;
      console.log(index);
    } else if (text === editReplyTxt) {
      //Retrieves reply index
      const getReplyIndex = () => {
        for (let comment of $comments) {
          for (let reply of comment.replies) {
            if (reply.id === id) {
              let replyIndex = comment.replies.findIndex(
                (reply) => reply.id === id
              );
              return replyIndex;
            }
          }
        }
      };
      let replyIndex = getReplyIndex();

      let commentIndex = $comments.findIndex(
        (comment) =>
          comment.replies.length !== 0 && comment.replies[replyIndex].id === id
      );

      $comments[commentIndex].replies[replyIndex].content = text
    }
    return [...$comments];
  };
</script>

<form on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
  {/if}
  {#if formMode === "new-reply"}
    <textarea name="" id="" cols="30" rows="10" bind:value={replyText} />
    <button on:click={() => addData(replyText, id, username)}>Submit</button>
  {:else if formMode === "new-comment"}
    <textarea name="" id="" cols="30" rows="10" bind:value={commentText} />
    <button on:click={() => addData(commentText)}>Submit</button>
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea name="" id="" cols="30" rows="10" bind:value={editReplyTxt} />
      <button on:click={() => updateData(id, editReplyTxt)}>Submit</button>
    {:else}
      <textarea name="" id="" cols="30" rows="10" bind:value={content} />
      <button on:click={() => updateData(id, content)}>Submit</button>
    {/if}
  {/if}
</form>
