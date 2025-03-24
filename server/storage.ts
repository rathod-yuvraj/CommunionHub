import { users, type User, type InsertUser, events, type Event, type InsertEvent } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event storage methods
  getAllEvents(): Promise<Event[]>;
  getEventsByCategory(category: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  userCurrentId: number;
  eventCurrentId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
    
    // Add some initial events
    this.createEvent({
      title: "Interfaith Prayer Service",
      date: "2023-09-15",
      time: "10:00",
      location: "Unity Center, 123 Main St",
      description: "Join us for a beautiful service bringing together prayers and traditions from different faiths in our community.",
      category: "religious"
    });
    
    this.createEvent({
      title: "Community Potluck Dinner",
      date: "2023-10-02",
      time: "18:30",
      location: "Community Hall, 45 Park Avenue",
      description: "Bring your favorite dish and join us for an evening of food, music, and conversation with neighbors from all backgrounds.",
      category: "social"
    });
    
    this.createEvent({
      title: "Homeless Shelter Volunteer Day",
      date: "2023-09-28",
      time: "09:00",
      location: "Hope Shelter, 789 Elm Street",
      description: "Help prepare meals and organize donations at our local shelter. All faith communities are coming together for this important cause.",
      category: "charity"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEventsByCategory(category: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.category === category
    );
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCurrentId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
}

export const storage = new MemStorage();
