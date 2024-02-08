﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void DeletePost(int postId);
        List<Post> GetAllPublishedPosts();
        List<Post> GetAllPublishedPostsByUser(int id);
        Post GetPublishedPostById(int id);
    }
}