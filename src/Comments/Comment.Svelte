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

  let showReplyForm = false;
  let showEditForm = false;
  let showDeleteForm = false;
</script>

<div class={commentOrReply}>
  <Form formMode="vote" {score} />

  <div class="comment_user-image">
    <img src={userImage} alt={username} />
  </div>

  <span class="comment__username">{username}</span>

  {#if isCurrentUser === true}
    <span class="comment__you--icon">YOU</span>
  {/if}

  <span class="comment__post-date">{createdAt}</span>

  <div class="comment_CRUD">
    {#if isCurrentUser === true}
      <div
        class="comment__CRUD--edit"
        on:click={() =>
          !showEditForm ? (showEditForm = true) : (showEditForm = false)}
      >
        <img src="images/icon-edit.svg" alt="edit" /> Edit
      </div>

      <div
        class="comment__CRUD--delete"
        on:click={() =>
          !showDeleteForm ? (showDeleteForm = true) : (showDeleteForm = false)}
      >
        <img src="images/icon-delete.svg" alt="delete" /> Delete
      </div>
    {:else}
      <div
        class="comment__CRUD--reply"
        on:click={() =>
          !showReplyForm ? (showReplyForm = true) : (showReplyForm = false)}
      >
        <img src="images/icon-reply.svg" alt="reply" /> Reply
      </div>
    {/if}
  </div>

  {#if showEditForm}
    <Form
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
  <Form formMode="new-reply" id={commentID} {username} />
{/if}
{#if showDeleteForm}
  <Form
    formMode="delete"
    context={commentOrReply === "comment" ? "comment" : "comment reply"}
    id={commentOrReply === "comment" ? commentID : replyID}
  />
{/if}
