<script>
  import { currentUser, comments } from "../comments-store";

  export let className = null;
  export let context = null;
  export let formMode;
  export let id = null;
  export let content = null;
  export let replyTo = null;
  export let username = null;
  export let score = null;

  let editReplyTxt = "@" + replyTo + " " + content;

  let replyText = null;
  let commentText = null;

  //CRUD Library

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

  // Retrieves comment index
  const getCommentIndex = () => {
    let replyIndex = getReplyIndex();
    let commentIndex = $comments.findIndex(
      (comment) =>
        comment.replies.length !== 0 && comment.replies[replyIndex].id === id
    );
    return commentIndex;
  };

  // Creates new id for comment or reply
  const generateID = () => {
    let id = $comments.length + 1;
    for (let i = 0; i < $comments.length; i++) {
      id = id + $comments[i].replies.length;
    }
    return id;
  };

  const addData = (text, commentID, username) => {
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
      let replyIndex = getReplyIndex();
      let commentIndex = getCommentIndex();

      $comments[commentIndex].replies[replyIndex].content = text;
    }
    return [...$comments];
  };

  const deleteData = (id, context) => {
    if (context === "comment") {
      const results = $comments.filter((comment) => comment.id !== id);
      $comments = results;
    } else {
      let commentIndex = getCommentIndex();
      const replyResults = $comments[commentIndex].replies.filter(
        (reply) => reply.id !== id
      );
      console.log(replyResults);
      $comments[commentIndex].replies = replyResults;
    }
    return [...$comments];
  };


  const hideModal = () => {
    document.getElementById("delete").style.display="none"
  }

</script>

<!-- Comments and Replies -->
<form class={className} on:submit|preventDefault>
  {#if formMode === "new-reply" || formMode === "new-comment"}
    <div class="img--user">
      <img src={$currentUser[0].image.png} alt={$currentUser[0].username} />
    </div>
  {/if}
  {#if formMode === "new-reply"}
    <textarea
      class="new-content"
      cols="30"
      rows="3"
      placeholder="Add a reply..."
      bind:value={replyText}
    />
    <button
      class="btn--submit"
      on:click={() => addData(replyText, id, username)}>Submit</button
    >
  {:else if formMode === "new-comment"}
    <textarea
      class="new-content"
      cols="30"
      rows="3"
      placeholder="Add a comment..."
      bind:value={commentText}
    />
    <button class="btn--submit" on:click={() => addData(commentText)}
      >Submit</button
    >
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea
        class="updated-content"
        cols="30"
        rows="3"
        bind:value={editReplyTxt}
      />
      <button class="btn--submit" on:click={() => updateData(id, editReplyTxt)}
        >Submit</button
      >
    {:else}
      <textarea name="" id="" cols="30" rows="3" bind:value={content} />
      <button class="btn--submit" on:click={() => updateData(id, content)}
        >Submit</button
      >
    {/if}
  {/if}
</form>

<!-- Delete -->
{#if formMode === "delete"}
  <section id="delete">
    <div id="delete-content">
      <form action="" on:submit|preventDefault>
        <h1>DELETE</h1>
        <button type="button" on:click={deleteData(id, context)}>YES</button>
        <button type="button" on:click={()=>{hideModal()}}>NO</button>
      </form>
    </div>
  </section>
{/if}

<!-- Votes -->
{#if formMode === "vote"}
  <form on:submit|preventDefault class="comment__vote">
    <div
      class="comment__vote--upvote"
      on:click={() => {
        score++;
      }}
    >
      <img src="images/icon-plus.svg" alt="upvote" />
    </div>
    <span class="comment__vote--score">{score}</span>
    <div
      class="comment__vote--downvote"
      on:click={() => {
        score--;
      }}
    >
      <img src="images/icon-minus.svg" alt="downvote" />
    </div>
  </form>
{/if}

<style>
  #delete {
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  #delete-content{
    background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  }

  .new-comment,
  .comment__add-reply {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1rem;
  }

  .comment__edit-content {
    display: flex;
    flex-direction: column;
    margin: 0;
    grid-column: 2 / span 4;
  }

  .comment__edit-content > button {
    margin-left: auto;
  }

  .updated-content {
    resize: none;
  }

  .comment__vote {
    grid-column: 1;
    grid-row: 1/3;

    padding: 1rem;

    height: 4rem;
    width: 0.75rem;

    display: flex;
    flex-direction: column;

    background-color: hsl(223, 19%, 93%);
    border-radius: 0.5rem;
  }

  .comment__vote--score {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
  }

  .new-content {
    resize: none;
    width: 75%;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

  .img--user > img {
    max-width: 2rem;
    max-height: 2rem;
  }

  .btn--submit {
    border-radius: 0.5rem;
    background-color: hsl(238, 40%, 52%);
    color: white;
    font-weight: 700;
    height: 3rem;
    width: 6rem;
  }
  @media (max-width: 375px) {
    .new-comment,
    .comment__add-reply {
      display: grid;
      grid-template-columns: 2rem auto 4rem;
    }
    .new-content {
      width: 100%;
      margin-left: 0;
      margin-right: 0;

      grid-row: 1;
      grid-column: 1/6;
    }

    .img--user > img {
      margin-top: 1.25rem;
      grid-row: 2;
      grid-column: 1;
    }

    .btn--submit {
      margin-top: 1rem;
      grid-row: 2;
      grid-column: 5;
    }

    .comment__vote {
      display: flex;
      flex-direction: row;

      grid-column: 1;
      grid-row: 3;

      padding: 1rem;

      height: 0.75rem;
      width: 4rem;
    }
  }
</style>
