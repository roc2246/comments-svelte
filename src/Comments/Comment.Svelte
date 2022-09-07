<script>
    export let score
    export let username
    export let userImage
    export let createdAt
    export let content
</script>

<div class="comment">
    <form action="" class="comment__vote">
        <div class="comment__vote--upvote">
            <img src="images/icon-plus.svg" alt="upvote">
        </div>
        <span class="comment__vote--score">{score}</span>
        <div class="comment__vote--downvote">
            <img src="images/icon-minus.svg" alt="downvote">
        </div>
    </form>
    <div class="comment_user-image">
        <img src="{userImage}" alt="{username}">
    </div>
    <span class="comment__username">{username}</span>
    <span class="comment__post-date">{createdAt}</span>
    <div class="comment_CRUD">
        <div class="comment__CRUD--reply"><img src="images/icon-reply.svg" alt="reply"> Reply</div>
    </div>
    <p class="comment__content">{content}</p>
</div>