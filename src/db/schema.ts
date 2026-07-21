import {
  integer,
  jsonb,
  bigint,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  index,
  check,
  decimal,
  time,
  date,
  AnyPgColumn,
  smallint,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// SERVICE CATEGORY
export const serviceCategory = pgTable("service_category", {
  id: bigint("id", { mode: "number" })
    .generatedByDefaultAsIdentity()
    .primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  slug: varchar("code").unique().notNull(),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }),
});

// SERVICE TYPE
export const serviceType = pgTable(
  "service_type",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    basePrice: decimal("base_price", { precision: 12, scale: 2 }),
    priceUnit: varchar("price_unit", { length: 20 }), // 'per_hour', 'per_day', 'per_project', 'fixed'
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    estimatedArrivalMinutes: integer("estimated_arrival_minutes"),
    requiresSiteVisit: boolean("requires_site_visit").default(true),
    categoryId: bigint("category_id", { mode: "number" })
      .notNull()
      .references((): AnyPgColumn => serviceCategory.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => [
    check(
      "price_unit_check",
      sql`price_unit IN ('per_hour', 'per_day', 'per_project', 'fixed')`,
    ),
    index("idx_service_type_category").on(table.categoryId),
  ],
);

// USER MANAGEMENT
export const user = pgTable(
  "user",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique().notNull(),
    password: text("password").notNull(),
    firebaseToken: text("firebase_token").notNull(),
    refreshToken: text("refresh_token"),
    email: varchar("email", { length: 255 }).unique(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    profilePhotoUrl: text("profile_photo_url"),
    userType: varchar("user_type", { length: 20 }).notNull(), // 'customer', 'admin', 'support'
    countryCode: varchar("country_code", { length: 5 }).default("TG"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
    lastLoginAt: timestamp("last_login_at"),
    isActive: boolean("is_active").default(true),
    isVerified: boolean("is_verified").default(false),
    verificationToken: varchar("verification_token", { length: 255 }),
    verificationTokenExpiresAt: timestamp("verification_token_expires_at"),
  },
  (table) => [
    check(
      "user_type_check",
      sql`user_type IN ('customer', 'admin', 'support')`,
    ),
    index("idx_user_phone").on(table.phoneNumber),
    index("idx_user_email").on(table.email),
    index("idx_user_type").on(table.userType),
    index("idx_user_active").on(table.isActive),
  ],
);

// USER PREFERENCE
export const userPreference = pgTable("user_preference", {
  id: bigint("id", { mode: "number" })
    .generatedByDefaultAsIdentity()
    .primaryKey(),
  userId: bigint("user_id", { mode: "bigint" })
    .references((): AnyPgColumn => user.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    })
    .unique()
    .notNull(),
  language: varchar("language", { length: 10 }).default("fr"),
  notificationEnabled: boolean("notification_enabled").default(true),
  smsNotifications: boolean("sms_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  preferredServiceCategories: text("preferred_service_categories").array(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }),
});

// PROVIDERS MANAGEMENT
export const provider = pgTable(
  "provider",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    ownerPhone: varchar("owner_phone", { length: 20 }).notNull(),
    ownerEmail: varchar("owner_email", { length: 255 }),
    registrationNumber: varchar("registration_number", { length: 50 }).unique(),
    taxId: varchar("tax_id", { length: 50 }),
    countryCode: varchar("country_code", { length: 5 }).default("TG"),
    isActive: boolean("is_active").default(true),
    isVerified: boolean("is_verified").default(false),
    verificationDate: timestamp("verification_date"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
    bankAccountName: varchar("bank_account_name", { length: 255 }),
    bankAccountNumber: varchar("bank_account_number", { length: 50 }),
    bankName: varchar("bank_name", { length: 100 }),
    swiftCode: varchar("swift_code", { length: 20 }),
    mobileMoneyNumber: varchar("mobile_money_number", { length: 20 }),
    mobileMoneyProvider: varchar("mobile_money_provider", { length: 50 }),
  },
  (table) => [
    index("idx_provider_active").on(table.isActive),
    index("idx_provider_verified").on(table.isVerified),
    index("idx_provider_company").on(table.companyName),
  ],
);

// SERVICE
export const service = pgTable(
  "service",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    serviceTypeId: bigint("service_type_id", { mode: "number" })
      .notNull()
      .references((): AnyPgColumn => serviceType.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    providerId: bigint("provider_id", { mode: "number" })
      .references((): AnyPgColumn => provider.id)
      .notNull(),
    customPrice: decimal("custom_price", { precision: 12, scale: 2 }),
    availabilityStatus: varchar("availability_status", { length: 20 }).default(
      "available",
    ),
    responseTimeHours: smallint("response_time_hours").default(24),
    yearsOfExperience: integer("years_of_experience"),
    certifications: text("certifications"),
    equipmentOwned: text("equipment_owned").array(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => [
    check(
      "availability_status_check",
      sql`availability_status IN ('available', 'busy', 'unavailable')`,
    ),
    uniqueIndex("provider_service_unique").on(
      table.providerId,
      table.serviceTypeId,
    ),
    index("idx_service_provider").on(table.providerId),
    index("idx_service_service_type").on(table.serviceTypeId),
    index("idx_service_availability").on(
      table.serviceTypeId,
      table.availabilityStatus,
    ),
  ],
);

// PROVIDER AVAILABILITY
export const providerAvailability = pgTable(
  "provider_availability",
  {
    id: bigint("id", { mode: "number" }).primaryKey(),
    providerId: bigint("provider_id", { mode: "number" })
      .references((): AnyPgColumn => provider.id)
      .notNull(),
    dayOfWeek: smallint("day_of_week"), // 0=Sunday, 6=Saturday
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    isAvailable: boolean("is_available").default(true),
    breakStart: time("break_start"),
    breakEnd: time("break_end"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check("day_of_week_check", sql`day_of_week BETWEEN 0 AND 6`),
    uniqueIndex("provider_availability_unique").on(
      table.providerId,
      table.dayOfWeek,
    ),
    index("idx_provider_availability_provider").on(table.providerId),
  ],
);

// SERVICE REQUESTS
export const serviceRequest = pgTable(
  "service_request",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    userId: bigint("user_id", { mode: "number" })
      .references((): AnyPgColumn => user.id)
      .notNull(),
    serviceTypeId: bigint("service_type_id", { mode: "number" })
      .references((): AnyPgColumn => serviceType.id)
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    locationLatitude: decimal("location_latitude", {
      precision: 10,
      scale: 8,
    }).notNull(),
    locationLongitude: decimal("location_longitude", {
      precision: 11,
      scale: 8,
    }).notNull(),
    locationAddress: varchar("location_address", { length: 500 }),
    preferredDate: date("preferred_date"),
    preferredTimeStart: time("preferred_time_start"),
    preferredTimeEnd: time("preferred_time_end"),
    urgencyLevel: varchar("urgency_level", { length: 20 }).default("normal"),
    estimatedBudget: decimal("estimated_budget", { precision: 12, scale: 2 }),
    attachments: text("attachments").array(),
    status: varchar("status", { length: 30 }).default("pending"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
    completedAt: timestamp("completed_at"),
    cancelledAt: timestamp("cancelled_at"),
    cancellationReason: varchar("cancellation_reason", { length: 255 }),
    createdCountryCode: varchar("created_country_code", { length: 5 }).default(
      "TG",
    ),
  },
  (table) => [
    check(
      "urgency_level_check",
      sql`urgency_level IN ('low', 'normal', 'high', 'emergency')`,
    ),
    check(
      "status_check",
      sql`status IN ('pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled', 'disputed')`,
    ),
    index("idx_service_request_user").on(table.userId),
    index("idx_service_request_status").on(table.status),
    index("idx_service_request_service").on(table.serviceTypeId),
    index("idx_service_request_created").on(table.createdAt.desc()),
    index("idx_service_request_status_created").on(
      table.status,
      table.createdAt.desc(),
    ),
  ],
);

// SERVICE ASSIGNMENT
export const serviceAssignment = pgTable(
  "service_assignment",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    serviceRequestId: bigint("service_request_id", { mode: "number" })
      .notNull()
      .references(() => serviceRequest.id, {
        onDelete: "cascade",
      }),
    providerId: bigint("provider_id", { mode: "number" })
      .notNull()
      .references(() => provider.id, {
        onDelete: "cascade",
      }),
    quoteId: bigint("quote_id", { mode: "number" }),
    assignedDate: timestamp("assigned_date", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    scheduledStart: timestamp("scheduled_start", {
      withTimezone: true,
      mode: "date",
    }),
    scheduledEnd: timestamp("scheduled_end", {
      withTimezone: true,
      mode: "date",
    }),
    actualStart: timestamp("actual_start", {
      withTimezone: true,
      mode: "date",
    }),
    actualEnd: timestamp("actual_end", {
      withTimezone: true,
      mode: "date",
    }),
    status: varchar("status", { length: 30 }).default("assigned"),
    cancellationReason: varchar("cancellation_reason", {
      length: 255,
    }),
    notes: text("notes"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "assignment_status_check",
      sql`status IN ('assigned','in_progress','on_hold','completed','cancelled')`,
    ),
    index("idx_service_assignment_request").on(table.serviceRequestId),
    index("idx_service_assignment_provider").on(table.providerId),
    index("idx_service_assignment_status").on(table.status),
    uniqueIndex("service_assignment_request_unique").on(table.serviceRequestId),
  ],
);

// PAYMENT METHOD
export const paymentMethod = pgTable(
  "payment_method",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    paymentType: varchar("payment_type", { length: 30 }).notNull(),
    isPrimary: boolean("is_primary").default(false),
    mobileMoneyProvider: varchar("mobile_money_provider", {
      length: 50,
    }),
    mobileMoneyNumber: varchar("mobile_money_number", {
      length: 20,
    }),
    mobileMoneyAccountName: varchar("mobile_money_account_name", {
      length: 100,
    }),
    bankAccountNumber: varchar("bank_account_number", {
      length: 50,
    }),
    bankName: varchar("bank_name", {
      length: 100,
    }),
    accountHolderName: varchar("account_holder_name", {
      length: 100,
    }),
    swiftCode: varchar("swift_code", {
      length: 20,
    }),
    cardLastFour: varchar("card_last_four", {
      length: 4,
    }),
    cardBrand: varchar("card_brand", {
      length: 20,
    }),
    cardExpiryMonth: smallint("card_expiry_month"),
    cardExpiryYear: smallint("card_expiry_year"),
    isVerified: boolean("is_verified").default(false),
    verificationToken: varchar("verification_token", {
      length: 255,
    }),
    verificationTokenExpiresAt: timestamp("verification_token_expires_at", {
      withTimezone: true,
      mode: "date",
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => [
    check(
      "payment_type_check",
      sql`payment_type IN ('mobile_money','cash','bank_transfer','card')`,
    ),
    index("idx_payment_method_user").on(table.userId),
    index("idx_payment_method_type").on(table.paymentType),
  ],
);

// TRANSACTIONS
export const transaction = pgTable(
  "transaction",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    serviceRequestId: bigint("service_request_id", { mode: "number" })
      .notNull()
      .references(() => serviceRequest.id),
    serviceAssignmentId: bigint("service_assignment_id", {
      mode: "number",
    }).references(() => serviceAssignment.id),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => user.id),
    providerId: bigint("provider_id", { mode: "number" })
      .notNull()
      .references(() => provider.id),
    paymentMethodId: bigint("payment_method_id", {
      mode: "number",
    }).references(() => paymentMethod.id),
    transactionType: varchar("transaction_type", {
      length: 20,
    }).notNull(),
    amount: decimal("amount", {
      precision: 12,
      scale: 2,
    }).notNull(),
    currency: varchar("currency", {
      length: 3,
    }).default("XOF"),
    transactionStatus: varchar("transaction_status", {
      length: 30,
    }).default("pending"),
    mobileMoneyReference: varchar("mobile_money_reference", {
      length: 100,
    }),
    mobileMoneyProvider: varchar("mobile_money_provider", {
      length: 50,
    }),
    mobileMoneyDestination: varchar("mobile_money_destination", {
      length: 20,
    }),
    cashCollectedBy: varchar("cash_collected_by", {
      length: 100,
    }),
    cashCollectionLocation: varchar("cash_collection_location", {
      length: 255,
    }),
    description: text("description"),
    failureReason: varchar("failure_reason", {
      length: 255,
    }),
    notes: text("notes"),
    ipAddress: varchar("ip_address", {
      length: 45,
    }),
    deviceInfo: varchar("device_info", {
      length: 500,
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    completedAt: timestamp("completed_at", {
      withTimezone: true,
      mode: "date",
    }),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "transaction_type_check",
      sql`transaction_type IN ('deposit','service_payment','provider_payout','refund','platform_fee')`,
    ),
    check(
      "transaction_status_check",
      sql`transaction_status IN ('pending','processing','completed','failed','refunded','cancelled')`,
    ),
    index("idx_transaction_user").on(table.userId),
    index("idx_transaction_provider").on(table.providerId),
    index("idx_transaction_status").on(table.transactionStatus),
    index("idx_transaction_type").on(table.transactionType),
    index("idx_transaction_created").on(table.createdAt.desc()),
    index("idx_transaction_request").on(table.serviceRequestId),
    index("idx_transaction_completion")
      .on(table.userId, table.createdAt.desc())
      .where(sql`${table.transactionStatus} = 'completed'`),
  ],
);

// RATINGS
export const rating = pgTable(
  "rating",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    serviceRequestId: bigint("service_request_id", { mode: "number" })
      .notNull()
      .references(() => serviceRequest.id, {
        onDelete: "cascade",
      }),
    providerId: bigint("provider_id", { mode: "number" })
      .notNull()
      .references(() => provider.id, {
        onDelete: "cascade",
      }),
    raterId: bigint("rater_id", { mode: "number" })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    ratingScore: decimal("rating_score", {
      precision: 2,
      scale: 1,
    }).notNull(),
    qualityScore: decimal("quality_score", {
      precision: 2,
      scale: 1,
    }),
    timelinessScore: decimal("timeliness_score", {
      precision: 2,
      scale: 1,
    }),
    communicationScore: decimal("communication_score", {
      precision: 2,
      scale: 1,
    }),
    reviewTitle: varchar("review_title", {
      length: 200,
    }),
    reviewText: text("review_text"),
    attachments: text("attachments").array(),
    isVerifiedService: boolean("is_verified_service").default(true),
    helpfulCount: integer("helpful_count").default(0),
    unhelpfulCount: integer("unhelpful_count").default(0),
    status: varchar("status", {
      length: 20,
    }).default("published"),
    moderationNotes: varchar("moderation_notes", {
      length: 500,
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => [
    check("rating_score_check", sql`rating_score BETWEEN 1 AND 5`),
    check(
      "rating_status_check",
      sql`status IN ('pending_review','published','hidden','flagged')`,
    ),
    index("idx_rating_provider").on(table.providerId),
    index("idx_rating_score").on(table.ratingScore.desc()),
    index("idx_rating_status").on(table.status),
    index("idx_rating_request").on(table.serviceRequestId),
    index("idx_rating_provider_published")
      .on(table.providerId, table.ratingScore)
      .where(sql`${table.status} = 'published'`),
  ],
);

// PROVIDER METRICS
export const providerMetric = pgTable(
  "provider_metric",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    providerId: bigint("provider_id", { mode: "number" })
      .notNull()
      .unique()
      .references(() => provider.id, {
        onDelete: "cascade",
      }),
    totalCompletedServices: integer("total_completed_services").default(0),
    averageRating: decimal("average_rating", {
      precision: 3,
      scale: 2,
    }).default("0"),
    totalRatingsCount: integer("total_ratings_count").default(0),
    responseTimeAverageHours: decimal("response_time_average_hours", {
      precision: 8,
      scale: 2,
    }).default("0"),
    completionRatePercentage: decimal("completion_rate_percentage", {
      precision: 5,
      scale: 2,
    }).default("100"),
    cancellationRatePercentage: decimal("cancellation_rate_percentage", {
      precision: 5,
      scale: 2,
    }).default("0"),
    customerSatisfactionPercentage: decimal(
      "customer_satisfaction_percentage",
      {
        precision: 5,
        scale: 2,
      },
    ).default("100"),
    onTimeCompletionPercentage: decimal("on_time_completion_percentage", {
      precision: 5,
      scale: 2,
    }).default("100"),
    last30DaysServices: integer("last_30_days_services").default(0),
    last30DaysRatingAverage: decimal("last_30_days_rating_average", {
      precision: 3,
      scale: 2,
    }).default("0"),
    riskScore: decimal("risk_score", {
      precision: 3,
      scale: 2,
    }).default("0"),
    trustworthinessScore: decimal("trustworthiness_score", {
      precision: 3,
      scale: 2,
    }).default("100"),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_provider_metrics_trustworthiness").on(
      table.trustworthinessScore.desc(),
    ),
  ],
);

// NOTIFICATIONS
export const notification = pgTable(
  "notification",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    notificationType: varchar("notification_type", {
      length: 50,
    }),
    title: varchar("title", {
      length: 255,
    }),
    message: text("message"),
    relatedEntityType: varchar("related_entity_type", {
      length: 50,
    }),
    relatedEntityId: bigint("related_entity_id", {
      mode: "number",
    }),
    actionUrl: varchar("action_url", {
      length: 500,
    }),
    isRead: boolean("is_read").default(false),
    readAt: timestamp("read_at", {
      withTimezone: true,
      mode: "date",
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_notification_user").on(table.userId),
    index("idx_notification_read").on(table.isRead),
    index("idx_notification_created").on(table.createdAt.desc()),
  ],
);

// MOBILE MONEY TRANSACTIONS
export const mobileMoneyTransaction = pgTable(
  "mobile_money_transaction",
  {
    id: bigint("id", { mode: "number" })
      .generatedByDefaultAsIdentity()
      .primaryKey(),
    transactionId: bigint("transaction_id", { mode: "number" })
      .notNull()
      .references(() => transaction.id),
    providerCode: varchar("provider_code", {
      length: 20,
    }),
    customerMsisdn: varchar("customer_msisdn", {
      length: 20,
    }),
    merchantMsisdn: varchar("merchant_msisdn", {
      length: 20,
    }),
    externalReferenceId: varchar("external_reference_id", {
      length: 100,
    }).unique(),
    requestSentAt: timestamp("request_sent_at", {
      withTimezone: true,
      mode: "date",
    }),
    callbackReceivedAt: timestamp("callback_received_at", {
      withTimezone: true,
      mode: "date",
    }),
    callbackStatus: varchar("callback_status", {
      length: 20,
    }),
    callbackPayload: jsonb("callback_payload"),
    retryCount: integer("retry_count").default(0),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_mobile_money_transaction_transaction").on(table.transactionId),
    index("idx_mobile_money_transaction_reference").on(
      table.externalReferenceId,
    ),
  ],
);

export type InsertUser = typeof user.$inferInsert;
export type InsertServiceRequest = typeof serviceRequest.$inferInsert;
export type InsertServiceAssignment = typeof serviceAssignment.$inferInsert;
export type InsertTransaction = typeof transaction.$inferInsert;
export type InsertRating = typeof rating.$inferInsert;
export type InsertProviderMetric = typeof providerMetric.$inferInsert;
export type InsertNotification = typeof notification.$inferInsert;
export type InsertMobileMoneyTransaction =
  typeof mobileMoneyTransaction.$inferInsert;
export type InsertPaymentMethod = typeof paymentMethod.$inferInsert;

export type SelectUser = typeof user.$inferSelect;
export type SelectServiceRequest = typeof serviceRequest.$inferSelect;
export type SelectServiceAssignment = typeof serviceAssignment.$inferSelect;
export type SelectTransaction = typeof transaction.$inferSelect;
export type SelectRating = typeof rating.$inferSelect;
export type SelectProviderMetric = typeof providerMetric.$inferSelect;
export type SelectNotification = typeof notification.$inferSelect;
export type SelectMobileMoneyTransaction =
  typeof mobileMoneyTransaction.$inferSelect;
export type SelectPaymentMethod = typeof paymentMethod.$inferSelect;
