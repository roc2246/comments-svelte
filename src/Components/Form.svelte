<script>
  import {
    comments,
    commentsStore,
    getComments,
    currentUser,
    userStore,
    getUser,
  } from "../js/comments-store";

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
  const timeAgo = new TimeAgo("en-US");

  // Creates new id for comment or reply
  const generateID = () => {
    let id = $commentsStore.length + 1;
    for (let i = 0; i < $commentsStore.length; i++) {
      id = id + $commentsStore[i].replies.length;
    }
    return id;
  };

  // Creates New Comment
  const newComment = () => {
    if (commentText !== null) {
      const comment = {
        id: generateID(),
        content: commentText,
        createdAt: timeAgo.format(new Date()),
        score: 0,
        user: {
          image: {
            png: $currentUser[0].image.png,
            webp: $currentUser[0].image.webp,
          },
          username: $currentUser[0].username,
        },
        replies: [],
      };
      fetch("/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      $commentsStore = [...$commentsStore, comment];
    } else {
      alert("Please Fill Out Text");
    }
  };

  // Creates new reply
  const newReply = (id, username) => {
    if (replyText !== null) {
      const reply = {
        id: generateID(),
        content: replyText,
        createdAt: timeAgo.format(new Date()),
        score: 0,
        replyingTo: username,
        user: {
          image: {
            png: $currentUser[0].image.png,
            webp: $currentUser[0].image.webp,
          },
          username: $currentUser[0].username,
        },
      };
      fetch(`/comments/${id}/reply`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      });

      const localIndex = $commentsStore.findIndex(
        (comment) => comment.id === id
      );
      $commentsStore[localIndex].replies = [
        ...$commentsStore[localIndex].replies,
        reply,
      ];
    } else {
      alert("Please Fill Out Text");
    }
  };

  // Updates comment
  const updateComment = (id) => {
    if (content.length !== 0) {
      const update = {
        content: content,
      };
      fetch(`/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      const localIndex = $commentsStore.findIndex(
        (comment) => comment.id === id
      );
      $commentsStore[localIndex].content = content;
    } else {
      alert("Please Fill Out Text");
    }
  };

  // Updates reply
  const updateReply = (id) => {
    if (editReplyTxt.length !== 0) {
      const update = {
        content: editReplyTxt,
      };
      fetch(`/comments/reply/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      for (let x in $commentsStore) {
        for (let y in $commentsStore[x].replies) {
          if ($commentsStore[x].replies[y].id === id) {
            $commentsStore[x].replies[y].content = editReplyTxt;
          }
        }
      }
    } else {
      alert("Please Fill Out Text");
    }
  };

  // Deletes Comment or Reply
  const deleteData = (id, context) => {
    if (context === "comment") {
      fetch(`/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json;",
        },
      });
      const results = $commentsStore.filter((comment) => comment.id !== id);
      $commentsStore = results;
    } else {
      fetch(`/comments/reply/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json;",
        },
      });

      for (let x in $commentsStore) {
        for (let y in $commentsStore[x].replies) {
          if ($commentsStore[x].replies[y].id === id) {
            const results = $commentsStore[x].replies.filter(
              (reply) => reply.id !== id
            );
            $commentsStore[x].replies = results;
            return;
          }
        }
      }
    }
  };

  // Updates score
  const updateScore = (id, mode) => {
    let update;
    let newScore;

    if (mode === "upvote") {
      newScore = score + 1;
      update = {
        score: newScore,
      };
      if (newScore === update.score) {
        newScore = score++;
      }
    } else if (mode === "downvote") {
      newScore = score - 1;

      update = {
        score: newScore,
      };
      if (newScore === update.score) {
        newScore = score--;
      }
    }

    fetch(`/comments/score/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
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
        on:click={() => newReply(id, username)}
        on:click>Submit</button
      >
    {:else}
      <button
        class="btn--submit"
        type="button"
        on:click={() => newReply(id, username)}>Submit</button
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
      on:click={() => newComment(commentText)}
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
          on:click={() => updateReply(id)}
          on:click>Submit</button
        >
      {:else}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateReply(id)}>Submit</button
        >
      {/if}
    {:else}
      <textarea cols="30" rows="3" bind:value={content} />
      <!-- Checks if edit comment content is empty -->
      {#if content.length !== 0}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateComment(id)}
          on:click>Submit</button
        >
      {:else}
        <button
          class="btn--submit"
          type="button"
          on:click={() => updateComment(id)}>Submit</button
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
        updateScore(id, "upvote");
      }}
    >
      <img src="images/icon-plus.svg" alt="upvote" />
    </div>
    <p class="comment__vote--score">{score}</p>
    <div
      class="comment__vote--downvote"
      on:click={() => {
        updateScore(id, "downvote");
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
