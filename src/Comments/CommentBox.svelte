<script>
  import Comment from "./Comment.svelte";
  import { comments } from "../comments-store";
import Reply from "./Reply.svelte";
</script>

<section id="comment-box">
  {#each $comments as comment (comment.id)}
    {#if comment.replies.length !== 0}
      <Comment
        id={comment.id}
        score={comment.score}
        username={comment.user.username}
        userImage={comment.user.image.png}
        createdAt={comment.createdAt}
        content={comment.content}
      />
      {#each comment.replies as reply (reply.id)}
      <Comment
        id={reply.id}
        score={reply.score}
        username={reply.user.username}
        userImage={reply.user.image.png}
        createdAt={reply.createdAt}
        content={reply.content}
      />
      {/each}
      {:else}
      <Comment
        id={comment.id}
        score={comment.score}
        username={comment.user.username}
        userImage={comment.user.image.png}
        createdAt={comment.createdAt}
        content={comment.content}
      /> 
    {/if}
  {/each}
</section>
