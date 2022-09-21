<script>
  import { currentUser, comments } from "../comments-store";

  //For Most Or All Forms
  export let formMode;
  export let className = null;

  // Stores Content of Form or Reply
  export let content = null;
  export let replyTo = null;
  export let username = null;
  export let score = null;

  // Arguement for Delete Functions
  export let context = null;

  // Arguement for Update and Delete Functions
  export let id = null;

  // Bind Values
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

  // Adds Comment or Reply
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

  // Updates Comment or Reply
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

  // Deletes Comment or Reply
  const deleteData = (id, context) => {
    if (context === "comment") {
      const results = $comments.filter((comment) => comment.id !== id);
      $comments = results;
    } else {
      let commentIndex = getCommentIndex();
      const replyResults = $comments[commentIndex].replies.filter(
        (reply) => reply.id !== id
      );
      $comments[commentIndex].replies = replyResults;
    }
    return [...$comments];
  };

  // Hides Delete Modal
  const hideModal = () => {
    document.getElementById("delete").style.display = "none";
  };
</script>

<!-- FORMS -->

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
      placeholder="  Add a reply..."
      bind:value={replyText}
    />
    <button
      class="btn--submit"
      type="button"
      on:click={() => addData(replyText, id, username)}
      on:click>Submit</button
    >
  {:else if formMode === "new-comment"}
    <textarea
      class="new-content"
      cols="30"
      rows="3"
      placeholder="  Add a comment..."
      bind:value={commentText}
    />
    <button
      class="btn--submit"
      type="button"
      on:click={() => addData(commentText)}>Submit</button
    >
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea
        class="updated-content"
        cols="30"
        rows="3"
        bind:value={editReplyTxt}
      />
      <button
        class="btn--submit"
        type="button"
        on:click={() => updateData(id, editReplyTxt)} on:click>Submit</button
      >
    {:else}
      <textarea cols="30" rows="3" bind:value={content} />
      <button
        class="btn--submit"
        type="button"
        on:click={() => updateData(id, content)}>Submit</button
      >
    {/if}
  {/if}
</form>

<!-- Delete -->
{#if formMode === "delete"}
  <section id="delete">
    <div id="delete-content">
      <form action="" on:submit|preventDefault>
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div id="delete-content__btns">
          <button
            class="btn--close"
            type="button"
            on:click={() => {
              hideModal();
            }}>NO, CANCEL</button
          >
          <button
            class="btn--delete"
            type="button"
            on:click={deleteData(id, context)}>YES, DELETE</button
          >
        </div>
      </form>
    </div>
  </section>
{/if}

<!-- Votes -->
{#if formMode === "vote"}
  <form on:submit|preventDefault class={className}>
    <div
      class="comment__vote--upvote"
      on:click={() => {
        score++;
      }}
    >
      <img src="images/icon-plus.svg" alt="upvote" />
    </div>
    <p class="comment__vote--score">{score}</p>
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
  /* Delete Modal - Desktop*/
  #delete {
    position: fixed;
    z-index: 1;
    padding-top: 20rem;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  #delete-content {
    border-radius: 0.5rem;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 20rem;
  }

  #delete-content__btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* New Comments and New Replies - Desktop */
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

  .new-content {
    resize: none;
    width: 75%;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

  /* Edit Content - Desktop*/
  .comment__edit-content {
    display: flex;
    flex-direction: column;
    margin: 0;
    grid-column: 2 / span 5;
  }

  .comment__edit-content > button {
    margin-left: auto;
  }

  .updated-content {
    overflow: hidden;
    resize: none;
  }

  /* Vote Form - Desktop */
  .comment__vote {
    display: flex;
    flex-direction: column;
    justify-content: center;

    grid-column: 1;
    grid-row: 1/3;

    padding: 0.75rem;

    height: 4rem;
    width: 0.75rem;

    background-color: hsl(223, 19%, 93%);
    border-radius: 0.5rem;
  }

  .comment__vote > * {
    flex: 1;
  }

  .comment__vote--score {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
    margin-top: 0.5rem;
    margin-bottom: 0.05rem;
    text-align: center;
  }

  .comment__vote--upvote,
  .comment__vote--downvote {
    cursor: pointer;
  }

  /* Textarea */
  textarea {
    border-radius: 0.5rem;
  }

  textarea:focus {
    outline: none !important;
    border-color: hsl(238, 40%, 52%);
  }

  /* Images - Desktop */
  .img--user > img {
    max-width: 2rem;
    max-height: 2rem;
  }

  /* Buttons - Desktop */
  button {
    cursor: pointer;
  }

  .btn--submit {
    border-radius: 0.5rem;
    background-color: hsl(238, 40%, 52%);
    color: white;
    font-weight: 700;
    height: 3rem;
    width: auto;
  }

  .btn--submit:hover {
    background-color: hsl(239, 57%, 85%);
  }

  .btn--delete {
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: hsl(358, 79%, 66%);
    color: white;
    font-weight: 700;
    width: 48%;
    height: 3.25rem;
  }

  .btn--delete:hover {
    background-color: hsl(357, 100%, 86%);
  }

  .btn--close {
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: hsl(211, 10%, 45%);
    color: white;
    font-weight: 700;
    width: 48%;
    height: 3.25rem;
  }

  .btn--close:hover {
    background-color: hsl(223, 19%, 93%);
  }

  @media (max-width: 375px) {
    /* Delete Modal - Mobile */
    #delete {
      padding-top: 14rem;
    }

    #delete-content {
      width: 18rem;
    }

    /* New Comments and New Replies - Mobile */
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

    /* Edit Content - Mobile */
    .comment__edit-content {
      grid-column: 1 / span 5;
    }

    /* Vote Form - Mobile */
    .comment__vote {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      grid-column: 1;
      grid-row: 3;

      padding: 1rem 1rem 1.25rem 1rem;

      height: 0.75rem;
      width: 4rem;
    }

    .comment__vote--score {
      margin-top: 0;
      margin-bottom: 0;
    }

    .comment__vote--downvote > img {
      padding-bottom: 0.25rem;
      padding-left: 0.55rem;
    }

    /* Images - Mobile */
    .img--user > img {
      margin-top: 1.25rem;
      grid-row: 2;
      grid-column: 1;
    }

    /* Buttons - Mobile */
    .btn--submit {
      margin-top: 1rem;
      grid-row: 2;
      grid-column: 5;
    }
  }
</style>
