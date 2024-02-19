using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        void Add(Tag tag);
        void Delete(int tagId);
        List<Tag> GetById(int id);
        void UpdateTag(Tag tag);
        Tag GetTagById(int id);
    }
}