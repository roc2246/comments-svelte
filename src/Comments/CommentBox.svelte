<script>
  import Comment from "./Comment.svelte";
  import { comments, currentUser } from "../comments-store";
</script>

<section id="comment-box">
  {#each $comments as comment (comment.id)}
    <!-- If There Are Replies -->
    {#if comment.replies.length !== 0}
      <!-- Checks for user comment -->
      {#if comment.user.username === $currentUser[0].username}
        <Comment
          id={comment.id}
          commentOrReply="comment comment---you"
          score={comment.score}
          username={comment.user.username}
          userImage={comment.user.image.png}
          createdAt={comment.createdAt}
          content={comment.content}
          isCurrentUser={true}
        />
      {:else}
        <Comment
          id={comment.id}
          commentOrReply="comment"
          score={comment.score}
          username={comment.user.username}
          userImage={comment.user.image.png}
          createdAt={comment.createdAt}
          content={comment.content}
          isCurrentUser={false}
        />
      {/if}
      <!-- Generates Replies -->
      {#each comment.replies as reply (reply.id)}
        <!-- Checks for user reply -->
        {#if reply.user.username === $currentUser[0].username}
          <Comment
            id={reply.id}
            commentOrReply="comment reply reply--you"
            score={reply.score}
            username={reply.user.username}
            userImage={reply.user.image.png}
            createdAt={reply.createdAt}
            content={reply.content}
            isCurrentUser={true}
          />
        {:else}
          <Comment
            id={reply.id}
            commentOrReply="comment reply"
            score={reply.score}
            username={reply.user.username}
            userImage={reply.user.image.png}
            createdAt={reply.createdAt}
            content={reply.content}
            isCurrentUser={false}
          />
        {/if}
      {/each}

      <!-- If There Are No Replies -->
    {:else}
      <!-- Checks for user comment -->
      {#if comment.user.username === $currentUser[0].username}
        <Comment
          id={comment.id}
          commentOrReply="comment comment---you"
          score={comment.score}
          username={comment.user.username}
          userImage={comment.user.image.png}
          createdAt={comment.createdAt}
          content={comment.content}
          isCurrentUser={true}
        />
      {:else}
        <Comment
          id={comment.id}
          commentOrReply="comment"
          score={comment.score}
          username={comment.user.username}
          userImage={comment.user.image.png}
          createdAt={comment.createdAt}
          content={comment.content}
          isCurrentUser={false}
        />
      {/if}
    {/if}
  {/each}
</section>
