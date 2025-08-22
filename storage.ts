import { 
  users, wallets, transactions, eegSessions, eegData, dataSources, 
  visualizations, templates, activities, payments,
  type User, type InsertUser, type Wallet, type InsertWallet,
  type Transaction, type InsertTransaction, type EegSession, type InsertEegSession,
  type EegData, type InsertEegData, type DataSource, type InsertDataSource,
  type Visualization, type InsertVisualization, type Template, type InsertTemplate,
  type Activity, type InsertActivity, type Payment, type InsertPayment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, count } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;

  // Wallets
  getWallet(id: number): Promise<Wallet | undefined>;
  getWalletsByUserId(userId: number): Promise<Wallet[]>;
  createWallet(insertWallet: InsertWallet): Promise<Wallet>;
  updateWallet(id: number, updates: Partial<InsertWallet>): Promise<Wallet>;
  deleteWallet(id: number): Promise<boolean>;

  // Transactions
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByWalletId(walletId: number): Promise<Transaction[]>;
  createTransaction(insertTransaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, updates: Partial<InsertTransaction>): Promise<Transaction>;

  // EEG Sessions
  getEegSession(id: number): Promise<EegSession | undefined>;
  getEegSessionsByUserId(userId: number): Promise<EegSession[]>;
  createEegSession(insertEegSession: InsertEegSession): Promise<EegSession>;
  updateEegSession(id: number, updates: Partial<InsertEegSession>): Promise<EegSession>;
  deleteEegSession(id: number): Promise<boolean>;

  // EEG Data
  getEegDataBySessionId(sessionId: number): Promise<EegData[]>;
  createEegData(insertEegData: InsertEegData): Promise<EegData>;
  getLatestEegData(sessionId: number, limit?: number): Promise<EegData[]>;

  // Data Sources
  getDataSource(id: number): Promise<DataSource | undefined>;
  getDataSourcesByUserId(userId: number): Promise<DataSource[]>;
  createDataSource(insertDataSource: InsertDataSource): Promise<DataSource>;
  updateDataSource(id: number, updates: Partial<InsertDataSource>): Promise<DataSource>;
  deleteDataSource(id: number): Promise<boolean>;

  // Visualizations
  getVisualization(id: number): Promise<Visualization | undefined>;
  getVisualizationsByUserId(userId: number): Promise<Visualization[]>;
  createVisualization(insertVisualization: InsertVisualization): Promise<Visualization>;
  updateVisualization(id: number, updates: Partial<InsertVisualization>): Promise<Visualization>;
  deleteVisualization(id: number): Promise<boolean>;

  // Templates
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplatesByUserId(userId: number): Promise<Template[]>;
  getPublicTemplates(): Promise<Template[]>;
  createTemplate(insertTemplate: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template>;
  deleteTemplate(id: number): Promise<boolean>;

  // Activities
  getActivitiesByUserId(userId: number, limit?: number): Promise<Activity[]>;
  createActivity(insertActivity: InsertActivity): Promise<Activity>;

  // Payments
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByUserId(userId: number): Promise<Payment[]>;
  createPayment(insertPayment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, updates: Partial<InsertPayment>): Promise<Payment>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db.update(users).set({ ...updates, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return user;
  }

  // Wallets
  async getWallet(id: number): Promise<Wallet | undefined> {
    const [wallet] = await db.select().from(wallets).where(eq(wallets.id, id));
    return wallet || undefined;
  }

  async getWalletsByUserId(userId: number): Promise<Wallet[]> {
    return await db.select().from(wallets).where(eq(wallets.userId, userId));
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const [wallet] = await db.insert(wallets).values(insertWallet).returning();
    return wallet;
  }

  async updateWallet(id: number, updates: Partial<InsertWallet>): Promise<Wallet> {
    const [wallet] = await db.update(wallets).set({ ...updates, updatedAt: new Date() }).where(eq(wallets.id, id)).returning();
    return wallet;
  }

  async deleteWallet(id: number): Promise<boolean> {
    const result = await db.delete(wallets).where(eq(wallets.id, id));
    return result.count > 0;
  }

  // Transactions
  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async getTransactionsByWalletId(walletId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.walletId, walletId)).orderBy(desc(transactions.timestamp));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(insertTransaction).returning();
    return transaction;
  }

  async updateTransaction(id: number, updates: Partial<InsertTransaction>): Promise<Transaction> {
    const [transaction] = await db.update(transactions).set(updates).where(eq(transactions.id, id)).returning();
    return transaction;
  }

  // EEG Sessions
  async getEegSession(id: number): Promise<EegSession | undefined> {
    const [session] = await db.select().from(eegSessions).where(eq(eegSessions.id, id));
    return session || undefined;
  }

  async getEegSessionsByUserId(userId: number): Promise<EegSession[]> {
    return await db.select().from(eegSessions).where(eq(eegSessions.userId, userId)).orderBy(desc(eegSessions.createdAt));
  }

  async createEegSession(insertEegSession: InsertEegSession): Promise<EegSession> {
    const [session] = await db.insert(eegSessions).values(insertEegSession).returning();
    return session;
  }

  async updateEegSession(id: number, updates: Partial<InsertEegSession>): Promise<EegSession> {
    const [session] = await db.update(eegSessions).set({ ...updates, updatedAt: new Date() }).where(eq(eegSessions.id, id)).returning();
    return session;
  }

  async deleteEegSession(id: number): Promise<boolean> {
    const result = await db.delete(eegSessions).where(eq(eegSessions.id, id));
    return result.count > 0;
  }

  // EEG Data
  async getEegDataBySessionId(sessionId: number): Promise<EegData[]> {
    return await db.select().from(eegData).where(eq(eegData.sessionId, sessionId)).orderBy(desc(eegData.timestamp));
  }

  async createEegData(insertEegData: InsertEegData): Promise<EegData> {
    const [data] = await db.insert(eegData).values(insertEegData).returning();
    return data;
  }

  async getLatestEegData(sessionId: number, limit: number = 100): Promise<EegData[]> {
    return await db.select().from(eegData).where(eq(eegData.sessionId, sessionId)).orderBy(desc(eegData.timestamp)).limit(limit);
  }

  // Data Sources
  async getDataSource(id: number): Promise<DataSource | undefined> {
    const [dataSource] = await db.select().from(dataSources).where(eq(dataSources.id, id));
    return dataSource || undefined;
  }

  async getDataSourcesByUserId(userId: number): Promise<DataSource[]> {
    return await db.select().from(dataSources).where(eq(dataSources.userId, userId)).orderBy(desc(dataSources.createdAt));
  }

  async createDataSource(insertDataSource: InsertDataSource): Promise<DataSource> {
    const [dataSource] = await db.insert(dataSources).values(insertDataSource).returning();
    return dataSource;
  }

  async updateDataSource(id: number, updates: Partial<InsertDataSource>): Promise<DataSource> {
    const [dataSource] = await db.update(dataSources).set({ ...updates, lastUpdated: new Date() }).where(eq(dataSources.id, id)).returning();
    return dataSource;
  }

  async deleteDataSource(id: number): Promise<boolean> {
    const result = await db.delete(dataSources).where(eq(dataSources.id, id));
    return result.count > 0;
  }

  // Visualizations
  async getVisualization(id: number): Promise<Visualization | undefined> {
    const [visualization] = await db.select().from(visualizations).where(eq(visualizations.id, id));
    return visualization || undefined;
  }

  async getVisualizationsByUserId(userId: number): Promise<Visualization[]> {
    return await db.select().from(visualizations).where(eq(visualizations.userId, userId)).orderBy(desc(visualizations.createdAt));
  }

  async createVisualization(insertVisualization: InsertVisualization): Promise<Visualization> {
    const [visualization] = await db.insert(visualizations).values(insertVisualization).returning();
    return visualization;
  }

  async updateVisualization(id: number, updates: Partial<InsertVisualization>): Promise<Visualization> {
    const [visualization] = await db.update(visualizations).set({ ...updates, updatedAt: new Date() }).where(eq(visualizations.id, id)).returning();
    return visualization;
  }

  async deleteVisualization(id: number): Promise<boolean> {
    const result = await db.delete(visualizations).where(eq(visualizations.id, id));
    return result.count > 0;
  }

  // Templates
  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  async getTemplatesByUserId(userId: number): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.userId, userId)).orderBy(desc(templates.createdAt));
  }

  async getPublicTemplates(): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.isPublic, true)).orderBy(desc(templates.usageCount));
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const [template] = await db.insert(templates).values(insertTemplate).returning();
    return template;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template> {
    const [template] = await db.update(templates).set({ ...updates, updatedAt: new Date() }).where(eq(templates.id, id)).returning();
    return template;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    const result = await db.delete(templates).where(eq(templates.id, id));
    return result.count > 0;
  }

  // Activities
  async getActivitiesByUserId(userId: number, limit: number = 50): Promise<Activity[]> {
    return await db.select().from(activities).where(eq(activities.userId, userId)).orderBy(desc(activities.createdAt)).limit(limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities).values(insertActivity).returning();
    return activity;
  }

  // Payments
  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db.insert(payments).values(insertPayment).returning();
    return payment;
  }

  async updatePayment(id: number, updates: Partial<InsertPayment>): Promise<Payment> {
    const [payment] = await db.update(payments).set({ ...updates, updatedAt: new Date() }).where(eq(payments.id, id)).returning();
    return payment;
  }
}

export const storage = new DatabaseStorage();
