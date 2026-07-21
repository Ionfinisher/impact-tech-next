import { db } from "./index";
import {
  eq,
  and,
  or,
  desc,
  asc,
  sql,
  inArray,
  isNull,
  between,
} from "drizzle-orm";
import {
  user,
  serviceRequest,
  serviceType,
  provider,
  service,
  serviceAssignment,
  transaction,
  rating,
  providerMetric,
  paymentMethod,
  notification,
  InsertUser,
  InsertServiceRequest,
  InsertServiceAssignment,
  InsertTransaction,
  InsertRating,
  InsertProviderMetric,
  InsertPaymentMethod,
  InsertNotification,
  SelectUser,
  SelectServiceRequest,
  SelectServiceAssignment,
  SelectTransaction,
  SelectRating,
  SelectProviderMetric,
  SelectPaymentMethod,
  SelectNotification,
} from "./schema";

// ============================================================================
// USER QUERIES
// ============================================================================

export class UserQueries {
  /**
   * Create a new customer
   */
  static async createCustomer(data: InsertUser) {
    await db
      .insert(user)
      .values({
        ...data,
        userType: "customer",
        isActive: true,
      })
      .returning();
  }

  /**
   * Get customer by phone
   */
  static async getCustomerByPhone(phoneNumber: string) {
    const result = await db.query.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        userType: "customer",
      },
      with: {
        preferences: true,
      },
    });
    return result || null;
  }

  /**
   * Get User by ID
   */
  static async getUserById(
    userId: number,
    userType: "customer" | "provider" | "admin",
  ) {
    const result = await db.query.user.findFirst({
      where: {
        id: userId,
        userType: userType,
      },
      with: {
        preferences: true,
      },
    });
    return result || null;
  }

  /**
   * Get customer by Email
   */
  static async getUserByEmail(
    email: string,
    userType: "customer" | "provider" | "admin",
  ) {
    const result = await db.query.user.findFirst({
      where: {
        email: email,
        userType: userType,
      },
      with: {
        preferences: true,
      },
    });
    return result || null;
  }

  /**
   * Get customer with service history
   */
  static async getCustomerWithHistory(userId: number) {
    return await db.query.user.findFirst({
      where: {
        id: userId,
      },
      with: {
        serviceRequests: {
          limit: 10,
          orderBy: (table, { desc }) => [desc(table.createdAt)],
          with: {
            serviceType: true,
            assignments: {
              with: {
                provider: true,
              },
            },
          },
        },
        ratings: {
          limit: 10,
          orderBy: (table, { desc }) => [desc(table.createdAt)],
        },
      },
    });
  }

  /**
   * Update user refresh token
   */
  static async updateRefreshToken(userId: number, refreshToken: string | null) {
    return await db
      .update(user)
      .set({ refreshToken: refreshToken })
      .where(eq(user.id, userId));
  }

  /**
   * Update user last login
   */
  static async updateLastLogin(userId: number) {
    return await db
      .update(user)
      .set({ lastLoginAt: new Date() })
      .where(eq(user.id, userId));
  }
}

// ============================================================================
// SERVICE REQUEST QUERIES
// ============================================================================

export class ServiceRequestQueries {
  /**
   * Create new service request
   */
  static async createServiceRequest(data: InsertServiceRequest) {
    return await db
      .insert(serviceRequest)
      .values({
        ...data,
        status: "pending",
      })
      .returning();
  }

  /**
   * Get service requests near location (basic distance - requires PostGIS for advanced)
   */
  static async getAllRequests(limit: number = 20) {
    return await db.query.serviceRequest.findMany({
      orderBy: (table, { desc }) => [desc(table.createdAt)],
      limit,
      with: {
        serviceType: {
          with: {
            category: true,
          },
        },
        user: true,
      },
    });
  }

  /**
   * Get pending service requests
   */
  static async getPendingRequests(limit: number = 20) {
    return await db.query.serviceRequest.findMany({
      where: {
        status: "pending",
      },
      orderBy: (table, { desc }) => [desc(table.createdAt)],
      limit,
      with: {
        serviceType: {
          with: {
            category: true,
          },
        },
        user: true,
      },
    });
  }

