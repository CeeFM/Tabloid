﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllCommentsByPostId(int postId);
        void Add(Comment comment);
        void Delete(int commentId);

        void Update(Comment comment);
    }
}