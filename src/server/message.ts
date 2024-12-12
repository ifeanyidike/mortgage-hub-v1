import DB from "@/lib/db";

class Message extends DB {
  constructor() {
    super();
  }

  public async fetchThreads(user_id: string) {
    return await this.db
      .selectFrom("messages")
      .select(["sender_id", "receiver_id"])
      .where((q) =>
        q.or([q("sender_id", "=", user_id), q("receiver_id", "=", user_id)])
      )
      .groupBy(["sender_id", "receiver_id"])
      .execute();
  }

  public async fetchMany(sender_id: string, receiver_id: string) {
    return await this.db
      .selectFrom("messages")
      .selectAll()
      .where((q) =>
        q.or([
          q("sender_id", "=", sender_id).and(
            q("receiver_id", "=", receiver_id)
          ),
          q("sender_id", "=", receiver_id).and(
            q("receiver_id", "=", sender_id)
          ),
        ])
      )
      .execute();
  }

  public async deleteMany(sender_id: string, receiver_id: string) {
    await this.db
      .deleteFrom("messages")
      .where((q) =>
        q.or([
          q("sender_id", "=", sender_id).and(
            q("receiver_id", "=", receiver_id)
          ),
          q("sender_id", "=", receiver_id).and(
            q("receiver_id", "=", sender_id)
          ),
        ])
      )
      .execute();

    return true;
  }

  public async deleteOne(messageId: string) {
    await this.db.deleteFrom("messages").where("id", "=", messageId).execute();

    return true;
  }
  public async send(sender_id: string, receiver_id: string, content: string) {
    const message = await this.db
      .insertInto("messages")
      .values({ sender_id, receiver_id, content })
      .executeTakeFirst();

    return message.insertId;
  }

  public async update(messageId: string, content: string) {
    await this.db
      .updateTable("messages")
      .set({ content })
      .where("id", "=", messageId)
      .execute();

    return true;
  }

  public async markAsRead(messageId: string) {
    await this.db
      .updateTable("messages")
      .set({ is_read: true })
      .where("id", "=", messageId)
      .execute();

    return true;
  }
}

export const messageClass = new Message();
