import { db } from "../db";
import { 
  priceAlerts, 
  newsAlerts, 
  alertNotifications,
  type PriceAlert,
  type NewsAlert,
  type InsertPriceAlert,
  type InsertNewsAlert,
  type AlertNotification
} from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { stockApiService } from "./stockApi";

export class AlertService {
  // Price Alert Management
  async createPriceAlert(userId: string, alertData: InsertPriceAlert): Promise<PriceAlert> {
    const [alert] = await db
      .insert(priceAlerts)
      .values({ ...alertData, userId })
      .returning();
    
    return alert;
  }

  async getUserPriceAlerts(userId: string): Promise<PriceAlert[]> {
    return await db
      .select()
      .from(priceAlerts)
      .where(and(eq(priceAlerts.userId, userId), eq(priceAlerts.isActive, true)));
  }

  async updatePriceAlert(userId: string, alertId: number, updates: Partial<PriceAlert>): Promise<PriceAlert | null> {
    const [alert] = await db
      .update(priceAlerts)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(priceAlerts.id, alertId), eq(priceAlerts.userId, userId)))
      .returning();
    
    return alert || null;
  }

  async deletePriceAlert(userId: string, alertId: number): Promise<boolean> {
    const result = await db
      .delete(priceAlerts)
      .where(and(eq(priceAlerts.id, alertId), eq(priceAlerts.userId, userId)));
    
    return result.rowCount > 0;
  }

  // News Alert Management
  async createNewsAlert(userId: string, alertData: InsertNewsAlert): Promise<NewsAlert> {
    const [alert] = await db
      .insert(newsAlerts)
      .values({ ...alertData, userId })
      .returning();
    
    return alert;
  }

  async getUserNewsAlerts(userId: string): Promise<NewsAlert[]> {
    return await db
      .select()
      .from(newsAlerts)
      .where(and(eq(newsAlerts.userId, userId), eq(newsAlerts.isActive, true)));
  }

  async updateNewsAlert(userId: string, alertId: number, updates: Partial<NewsAlert>): Promise<NewsAlert | null> {
    const [alert] = await db
      .update(newsAlerts)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(newsAlerts.id, alertId), eq(newsAlerts.userId, userId)))
      .returning();
    
    return alert || null;
  }

  async deleteNewsAlert(userId: string, alertId: number): Promise<boolean> {
    const result = await db
      .delete(newsAlerts)
      .where(and(eq(newsAlerts.id, alertId), eq(newsAlerts.userId, userId)));
    
    return result.rowCount > 0;
  }

  // Notification Management
  async getUserNotifications(userId: string, limit = 50): Promise<AlertNotification[]> {
    return await db
      .select()
      .from(alertNotifications)
      .where(eq(alertNotifications.userId, userId))
      .orderBy(sql`${alertNotifications.createdAt} DESC`)
      .limit(limit);
  }

  async markNotificationAsRead(userId: string, notificationId: number): Promise<boolean> {
    const result = await db
      .update(alertNotifications)
      .set({ isRead: true })
      .where(and(
        eq(alertNotifications.id, notificationId),
        eq(alertNotifications.userId, userId)
      ));
    
    return result.rowCount > 0;
  }

  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    const result = await db
      .update(alertNotifications)
      .set({ isRead: true })
      .where(eq(alertNotifications.userId, userId));
    
    return result.rowCount > 0;
  }

  // Alert Processing (called by background job)
  async checkPriceAlerts(): Promise<void> {
    try {
      const activeAlerts = await db
        .select()
        .from(priceAlerts)
        .where(and(eq(priceAlerts.isActive, true), eq(priceAlerts.triggered, false)));

      for (const alert of activeAlerts) {
        try {
          const quote = await stockApiService.getStockQuote(alert.symbol);
          const currentPrice = quote.price;
          let shouldTrigger = false;
          let message = '';

          switch (alert.alertType) {
            case 'above':
              if (alert.targetPrice && currentPrice >= parseFloat(alert.targetPrice)) {
                shouldTrigger = true;
                message = `${alert.symbol} has reached your target price of $${alert.targetPrice}. Current price: $${currentPrice.toFixed(2)}`;
              }
              break;
            
            case 'below':
              if (alert.targetPrice && currentPrice <= parseFloat(alert.targetPrice)) {
                shouldTrigger = true;
                message = `${alert.symbol} has dropped to your alert price of $${alert.targetPrice}. Current price: $${currentPrice.toFixed(2)}`;
              }
              break;
            
            case 'change_percent':
              if (alert.changePercent) {
                const changePercent = Math.abs(quote.changePercent);
                if (changePercent >= parseFloat(alert.changePercent)) {
                  shouldTrigger = true;
                  const direction = quote.changePercent >= 0 ? 'increased' : 'decreased';
                  message = `${alert.symbol} has ${direction} by ${changePercent.toFixed(2)}% today. Current price: $${currentPrice.toFixed(2)}`;
                }
              }
              break;
          }

          if (shouldTrigger) {
            // Mark alert as triggered
            await db
              .update(priceAlerts)
              .set({ 
                triggered: true, 
                triggeredAt: new Date(),
                updatedAt: new Date()
              })
              .where(eq(priceAlerts.id, alert.id));

            // Create notification
            await db
              .insert(alertNotifications)
              .values({
                userId: alert.userId,
                alertId: alert.id,
                alertType: 'price',
                symbol: alert.symbol,
                title: `Price Alert: ${alert.symbol}`,
                message,
                isRead: false,
                createdAt: new Date()
              });
          }
        } catch (error) {
          console.error(`Error checking alert for ${alert.symbol}:`, error);
        }
      }
    } catch (error) {
      console.error('Error checking price alerts:', error);
    }
  }

  // Check for news alerts (simplified implementation)
  async checkNewsAlerts(): Promise<void> {
    try {
      const activeNewsAlerts = await db
        .select()
        .from(newsAlerts)
        .where(eq(newsAlerts.isActive, true));

      for (const alert of activeNewsAlerts) {
        try {
          // Get recent news for the stock
          const news = await stockApiService.getCompanyNews(alert.symbol, alert.symbol);
          
          // Check if any news contains the keywords
          if (alert.keywords && alert.keywords.length > 0) {
            for (const article of news.slice(0, 5)) { // Check only recent 5 articles
              const articleText = (article.title + ' ' + article.description).toLowerCase();
              
              for (const keyword of alert.keywords) {
                if (articleText.includes(keyword.toLowerCase())) {
                  // Create notification for matching news
                  await db
                    .insert(alertNotifications)
                    .values({
                      userId: alert.userId,
                      alertId: alert.id,
                      alertType: 'news',
                      symbol: alert.symbol,
                      title: `News Alert: ${alert.symbol}`,
                      message: `New article mentioning "${keyword}": ${article.title}`,
                      isRead: false,
                      createdAt: new Date()
                    });
                  
                  break; // Only create one notification per article
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error checking news for ${alert.symbol}:`, error);
        }
      }
    } catch (error) {
      console.error('Error checking news alerts:', error);
    }
  }

  // Get alert statistics for dashboard
  async getAlertStats(userId: string): Promise<{
    totalPriceAlerts: number;
    activePriceAlerts: number;
    totalNewsAlerts: number;
    unreadNotifications: number;
  }> {
    const [priceAlertStats] = await db
      .select({
        total: sql<number>`count(*)`,
        active: sql<number>`count(*) filter (where ${priceAlerts.isActive} = true)`
      })
      .from(priceAlerts)
      .where(eq(priceAlerts.userId, userId));

    const [newsAlertStats] = await db
      .select({
        total: sql<number>`count(*)`
      })
      .from(newsAlerts)
      .where(and(eq(newsAlerts.userId, userId), eq(newsAlerts.isActive, true)));

    const [notificationStats] = await db
      .select({
        unread: sql<number>`count(*) filter (where ${alertNotifications.isRead} = false)`
      })
      .from(alertNotifications)
      .where(eq(alertNotifications.userId, userId));

    return {
      totalPriceAlerts: priceAlertStats?.total || 0,
      activePriceAlerts: priceAlertStats?.active || 0,
      totalNewsAlerts: newsAlertStats?.total || 0,
      unreadNotifications: notificationStats?.unread || 0
    };
  }
}

export const alertService = new AlertService();