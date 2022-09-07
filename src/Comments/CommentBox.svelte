<script>
    import Comment from './Comment.svelte'
    import {comments} from '../comments-store'
</script>

<section id="comment-box">
    {#each $comments as comment (comment.id)}
    <Comment
    id={comment.id}
    score={comment.score}
    username= {comment.username}
    userImage= {comment.user.image.png}
    createdAt={comment.createdAt}
    content={comment.content}
    />
    {/each}
</section>

