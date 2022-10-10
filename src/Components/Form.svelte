<script>
  import {
    comments,
    commentsStore,
    getComments,
    currentUser,
    userStore,
    getUser,
  } from "../js/comments-store";
  import { onMount } from "svelte";

  import TimeAgo from "javascript-time-ago";
  import en from "javascript-time-ago/locale/en";
  TimeAgo.addLocale(en);

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
    let id = $commentsStore.length + 1;
    for (let i = 0; i < $commentsStore.length; i++) {
      id = id + $commentsStore[i].replies.length;
    }
    return id;
  };

  // Adds Comment or Reply
  const addData = async (text, commentID, username) => {
    const timeAgo = new TimeAgo("en-US");
    let response = await fetch("/newComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: generateID(),
        newcomment: text,
        createdAt: timeAgo.format(new Date()),
        score: 0,
        user: {
          image: {
            png: $currentUser[0].image.png,
            webp: $currentUser[0].image.webp,
          },
          username: $currentUser[0].username,
        },
      }),
    });

    const json = await response.json();

    if (text === null) {
      alert("Please enter text.");
    }

    if (text === commentText && text !== null) {
      commentID = null;
      username = null;
      json.replies = [];
      console.log("COMMENT")
    }

    if (text === replyText && text !== null) {
      json.replyingTo = username;
      $commentsStore[commentID - 1].replies = [
        ...$commentsStore[commentID - 1].replies,
        json,
      ];
      console.log("REPLY")
    }

    console.log(json);
    $commentsStore = [...$commentsStore, json];
  };

  // Updates Comment or Reply
  const updateData = (id, text) => {
    if (text.length === 0) {
      alert("Please enter text.");
    }

    if (text === content && text.length !== 0) {
      let index = $comments.findIndex((comment) => comment.id === id);
      $comments[index].content = text;
    } else if (text === editReplyTxt && text.length !== 0) {
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
    const deleteModal = document.getElementsByClassName("delete")[0];
    deleteModal.style.display = "none";
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
  <!-- Checks for new reply form -->
  {#if formMode === "new-reply"}
    <textarea
      class="new-reply__content"
      cols="30"
      rows="3"
      placeholder="  Add a reply..."
      bind:value={replyText}
    />
    <!-- Checks if new reply form is empty -->
    {#if replyText !== null}
      <button
        class="btn--submit"
        type="button"
        on:click={() => addData(replyText, id, username)}
        on:click>Submit</button
      >
    {:else}
      <button
        class="btn--submit"
        type="button"
        on:click={() => addData(replyText, id, username)}>Submit</button
      >
    {/if}
    <!-- Checks for new comment form -->
  {:else if formMode === "new-comment"}
    <textarea
      class="new-comment__content"
      name="newcomment"
      cols="30"
      rows="3"
      placeholder="  Add a comment..."
      bind:value={commentText}
    />
    <button
      class="btn--submit"
      type="button"
      on:click={() => addData(commentText)}
      on:click={() => (commentText = null)}>Submit</button
    >
    <!-- Checks for edit content form -->
  {:else if formMode === "edit-content"}
    {#if replyTo !== null}
      <textarea
        class="comment__edit-content--content"
        cols="30"
        rows="3"
        bind:value={editReplyTxt}
      />
      <!-- Checks if edit reply content form is empty -->
      {#if editReplyTxt.length !== 0}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateData(id, editReplyTxt)}
          on:click>Submit</button
        >
      {:else}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateData(id, editReplyTxt)}>Submit</button
        >
      {/if}
    {:else}
      <textarea cols="30" rows="3" bind:value={content} />
      <!-- Checks if edit comment content is empty -->
      {#if content.length !== 0}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateData(id, content)}
          on:click>Submit</button
        >
      {:else}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateData(id, content)}>Submit</button
        >
      {/if}
    {/if}
  {/if}
</form>

<!-- Delete -->
{#if formMode === "delete"}
  <section class="delete">
    <div class="delete__content">
      <form action="" on:submit|preventDefault>
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div class="delete__content--btns">
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

<style lang="scss">
  @import "../global";
  /* Textarea */
  textarea {
    border-radius: 0.5rem;
    &:focus {
      outline: none !important;
      border-color: $purple;
    }
  }

  /* Delete Modal - Desktop*/
  .delete {
    @include delete("desktop");
  }

  /* New Comments and New Replies - Desktop */
  .new-comment,
  .new-reply {
    @include formUI("desktop");
  }

  .comment {
    /* Vote Form - Desktop */
    &__vote {
      @include vote("desktop");
    }
    /* Edit Content - Desktop*/
    &__edit-content {
      display: flex;
      flex-direction: column;
      margin: 0;
      grid-column: 2 / span 5;
      &--content {
        overflow: hidden;
        resize: none;
      }
      & > button {
        margin-left: auto;
      }
    }
  }

  /* Images - Desktop */
  .img {
    &--user {
      & > img {
        max-width: 2rem;
        max-height: 2rem;
      }
    }
  }

  /* Buttons - Desktop */
  button {
    cursor: pointer;
  }

  .btn {
    &--submit {
      @include button("submit");
    }
    &--delete {
      @include button("delete");
    }
    &--close {
      @include button("close");
    }
  }

  @media (max-width: $mobile) {
    /* Delete Modal - Mobile */
    .delete {
      @include delete("mobile");
    }

    /* New Comments and New Replies - Mobile */
    .new-comment,
    .new-reply {
      @include formUI("mobile");
    }

    .comment {
      /* Vote Form - Mobile */
      &__vote {
        @include vote("mobile");
      }
      /* Edit Content - Mobile */
      &__edit-content {
        grid-column: 1 / span 5;
      }
    }

    /* Images - Mobile */
    .img {
      &--user {
        & > img {
          margin-top: 1.25rem;
          grid-row: 2;
          grid-column: 1;
        }
      }
    }

    /* Buttons - Mobile */
    .btn {
      &--submit {
        margin-top: 1rem;
        grid-row: 2;
        grid-column: 5;
      }
    }
  }
</style>