  /**
   * Get service requests near location (basic distance - requires PostGIS for advanced)
   */
  static async getRequestsNearLocation(
    latitude: number,
    longitude: number,
    radiusKm: number = 5,
  ) {
    // For MVP without PostGIS, use simple bounding box
    const latOffset = radiusKm / 111;
    const lngOffset = radiusKm / (111 * Math.cos(latitude * (Math.PI / 180)));

    return await db.query.serviceRequest.findMany({
      where: {
        status: "pending",
        AND: [
          {
            RAW: (table) =>
              sql`${table.locationLatitude} BETWEEN (${latitude} - ${latOffset}) AND (${latitude} + ${latOffset})`,
          },
          {
            RAW: (table) =>
              sql`${table.locationLongitude} BETWEEN (${longitude} - ${lngOffset}) AND (${longitude} + ${lngOffset})`,
          },
        ],
      },
      with: {
        user: true,
        serviceType: true,
      },
    });
  }

  /**
   * Update request status
   */
  static async updateRequestStatus(requestId: number, newStatus: string) {
    return await db
      .update(serviceRequest)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(serviceRequest.id, requestId))
      .returning();
  }

  /**
   * Get request with full details
   */
  static async getRequestWithDetails(requestId: number) {
    return await db.query.serviceRequest.findFirst({
      where: {
        id: requestId,
      },
      with: {
        user: true,
        serviceType: {
          with: {
            category: true,
          },
        },
        assignments: {
          with: {
            provider: true,
          },
        },
        ratings: true,
        transactions: true,
      },
    });
  }
}

// ============================================================================
// PROVIDER QUERIES
// ============================================================================

export class ProviderQueries {
  /**
   * Get provider with full profile
   */
  static async getProviderProfile(providerId: number) {
    return await db.query.provider.findFirst({
      where: {
        id: providerId,
      },
      with: {
        services: {
          with: {
            serviceType: {
              with: {
                category: true,
              },
            },
          },
        },
        availability: true,
        metrics: true,
        ratings: {
          limit: 10,
          where: {
            status: "published",
          },
        },
      },
    });
  }

  /**
   * Find providers for service type
   */
  static async findProvidersForService(serviceTypeId: number) {
    return await db.query.service.findMany({
      where: {
        serviceTypeId: serviceTypeId,
        availabilityStatus: "available",
      },
      with: {
        provider: {
          with: {
            metrics: true,
            ratings: {
              limit: 5,
              where: {
                status: "published",
              },
            },
          },
        },
      },
    });
  }

  /**
   * Update provider availability
   */
  static async updateProviderAvailability(
    providerId: number,
    status: "available" | "busy" | "unavailable",
  ) {
    return await db
      .update(service)
      .set({ availabilityStatus: status })
      .where(eq(service.providerId, providerId));
  }

  /**
   * Get provider earnings (30 days)
   */
  static async getProviderEarnings(providerId: number) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await db
      .select({
        totalEarnings: sql`SUM(amount)`,
        completedServices: sql`COUNT(DISTINCT service_request_id)`,
        averageServiceAmount: sql`AVG(amount)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.providerId, providerId),
          eq(transaction.transactionStatus, "completed"),
          sql`created_at >= ${thirtyDaysAgo}`,
        ),
      );
  }
}

// ============================================================================
// PAYMENT & TRANSACTION QUERIES
// ============================================================================

export class PaymentQueries {
  /**
   * Get user payment methods
   */
  static async getUserPaymentMethods(userId: number) {
    return await db.query.paymentMethod.findMany({
      where: {
        userId: userId,
        deletedAt: undefined,
      },
    });
  }

  /**
   * Create transaction
   */
  static async createTransaction(data: InsertTransaction) {
    return await db
      .insert(transaction)
      .values({
        ...data,
        currency: "XOF",
        transactionStatus: "pending",
      })
      .returning();
  }

  /**
   * Get transaction history
   */
  static async getTransactionHistory(userId: number, limit: number = 50) {
    return await db.query.transaction.findMany({
      where: {
        userId: userId,
      },
      with: {
        serviceRequest: true,
        provider: true,
      },
      limit: limit,
      orderBy: (table, { desc }) => [desc(table.createdAt)],
    });
  }

  /**
   * Complete transaction (after payment confirmation)
   */
  static async completeTransaction(transactionId: number) {
    const txn = await db.query.transaction.findFirst({
      where: {
        id: transactionId,
      },
    });

    if (!txn) throw new Error("Transaction not found");

    // Update transaction status
    await db
      .update(transaction)
      .set({
        transactionStatus: "completed",
        completedAt: new Date(),
      })
      .where(eq(transaction.id, transactionId));
  }

  /**
   * Get provider payouts
   */
  static async getProviderPayouts(providerId: number) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await db
      .select({
        amount: sql`SUM(amount)`,
        count: sql`COUNT(*)`,
        average: sql`AVG(amount)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.providerId, providerId),
          eq(transaction.transactionStatus, "completed"),
          sql`created_at >= ${thirtyDaysAgo}`,
        ),
      );
  }
}

