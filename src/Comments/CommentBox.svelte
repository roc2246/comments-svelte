<script>
  import Comment from "./Comment.svelte";
  import { comments, currentUser } from "../js/comments-store";

  fetch("/comments")
    .then((response) => response.json())
    .then((data) => console.log(data));

  fetch("/user")
    .then((response) => response.json())
    .then((data) => console.log(data));

  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  const commentsStore = writable(null);
  async function getComments() {
    let response = await fetch("/comments");
    return response.ok ? await response.json() : null;
  }
  onMount(async () => {
    let comments = await getComments();
    if (comments) commentsStore.update((data) => comments);
  });
</script>

<section id="comment-box">
  {#if $commentsStore}
    {#each $commentsStore as comment (comment.id)}
      <Comment
        commentID={comment.id}
        commentOrReply="comment"
        score={comment.score}
        username={comment.user.username}
        userImage={comment.user.image.png}
        createdAt={comment.createdAt}
        content={comment.content}
        isCurrentUser={comment.user.username === $currentUser[0].username}
      />
      {#if comment.replies.length !== 0}
        <div class="reply-box">
          <div class="reply-box__reply-line" />
          <div class="reply-box__replies">
            {#each comment.replies as reply (reply.id)}
              <Comment
                commentID={comment.id}
                replyID={reply.id}
                commentOrReply="comment reply"
                score={reply.score}
                username={reply.user.username}
                userImage={reply.user.image.png}
                createdAt={reply.createdAt}
                replyTo={reply.replyingTo}
                content={reply.content}
                isCurrentUser={reply.user.username === $currentUser[0].username}
              />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  {/if}

  <!-- {#each $comments as comment (comment.id)}
    <Comment
      commentID={comment.id}
      commentOrReply="comment"
      score={comment.score}
      username={comment.user.username}
      userImage={comment.user.image.png}
      createdAt={comment.createdAt}
      content={comment.content}
      isCurrentUser={comment.user.username === $currentUser[0].username}
    />
 {#if comment.replies.length !== 0}
      <div class="reply-box">
        <div class="reply-box__reply-line" />
        <div class="reply-box__replies">
          {#each comment.replies as reply (reply.id)}
            <Comment
              commentID={comment.id}
              replyID={reply.id}
              commentOrReply="comment reply"
              score={reply.score}
              username={reply.user.username}
              userImage={reply.user.image.png}
              createdAt={reply.createdAt}
              replyTo={reply.replyingTo}
              content={reply.content}
              isCurrentUser={reply.user.username === $currentUser[0].username}
            />
          {/each}
        </div>
      </div>
    {/if}
  {/each} -->
</section>

<style lang="scss">
  @import "../global";
  #comment-box {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .reply-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    &__reply-line {
      margin-top: 1rem;
      border-left: 3px solid $pale-grey;
      height: auto;
      width: 5%;
    }
    &__replies {
      display: flex;
      flex-direction: column;
      width: 95%;
    }
  }

  @media (max-width: $mobile) {
    .reply-box {
      &__reply-line {
        margin-right: 0.5rem;
        margin-left: 0;
      }
    }
  }
</style>
