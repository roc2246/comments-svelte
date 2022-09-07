<script>
    export let commentOrReply;

    export let id;
    export let score
    export let username
    export let userImage
    export let createdAt
    export let content

    export let isCurrentUser;
</script>

<div class="{commentOrReply}">
    <span class="comment__id" style="display:none;">{id}</span>
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
        {#if isCurrentUser === true}
        <div class="comment__CRUD--reply"><img src="images/icon-edit.svg" alt="edit"> Edit</div>
        <div class="comment__CRUD--reply"><img src="images/icon-delete.svg" alt="delete"> Delete</div>
        {:else}
        <div class="comment__CRUD--reply"><img src="images/icon-reply.svg" alt="reply"> Reply</div>
        {/if}
    </div>
    <p class="comment__content">{content}</p>
</div>