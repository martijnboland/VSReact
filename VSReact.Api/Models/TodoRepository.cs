using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoMvc.Data
{
    public class TodoRepository
    {
        public static List<Models.Todo> Todos = new List<Models.Todo>();
        public static int MaxId = 0;

        public IEnumerable<Models.Todo> GetAll()
        {
            return Todos.OrderByDescending(t => t.Order);
        }

        public Models.Todo Get(int id)
        {
            return Todos.Where(t => t.Id == id).FirstOrDefault();
        }

        public Models.Todo Save(Models.Todo item)
        {
            if (item.Id == 0)
            {
                item.Id = ++MaxId;
                if (!item.Order.HasValue)
                {
                    item.Order = item.Id;
                }
            }

            int index = Todos.IndexOf(item);
            if (index != -1)
            {
                Todos[index] = item;
            }
            else
            {
                Todos.Add(item);
            }

            return item;
        }

        public void Delete()
        {
            Todos.Clear();
        }

        public void Delete(int id)
        {
            Todos.RemoveAll(t => t.Id == id);
        }
    }
}