// ============================================================================
// RATING & REVIEW QUERIES
// ============================================================================

export class RatingQueries {
  /**
   * Create rating
   */
  static async createRating(data: InsertRating) {
    return await db
      .insert(rating)
      .values({
        ...data,
        status: "published",
        isVerifiedService: true,
      })
      .returning();
  }

  /**
   * Get provider ratings
   */
  static async getProviderRatings(providerId: number) {
    return await db.query.rating.findMany({
      where: {
        providerId: providerId,
        status: "published",
      },
      orderBy: (table, { desc }) => [desc(table.createdAt)],
      with: {
        rater: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhotoUrl: true,
          },
        },
      },
    });
  }

  /**
   * Update provider metrics after rating
   */
  static async updateProviderMetrics(providerId: number) {
    const metrics = await db
      .select({
        avgRating: sql`AVG(rating_score)`,
        totalRatings: sql`COUNT(*)`,
        completedServices: sql`COUNT(DISTINCT service_request_id)`,
      })
      .from(rating)
      .where(
        and(eq(rating.providerId, providerId), eq(rating.status, "published")),
      );

    if (metrics.length > 0) {
      await db
        .update(providerMetric)
        .set({
          averageRating: metrics[0].avgRating?.toString() || "0",
          totalRatingsCount: parseInt(
            metrics[0].totalRatings?.toString() || "0",
          ),
          totalCompletedServices: parseInt(
            metrics[0].completedServices?.toString() || "0",
          ),
          updatedAt: new Date(),
        })
        .where(eq(providerMetric.providerId, providerId));
    }
  }
}

// ============================================================================
// NOTIFICATION QUERIES
// ============================================================================

export class NotificationQueries {
  /**
   * Create notification
   */
  static async createNotification(data: InsertNotification) {
    return await db.insert(notification).values(data).returning();
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(
    userId: number,
    unreadOnly: boolean = false,
  ) {
    let query = db.query.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: (table, { desc }) => [desc(table.createdAt)],
      limit: 50,
    });

    if (unreadOnly) {
      query = db.query.notification.findMany({
        where: {
          userId: userId,
          isRead: false,
        },
        orderBy: (table, { desc }) => [desc(table.createdAt)],
      });
    }

    return query;
  }

  /**
   * Mark as read
   */
  static async markAsRead(notificationId: number) {
    return await db
      .update(notification)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notification.id, notificationId));
  }
}

// ============================================================================
// ANALYTICS QUERIES
// ============================================================================

export class AnalyticsQueries {
  /**
   * Get platform statistics
   */
  static async getPlatformStats(daysBack: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const [
      totalRequests,
      completedRequests,
      totalRevenue,
      uniqueCustomers,
      activeProviders,
    ] = await Promise.all([
      db
        .select({ count: sql`COUNT(*)` })
        .from(serviceRequest)
        .where(sql`created_at >= ${startDate}`),
      db
        .select({ count: sql`COUNT(*)` })
        .from(serviceRequest)
        .where(
          and(
            eq(serviceRequest.status, "completed"),
            sql`created_at >= ${startDate}`,
          ),
        ),
      db
        .select({ total: sql`SUM(amount)` })
        .from(transaction)
        .where(
          and(
            eq(transaction.transactionStatus, "completed"),
            sql`created_at >= ${startDate}`,
          ),
        ),
      db
        .select({ count: sql`COUNT(DISTINCT user_id)` })
        .from(serviceRequest)
        .where(sql`created_at >= ${startDate}`),
      db
        .select({ count: sql`COUNT(DISTINCT provider_id)` })
        .from(serviceAssignment)
        .where(sql`created_at >= ${startDate}`),
    ]);

    return {
      totalRequests: parseInt(totalRequests[0]?.count?.toString() || "0"),
      completedRequests: parseInt(
        completedRequests[0]?.count?.toString() || "0",
      ),
      totalRevenue: totalRevenue[0]?.total?.toString() || "0",
      uniqueCustomers: parseInt(uniqueCustomers[0]?.count?.toString() || "0"),
      activeProviders: parseInt(activeProviders[0]?.count?.toString() || "0"),
    };
  }
}
