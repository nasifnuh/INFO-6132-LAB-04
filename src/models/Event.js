export default class Event {
  constructor(
    id,
    title,
    description,
    date,
    location,
    userId,
    imageUrl = null,
    favoriteBy = [],
    userName
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.favoriteBy = favoriteBy;
    this.userName = userName;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new Event(
      doc.id,
      data.title,
      data.description,
      data.date.toDate(),
      data.location,
      data.userId,
      data.imageUrl || null,
      data.favoriteBy || [],
      data.userName
    );
  }

  isFavoriteByUser(userId) {
    return Array.isArray(this.favoriteBy) && this.favoriteBy.includes(userId);
  }

  toFirestore() {
    return {
      title: this.title,
      description: this.description,
      date: this.date,
      location: this.location,
      userId: this.userId,
      imageUrl: this.imageUrl,
      favoriteBy: this.favoriteBy,
      userName: this.userName,
    };
  }
}
