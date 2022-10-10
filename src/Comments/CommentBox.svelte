<script>
  import Comment from "./Comment.svelte";
  import { comments, commentsStore, getComments, currentUser, userStore, getUser } from "../js/comments-store";
  import { onMount } from "svelte";

  // Assigns MongoDB data to stores
  onMount(async () => {
    let comments = await getComments();
    let user = await getUser();

    if (comments) commentsStore.update((data) => comments);
    if (user) userStore.update((data) => user);
  });
</script>

<section id="comment-box">
  {#if $commentsStore && $userStore}
    {#each $commentsStore as comment (comment.id)}
      <Comment
        commentID={comment.id}
        commentOrReply="comment"
        score={comment.score}
        username={comment.user.username}
        userImage={comment.user.image.png}
        createdAt={comment.createdAt}
        content={comment.content}
        isCurrentUser={comment.user.username === $userStore[0].username}
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
                isCurrentUser={reply.user.username === $userStore[0].username}
              />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  {/if}
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
