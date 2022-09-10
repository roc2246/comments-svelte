<script>
  import Comment from "./Comment.svelte";
  import { comments, currentUser } from "../comments-store";
</script>

<section id="comment-box">
  {#each $comments as comment (comment.id)}
    <Comment
      id={comment.id}
      commentOrReply="comment"
      score={comment.score}
      username={comment.user.username}
      userImage={comment.user.image.png}
      createdAt={comment.createdAt}
      content={comment.content}
      isCurrentUser={comment.user.username === $currentUser[0].username}
    />
    <!-- If There Are Replies -->
    {#if comment.replies.length !== 0}
      <div class="reply-box">
        {#each comment.replies as reply (reply.id)}
          <Comment
            id={reply.id}
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
    {/if}
  {/each}
</section>
