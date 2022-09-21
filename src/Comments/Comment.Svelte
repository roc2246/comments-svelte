<script>
  import Form from "../Components/Form.svelte";

  export let commentOrReply;

  export let commentID = null;
  export let replyID = null;
  export let score;
  export let username;
  export let userImage;
  export let createdAt;
  export let content;
  export let replyTo = null;
  export let isCurrentUser;

  // Stpres Toggle Values
  let showReplyForm = false;
  let showEditForm = false;
  let showDeleteForm = false;
</script>

<div class={commentOrReply}>
  <Form className="comment__vote" formMode="vote" {score} />
  <div class="comment__top-row">
    <div class="comment__user-image">
      <img src={userImage} alt={username} />
    </div>
    <div class="comment__username">
      <span class="comment__username--name">{username}</span>
      {#if isCurrentUser === true}
        <span class="comment__username--you-icon">you</span>
      {/if}
    </div>
    <span class="comment__post-date">{createdAt}</span>
  </div>
  <div class="comment__CRUD">
    {#if isCurrentUser === true}
      <div
        class="comment__CRUD--edit"
        on:click={() =>
          !showEditForm ? (showEditForm = true) : (showEditForm = false)}
      >
        <div class="comment__CRUD--img">
          <img src="images/icon-edit.svg" alt="edit" />
        </div>
        <span class="comment__CRUD--text">Edit</span>
      </div>
      <div
        class="comment__CRUD--delete"
        on:click={() =>
          !showDeleteForm ? (showDeleteForm = true) : (showDeleteForm = false)}
      >
        <div class="comment__CRUD--img">
          <img src="images/icon-delete.svg" alt="delete" />
        </div>
        <span class="comment__CRUD--text">Delete</span>
      </div>
    {:else}
      <div
        class="comment__CRUD--reply"
        on:click={() =>
          !showReplyForm ? (showReplyForm = true) : (showReplyForm = false)}
      >
        <div class="comment__CRUD--img">
          <img src="images/icon-reply.svg" alt="reply" />
        </div>
        <span class="comment__CRUD--text">Reply</span>
      </div>
    {/if}
  </div>
  {#if showEditForm}
    <Form
      className="comment__edit-content"
      formMode="edit-content"
      {replyTo}
      {content}
      id={replyTo !== null ? replyID : commentID}
    />
  {:else}
    <p class="comment__content">
      {#if replyTo !== null}
        <span class="reply-to">@{replyTo}</span>
      {/if}
      {content}
    </p>
  {/if}
</div>
{#if showReplyForm}
  <Form
    className="comment__add-reply"
    formMode="new-reply"
    id={commentID}
    {username}
  />
{/if}
{#if showDeleteForm}
  <Form
    formMode="delete"
    context={commentOrReply === "comment" ? "comment" : "comment reply"}
    id={commentOrReply === "comment" ? commentID : replyID}
  />
{/if}

<style>
  .comment {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(1rem, auto));
    grid-auto-rows: minmax(1rem, auto);

    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1rem;
  }
  .comment__top-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-column: 2 / span 3;
    grid-row: 1;
  }

  .comment__user-image > img {
    max-width: 2rem;
    max-height: 2rem;
  }

  .comment__post-date,
  .comment__username {
    margin-left: 1rem;
    line-height: 2rem;
  }

  .comment__username--you-icon {
    border-radius: 0.25rem;
    padding: 0.25rem;
    background-color: hsl(238, 40%, 52%);
    color: white;
    margin-bottom: 0.25rem;
  }

  .comment__CRUD {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-left: auto;
    grid-column: 5 / span 2;
    grid-row: 1;
  }

  .comment__CRUD--text {
    margin-left: 0.25rem;
  }

  .comment__CRUD--reply,
  .comment__CRUD--edit,
  .comment__CRUD--delete {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    flex-wrap: nowrap;
  }

  .comment__CRUD--reply > .comment__CRUD--text {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
  }

  .comment__CRUD--reply > .comment__CRUD--text:hover {
    color: hsl(239, 57%, 85%);
  }

  .comment__CRUD--edit > .comment__CRUD--text {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
  }

  .comment__CRUD--edit > .comment__CRUD--text:hover {
    color: hsl(239, 57%, 85%);
  }

  .comment__CRUD--delete > .comment__CRUD--text {
    color: hsl(358, 79%, 66%);
    font-weight: 700;
  }

  .comment__CRUD--delete > .comment__CRUD--text:hover {
    color: hsl(357, 100%, 86%);
  }

  .comment__CRUD--delete {
    margin-left: 1rem;
  }

  .comment__content {
    margin: 0;
    grid-column: 2 / span 4;
  }

  .comment__content {
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    word-wrap: break-word;
  }

  .reply-to {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
  }

  .comment__username--name,
  .comment__username--you-icon {
    font-weight: 700;
  }

  @media (max-width: 375px) {
    .comment__top-row {
      grid-column: 1/4;
      grid-row: 1;
      flex-wrap: nowrap;
    }
    .comment__post-date,
    .comment__username {
      margin-left: 0.75rem;
      white-space: nowrap;
    }
    .comment__content,
    .comment__edit-content {
      margin: 0;
      grid-row: 2;
      grid-column: 1/5;
    }
    .comment__CRUD {
      margin-top: 1rem;
      grid-column: 2/5;
      grid-row: 3;
    }

    .comment__CRUD--edit{
      margin-left: 4.25rem;
    }
  }
</style>
