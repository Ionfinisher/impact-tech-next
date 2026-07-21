// import {
//   pgTable,
//   bigserial,
//   varchar,
//   text,
//   timestamp,
//   boolean,
//   decimal,
//   integer,
//   smallint,
//   time,
//   date,
//   jsonb,
//   foreignKey,
//   uniqueIndex,
//   index,
//   check,
//   serial,
//   AnyPgColumn,
// } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm/_relations";

// // ============================================================================
// // 1. USERS - Authentication & User Management
// // ============================================================================

// export const users = pgTable(
//   "users",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     phoneNumber: varchar("phone_number", { length: 20 }).unique().notNull(),
//     email: varchar("email", { length: 255 }).unique(),
//     firstName: varchar("first_name", { length: 100 }).notNull(),
//     lastName: varchar("last_name", { length: 100 }).notNull(),
//     profilePhotoUrl: text("profile_photo_url"),
//     userType: varchar("user_type", { length: 20 }).notNull(), // 'customer', 'admin', 'support'
//     countryCode: varchar("country_code", { length: 5 }).default("TG"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//     lastLoginAt: timestamp("last_login_at"),
//     isActive: boolean("is_active").default(true),
//     isVerified: boolean("is_verified").default(false),
//     verificationToken: varchar("verification_token", { length: 255 }),
//     verificationTokenExpiresAt: timestamp("verification_token_expires_at"),
//   },
//   (table) => ({
//     userTypeCheck: check(
//       "user_type_check",
//       `user_type IN ('customer', 'admin', 'support')`,
//     ),
//     phoneIdx: index("idx_users_phone").on(table.phoneNumber),
//     emailIdx: index("idx_users_email").on(table.email),
//     typeIdx: index("idx_users_type").on(table.userType),
//     activeIdx: index("idx_users_active").on(table.isActive),
//   }),
// );

// export const usersRelations = relations(users, ({ many, one }) => ({
//   addresses: many(userAddresses),
//   preferences: one(userPreferences),
//   serviceRequests: many(serviceRequests),
//   paymentMethods: many(paymentMethods),
//   wallet: one(wallet),
//   ratings: many(ratings),
//   supportTickets: many(supportTickets),
//   disputes: many(disputes),
// }));

// // ============================================================================
// // 2. USER ADDRESSES [TODO]
// // ============================================================================

// export const userAddresses = pgTable(
//   "user_addresses",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     addressType: varchar("address_type", { length: 20 }), // 'home', 'work', 'other'
//     streetAddress: varchar("street_address", { length: 255 }).notNull(),
//     city: varchar("city", { length: 100 }).notNull(),
//     postalCode: varchar("postal_code", { length: 20 }),
//     latitude: decimal("latitude", { precision: 10, scale: 8 }),
//     longitude: decimal("longitude", { precision: 11, scale: 8 }),
//     isDefault: boolean("is_default").default(false),
//     isDeleted: boolean("is_deleted").default(false),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "user_addresses_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     addressTypeCheck: check(
//       "address_type_check",
//       `address_type IN ('home', 'work', 'other')`,
//     ),
//     userIdx: index("idx_user_addresses_user").on(table.userId),
//     defaultUniqueIdx: uniqueIndex("idx_user_addresses_default")
//       .on(table.userId, table.addressType)
//       .where(table.isDeleted.eq(false)),
//   }),
// );

// export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
//   user: one(users, {
//     fields: [userAddresses.userId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 3. USER PREFERENCES
// // ============================================================================

// export const userPreferences = pgTable(
//   "user_preferences",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).unique().notNull(),
//     language: varchar("language", { length: 10 }).default("fr"),
//     notificationEnabled: boolean("notification_enabled").default(true),
//     smsNotifications: boolean("sms_notifications").default(true),
//     pushNotifications: boolean("push_notifications").default(true),
//     preferredServiceCategories: text("preferred_service_categories").array(),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "user_preferences_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//   }),
// );

// export const userPreferencesRelations = relations(
//   userPreferences,
//   ({ one }) => ({
//     user: one(users, {
//       fields: [userPreferences.userId],
//       references: [users.id],
//     }),
//   }),
// );

// // ============================================================================
// // 4. PROVIDERS - Service Provider Management
// // ============================================================================

// export const providers = pgTable(
//   "providers",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     companyName: varchar("company_name", { length: 255 }).notNull(),
//     ownerPhone: varchar("owner_phone", { length: 20 }).notNull(),
//     ownerEmail: varchar("owner_email", { length: 255 }),
//     registrationNumber: varchar("registration_number", { length: 50 }).unique(),
//     taxId: varchar("tax_id", { length: 50 }),
//     countryCode: varchar("country_code", { length: 5 }).default("TG"),
//     isActive: boolean("is_active").default(true),
//     isVerified: boolean("is_verified").default(false),
//     verificationDate: timestamp("verification_date"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//     bankAccountName: varchar("bank_account_name", { length: 255 }),
//     bankAccountNumber: varchar("bank_account_number", { length: 50 }),
//     bankName: varchar("bank_name", { length: 100 }),
//     swiftCode: varchar("swift_code", { length: 20 }),
//     mobileMoneyNumber: varchar("mobile_money_number", { length: 20 }),
//     mobileMoneyProvider: varchar("mobile_money_provider", { length: 50 }),
//   },
//   (table) => ({
//     activeIdx: index("idx_providers_active").on(table.isActive),
//     verifiedIdx: index("idx_providers_verified").on(table.isVerified),
//     companyIdx: index("idx_providers_company").on(table.companyName),
//   }),
// );

// export const providersRelations = relations(providers, ({ many, one }) => ({
//   addresses: many(providerAddresses),
//   contacts: many(providerContacts),
//   services: many(providerServices),
//   availability: many(providerAvailability),
//   quotes: many(quotes),
//   assignments: many(serviceAssignments),
//   ratings: many(ratings),
//   metrics: one(providerMetrics),
//   payouts: many(providerPayouts),
//   complianceDocuments: many(complianceDocuments),
// }));

// // ============================================================================
// // 5. PROVIDER ADDRESSES [TODO]
// // ============================================================================

// export const providerAddresses = pgTable(
//   "provider_addresses",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     streetAddress: varchar("street_address", { length: 255 }).notNull(),
//     city: varchar("city", { length: 100 }).notNull(),
//     postalCode: varchar("postal_code", { length: 20 }),
//     latitude: decimal("latitude", { precision: 10, scale: 8 }),
//     longitude: decimal("longitude", { precision: 11, scale: 8 }),
//     isPrimary: boolean("is_primary").default(false),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_addresses_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     providerIdx: index("idx_provider_addresses_provider").on(table.providerId),
//   }),
// );

// export const providerAddressesRelations = relations(
//   providerAddresses,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerAddresses.providerId],
//       references: [providers.id],
//     }),
//   }),
// );

// // ============================================================================
// // 6. PROVIDER CONTACTS [TODO]
// // ============================================================================

// export const providerContacts = pgTable(
//   "provider_contacts",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     contactName: varchar("contact_name", { length: 100 }).notNull(),
//     phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
//     email: varchar("email", { length: 255 }),
//     role: varchar("role", { length: 50 }),
//     isPrimary: boolean("is_primary").default(false),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_contacts_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     providerIdx: index("idx_provider_contacts_provider").on(table.providerId),
//   }),
// );

// export const providerContactsRelations = relations(
//   providerContacts,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerContacts.providerId],
//       references: [providers.id],
//     }),
//   }),
// );

// // ============================================================================
// // 7. SERVICE CATEGORIES
// // ============================================================================

// export const serviceCategories = pgTable(
//   "service_categories",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     name: varchar("name", { length: 100 }).unique().notNull(),
//     slug: varchar("slug", { length: 100 }).unique().notNull(),
//     description: text("description"),
//     iconUrl: text("icon_url"),
//     parentCategoryId: bigserial("parent_category_id", { mode: "bigint" }),
//     displayOrder: integer("display_order").default(0),
//     isActive: boolean("is_active").default(true),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     parentFk: foreignKey({
//       columns: [table.parentCategoryId],
//       name: "service_categories_parent_id_fk",
//     }).references(() => serviceCategories.id, { onDelete: "set null" }),
//     activeIdx: index("idx_service_categories_active").on(table.isActive),
//     slugIdx: index("idx_service_categories_slug").on(table.slug),
//   }),
// );

// export const serviceCategoriesRelations = relations(
//   serviceCategories,
//   ({ many, one }) => ({
//     serviceTypes: many(serviceTypes),
//     parentCategory: one(serviceCategories, {
//       fields: [serviceCategories.parentCategoryId],
//       references: [serviceCategories.id],
//       relationName: "parent",
//     }),
//     childCategories: many(serviceCategories, {
//       relationName: "parent",
//     }),
//   }),
// );

// // ============================================================================
// // 8. SERVICE TYPES
// // ============================================================================

// export const serviceTypes = pgTable(
//   "service_types",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     categoryId: bigserial("category_id", { mode: "bigint" }).notNull(),
//     name: varchar("name", { length: 150 }).notNull(),
//     description: text("description"),
//     basePrice: decimal("base_price", { precision: 12, scale: 2 }),
//     priceUnit: varchar("price_unit", { length: 20 }), // 'per_hour', 'per_day', 'per_project', 'fixed'
//     estimatedDurationMinutes: integer("estimated_duration_minutes"),
//     requiresSiteVisit: boolean("requires_site_visit").default(true),
//     isActive: boolean("is_active").default(true),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     categoryFk: foreignKey({
//       columns: [table.categoryId],
//       name: "service_types_category_id_fk",
//     }).references(() => serviceCategories.id, { onDelete: "cascade" }),
//     priceUnitCheck: check(
//       "price_unit_check",
//       `price_unit IN ('per_hour', 'per_day', 'per_project', 'fixed')`,
//     ),
//     categoryIdx: index("idx_service_types_category").on(table.categoryId),
//     activeIdx: index("idx_service_types_active").on(table.isActive),
//     categoryNameUnique: uniqueIndex("service_types_category_name_unique").on(
//       table.categoryId,
//       table.name,
//     ),
//   }),
// );

// export const serviceTypesRelations = relations(
//   serviceTypes,
//   ({ many, one }) => ({
//     category: one(serviceCategories, {
//       fields: [serviceTypes.categoryId],
//       references: [serviceCategories.id],
//     }),
//     providerServices: many(providerServices),
//     serviceRequests: many(serviceRequests),
//     quotes: many(quotes),
//   }),
// );

// // ============================================================================
// // 9. PROVIDER SERVICES
// // ============================================================================

// export const providerServices = pgTable(
//   "provider_services",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     serviceTypeId: bigserial("service_type_id", { mode: "bigint" }).notNull(),
//     customPrice: decimal("custom_price", { precision: 12, scale: 2 }),
//     availabilityStatus: varchar("availability_status", { length: 20 }).default(
//       "available",
//     ),
//     responseTimeHours: smallint("response_time_hours").default(24),
//     yearsOfExperience: integer("years_of_experience"),
//     certifications: text("certifications"),
//     equipmentOwned: text("equipment_owned").array(),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_services_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     serviceTypeFk: foreignKey({
//       columns: [table.serviceTypeId],
//       name: "provider_services_service_type_id_fk",
//     }).references(() => serviceTypes.id, { onDelete: "restrict" }),
//     availabilityCheck: check(
//       "availability_status_check",
//       `availability_status IN ('available', 'busy', 'unavailable')`,
//     ),
//     providerServiceUnique: uniqueIndex("provider_services_unique").on(
//       table.providerId,
//       table.serviceTypeId,
//     ),
//     providerIdx: index("idx_provider_services_provider").on(table.providerId),
//     serviceIdx: index("idx_provider_services_service").on(table.serviceTypeId),
//     availabilityIdx: index("idx_provider_services_availability").on(
//       table.serviceTypeId,
//       table.availabilityStatus,
//     ),
//   }),
// );

// export const providerServicesRelations = relations(
//   providerServices,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerServices.providerId],
//       references: [providers.id],
//     }),
//     serviceType: one(serviceTypes, {
//       fields: [providerServices.serviceTypeId],
//       references: [serviceTypes.id],
//     }),
//   }),
// );

// // ============================================================================
// // 10. PROVIDER AVAILABILITY
// // ============================================================================

// export const providerAvailability = pgTable(
//   "provider_availability",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     dayOfWeek: smallint("day_of_week"), // 0=Sunday, 6=Saturday
//     startTime: time("start_time").notNull(),
//     endTime: time("end_time").notNull(),
//     isAvailable: boolean("is_available").default(true),
//     breakStart: time("break_start"),
//     breakEnd: time("break_end"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_availability_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     dayOfWeekCheck: check("day_of_week_check", `day_of_week BETWEEN 0 AND 6`),
//     providerDayUnique: uniqueIndex("provider_availability_unique").on(
//       table.providerId,
//       table.dayOfWeek,
//     ),
//     providerIdx: index("idx_provider_availability_provider").on(
//       table.providerId,
//     ),
//   }),
// );

// export const providerAvailabilityRelations = relations(
//   providerAvailability,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerAvailability.providerId],
//       references: [providers.id],
//     }),
//   }),
// );

// // ============================================================================
// // 11. SERVICE REQUESTS
// // ============================================================================

// export const serviceRequests = pgTable(
//   "service_requests",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     serviceTypeId: bigserial("service_type_id", { mode: "bigint" }).notNull(),
//     title: varchar("title", { length: 255 }).notNull(),
//     description: text("description").notNull(),
//     locationLatitude: decimal("location_latitude", {
//       precision: 10,
//       scale: 8,
//     }).notNull(),
//     locationLongitude: decimal("location_longitude", {
//       precision: 11,
//       scale: 8,
//     }).notNull(),
//     locationAddress: varchar("location_address", { length: 500 }),
//     preferredDate: date("preferred_date"),
//     preferredTimeStart: time("preferred_time_start"),
//     preferredTimeEnd: time("preferred_time_end"),
//     urgencyLevel: varchar("urgency_level", { length: 20 }).default("normal"),
//     estimatedBudget: decimal("estimated_budget", { precision: 12, scale: 2 }),
//     attachments: text("attachments").array(),
//     status: varchar("status", { length: 30 }).default("pending"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//     completedAt: timestamp("completed_at"),
//     cancelledAt: timestamp("cancelled_at"),
//     cancellationReason: varchar("cancellation_reason", { length: 255 }),
//     createdCountryCode: varchar("created_country_code", { length: 5 }).default(
//       "TG",
//     ),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "service_requests_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     serviceTypeFk: foreignKey({
//       columns: [table.serviceTypeId],
//       name: "service_requests_service_type_id_fk",
//     }).references(() => serviceTypes.id),
//     urgencyCheck: check(
//       "urgency_level_check",
//       `urgency_level IN ('low', 'normal', 'high', 'emergency')`,
//     ),
//     statusCheck: check(
//       "status_check",
//       `status IN ('pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled', 'disputed')`,
//     ),
//     userIdx: index("idx_service_requests_user").on(table.userId),
//     statusIdx: index("idx_service_requests_status").on(table.status),
//     serviceIdx: index("idx_service_requests_service").on(table.serviceTypeId),
//     createdIdx: index("idx_service_requests_created").on(
//       table.createdAt.desc(),
//     ),
//     statusCreatedIdx: index("idx_service_requests_status_created").on(
//       table.status,
//       table.createdAt.desc(),
//     ),
//   }),
// );

// export const serviceRequestsRelations = relations(
//   serviceRequests,
//   ({ many, one }) => ({
//     user: one(users, {
//       fields: [serviceRequests.userId],
//       references: [users.id],
//     }),
//     serviceType: one(serviceTypes, {
//       fields: [serviceRequests.serviceTypeId],
//       references: [serviceTypes.id],
//     }),
//     quotes: many(quotes),
//     assignments: many(serviceAssignments),
//     transactions: many(transactions),
//     ratings: many(ratings),
//     supportTickets: many(supportTickets),
//     disputes: many(disputes),
//   }),
// );

// // ============================================================================
// // 12. QUOTES [TODO]
// // ============================================================================

// export const quotes = pgTable(
//   "quotes",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     serviceRequestId: bigserial("service_request_id", {
//       mode: "bigint",
//     }).notNull(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     quotedPrice: decimal("quoted_price", { precision: 12, scale: 2 }).notNull(),
//     breakdownItems: jsonb("breakdown_items"),
//     estimatedDurationDays: integer("estimated_duration_days"),
//     validityPeriodDays: integer("validity_period_days").default(7),
//     notes: text("notes"),
//     status: varchar("status", { length: 20 }).default("pending"),
//     acceptanceDeadline: timestamp("acceptance_deadline"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//     acceptedAt: timestamp("accepted_at"),
//   },
//   (table) => ({
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "quotes_service_request_id_fk",
//     }).references(() => serviceRequests.id, { onDelete: "cascade" }),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "quotes_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     statusCheck: check(
//       "quote_status_check",
//       `status IN ('pending', 'accepted', 'rejected', 'expired')`,
//     ),
//     requestIdx: index("idx_quotes_request").on(table.serviceRequestId),
//     providerIdx: index("idx_quotes_provider").on(table.providerId),
//     statusIdx: index("idx_quotes_status").on(table.status),
//     createdIdx: index("idx_quotes_created").on(table.createdAt.desc()),
//   }),
// );

// export const quotesRelations = relations(quotes, ({ one, many }) => ({
//   serviceRequest: one(serviceRequests, {
//     fields: [quotes.serviceRequestId],
//     references: [serviceRequests.id],
//   }),
//   provider: one(providers, {
//     fields: [quotes.providerId],
//     references: [providers.id],
//   }),
//   assignments: many(serviceAssignments),
// }));

// // ============================================================================
// // 13. SERVICE ASSIGNMENTS
// // ============================================================================

// export const serviceAssignments = pgTable(
//   "service_assignments",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     serviceRequestId: bigserial("service_request_id", {
//       mode: "bigint",
//     }).notNull(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     quoteId: bigserial("quote_id", { mode: "bigint" }),
//     assignedDate: timestamp("assigned_date").defaultNow().notNull(),
//     scheduledStart: timestamp("scheduled_start"),
//     scheduledEnd: timestamp("scheduled_end"),
//     actualStart: timestamp("actual_start"),
//     actualEnd: timestamp("actual_end"),
//     status: varchar("status", { length: 30 }).default("assigned"),
//     cancellationReason: varchar("cancellation_reason", { length: 255 }),
//     notes: text("notes"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "service_assignments_request_id_fk",
//     }).references(() => serviceRequests.id, { onDelete: "cascade" }),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "service_assignments_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     quoteFk: foreignKey({
//       columns: [table.quoteId],
//       name: "service_assignments_quote_id_fk",
//     }).references(() => quotes.id),
//     statusCheck: check(
//       "assignment_status_check",
//       `status IN ('assigned', 'in_progress', 'on_hold', 'completed', 'cancelled')`,
//     ),
//     requestIdx: index("idx_service_assignments_request").on(
//       table.serviceRequestId,
//     ),
//     providerIdx: index("idx_service_assignments_provider").on(table.providerId),
//     statusIdx: index("idx_service_assignments_status").on(table.status),
//     requestUnique: uniqueIndex("service_assignments_request_unique").on(
//       table.serviceRequestId,
//     ),
//   }),
// );

// export const serviceAssignmentsRelations = relations(
//   serviceAssignments,
//   ({ one, many }) => ({
//     serviceRequest: one(serviceRequests, {
//       fields: [serviceAssignments.serviceRequestId],
//       references: [serviceRequests.id],
//     }),
//     provider: one(providers, {
//       fields: [serviceAssignments.providerId],
//       references: [providers.id],
//     }),
//     quote: one(quotes, {
//       fields: [serviceAssignments.quoteId],
//       references: [quotes.id],
//     }),
//     transactions: many(transactions),
//   }),
// );

// // ============================================================================
// // 14. PAYMENT METHODS
// // ============================================================================

// export const paymentMethods = pgTable(
//   "payment_methods",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     paymentType: varchar("payment_type", { length: 30 }).notNull(),
//     isPrimary: boolean("is_primary").default(false),
//     mobileMoneyProvider: varchar("mobile_money_provider", { length: 50 }),
//     mobileMoneyNumber: varchar("mobile_money_number", { length: 20 }),
//     mobileMoneyAccountName: varchar("mobile_money_account_name", {
//       length: 100,
//     }),
//     bankAccountNumber: varchar("bank_account_number", { length: 50 }),
//     bankName: varchar("bank_name", { length: 100 }),
//     accountHolderName: varchar("account_holder_name", { length: 100 }),
//     swiftCode: varchar("swift_code", { length: 20 }),
//     cardLastFour: varchar("card_last_four", { length: 4 }),
//     cardBrand: varchar("card_brand", { length: 20 }),
//     cardExpiryMonth: smallint("card_expiry_month"),
//     cardExpiryYear: smallint("card_expiry_year"),
//     isVerified: boolean("is_verified").default(false),
//     verificationToken: varchar("verification_token", { length: 255 }),
//     verificationTokenExpiresAt: timestamp("verification_token_expires_at"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//     deletedAt: timestamp("deleted_at"),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "payment_methods_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     paymentTypeCheck: check(
//       "payment_type_check",
//       `payment_type IN ('mobile_money', 'cash', 'bank_transfer', 'card')`,
//     ),
//     userIdx: index("idx_payment_methods_user").on(table.userId),
//     typeIdx: index("idx_payment_methods_type").on(table.paymentType),
//   }),
// );

// export const paymentMethodsRelations = relations(
//   paymentMethods,
//   ({ one, many }) => ({
//     user: one(users, {
//       fields: [paymentMethods.userId],
//       references: [users.id],
//     }),
//     transactions: many(transactions),
//   }),
// );

// // ============================================================================
// // 15. TRANSACTIONS
// // ============================================================================

// export const transactions = pgTable(
//   "transactions",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     serviceRequestId: bigserial("service_request_id", {
//       mode: "bigint",
//     }).notNull(),
//     serviceAssignmentId: bigserial("service_assignment_id", { mode: "bigint" }),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     paymentMethodId: bigserial("payment_method_id", { mode: "bigint" }),
//     transactionType: varchar("transaction_type", { length: 20 }).notNull(),
//     amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
//     currency: varchar("currency", { length: 3 }).default("XOF"),
//     transactionStatus: varchar("transaction_status", { length: 30 }).default(
//       "pending",
//     ),
//     mobileMoneyReference: varchar("mobile_money_reference", { length: 100 }),
//     mobileMoneyProvider: varchar("mobile_money_provider", { length: 50 }),
//     mobileMoneyDestination: varchar("mobile_money_destination", { length: 20 }),
//     cashCollectedBy: varchar("cash_collected_by", { length: 100 }),
//     cashCollectionLocation: varchar("cash_collection_location", {
//       length: 255,
//     }),
//     description: text("description"),
//     failureReason: varchar("failure_reason", { length: 255 }),
//     notes: text("notes"),
//     ipAddress: varchar("ip_address", { length: 45 }),
//     deviceInfo: varchar("device_info", { length: 500 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     completedAt: timestamp("completed_at"),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "transactions_service_request_id_fk",
//     }).references(() => serviceRequests.id),
//     assignmentFk: foreignKey({
//       columns: [table.serviceAssignmentId],
//       name: "transactions_assignment_id_fk",
//     }).references(() => serviceAssignments.id),
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "transactions_user_id_fk",
//     }).references(() => users.id),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "transactions_provider_id_fk",
//     }).references(() => providers.id),
//     paymentMethodFk: foreignKey({
//       columns: [table.paymentMethodId],
//       name: "transactions_payment_method_id_fk",
//     }).references(() => paymentMethods.id),
//     transactionTypeCheck: check(
//       "transaction_type_check",
//       `transaction_type IN ('deposit', 'service_payment', 'provider_payout', 'refund', 'platform_fee')`,
//     ),
//     statusCheck: check(
//       "transaction_status_check",
//       `transaction_status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')`,
//     ),
//     userIdx: index("idx_transactions_user").on(table.userId),
//     providerIdx: index("idx_transactions_provider").on(table.providerId),
//     statusIdx: index("idx_transactions_status").on(table.transactionStatus),
//     typeIdx: index("idx_transactions_type").on(table.transactionType),
//     createdIdx: index("idx_transactions_created").on(table.createdAt.desc()),
//     requestIdx: index("idx_transactions_request").on(table.serviceRequestId),
//     completionIdx: index("idx_transactions_completion")
//       .on(table.userId, table.createdAt.desc())
//       .where(table.transactionStatus.eq("completed")),
//   }),
// );

// export const transactionsRelations = relations(
//   transactions,
//   ({ one, many }) => ({
//     serviceRequest: one(serviceRequests, {
//       fields: [transactions.serviceRequestId],
//       references: [serviceRequests.id],
//     }),
//     serviceAssignment: one(serviceAssignments, {
//       fields: [transactions.serviceAssignmentId],
//       references: [serviceAssignments.id],
//     }),
//     user: one(users, {
//       fields: [transactions.userId],
//       references: [users.id],
//     }),
//     provider: one(providers, {
//       fields: [transactions.providerId],
//       references: [providers.id],
//     }),
//     paymentMethod: one(paymentMethods, {
//       fields: [transactions.paymentMethodId],
//       references: [paymentMethods.id],
//     }),
//     fees: many(transactionFees),
//     mobileMoneyTransaction: one(mobileMoneyTransactions),
//   }),
// );

// // ============================================================================
// // 16. TRANSACTION FEES [TODO]
// // ============================================================================

// export const transactionFees = pgTable(
//   "transaction_fees",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     transactionId: bigserial("transaction_id", { mode: "bigint" }).notNull(),
//     feeType: varchar("fee_type", { length: 50 }),
//     feeAmount: decimal("fee_amount", { precision: 12, scale: 2 }).notNull(),
//     feePercentage: decimal("fee_percentage", { precision: 5, scale: 2 }),
//     description: varchar("description", { length: 255 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     transactionFk: foreignKey({
//       columns: [table.transactionId],
//       name: "transaction_fees_transaction_id_fk",
//     }).references(() => transactions.id, { onDelete: "cascade" }),
//     feeTypeCheck: check(
//       "fee_type_check",
//       `fee_type IN ('platform_fee', 'processing_fee', 'conversion_fee', 'other')`,
//     ),
//     transactionIdx: index("idx_transaction_fees_transaction").on(
//       table.transactionId,
//     ),
//   }),
// );

// export const transactionFeesRelations = relations(
//   transactionFees,
//   ({ one }) => ({
//     transaction: one(transactions, {
//       fields: [transactionFees.transactionId],
//       references: [transactions.id],
//     }),
//   }),
// );

// // ============================================================================
// // 17. WALLET [TODO]
// // ============================================================================

// export const wallet = pgTable(
//   "wallet",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).unique().notNull(),
//     balance: decimal("balance", { precision: 14, scale: 2 }).default("0"),
//     reservedAmount: decimal("reserved_amount", {
//       precision: 14,
//       scale: 2,
//     }).default("0"),
//     currency: varchar("currency", { length: 3 }).default("XOF"),
//     lastTransactionAt: timestamp("last_transaction_at"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "wallet_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     userIdx: index("idx_wallet_user").on(table.userId),
//   }),
// );

// export const walletRelations = relations(wallet, ({ one, many }) => ({
//   user: one(users, {
//     fields: [wallet.userId],
//     references: [users.id],
//   }),
//   transactions: many(walletTransactions),
// }));

// // ============================================================================
// // 18. WALLET TRANSACTIONS [TODO]
// // ============================================================================

// export const walletTransactions = pgTable(
//   "wallet_transactions",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     walletId: bigserial("wallet_id", { mode: "bigint" }).notNull(),
//     transactionId: bigserial("transaction_id", { mode: "bigint" }),
//     operationType: varchar("operation_type", { length: 20 }),
//     amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
//     balanceBefore: decimal("balance_before", {
//       precision: 14,
//       scale: 2,
//     }).notNull(),
//     balanceAfter: decimal("balance_after", {
//       precision: 14,
//       scale: 2,
//     }).notNull(),
//     description: varchar("description", { length: 255 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     walletFk: foreignKey({
//       columns: [table.walletId],
//       name: "wallet_transactions_wallet_id_fk",
//     }).references(() => wallet.id, { onDelete: "cascade" }),
//     transactionFk: foreignKey({
//       columns: [table.transactionId],
//       name: "wallet_transactions_txn_id_fk",
//     }).references(() => transactions.id),
//     operationTypeCheck: check(
//       "operation_type_check",
//       `operation_type IN ('credit', 'debit')`,
//     ),
//     walletIdx: index("idx_wallet_transactions_wallet").on(table.walletId),
//     createdIdx: index("idx_wallet_transactions_created").on(
//       table.createdAt.desc(),
//     ),
//   }),
// );

// export const walletTransactionsRelations = relations(
//   walletTransactions,
//   ({ one }) => ({
//     wallet: one(wallet, {
//       fields: [walletTransactions.walletId],
//       references: [wallet.id],
//     }),
//     transaction: one(transactions, {
//       fields: [walletTransactions.transactionId],
//       references: [transactions.id],
//     }),
//   }),
// );

// // ============================================================================
// // 19. RATINGS
// // ============================================================================

// export const ratings = pgTable(
//   "ratings",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     serviceRequestId: bigserial("service_request_id", {
//       mode: "bigint",
//     }).notNull(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     raterId: bigserial("rater_id", { mode: "bigint" }).notNull(),
//     ratingScore: decimal("rating_score", { precision: 2, scale: 1 }).notNull(),
//     qualityScore: decimal("quality_score", { precision: 2, scale: 1 }),
//     timelinessScore: decimal("timeliness_score", { precision: 2, scale: 1 }),
//     communicationScore: decimal("communication_score", {
//       precision: 2,
//       scale: 1,
//     }),
//     reviewTitle: varchar("review_title", { length: 200 }),
//     reviewText: text("review_text"),
//     attachments: text("attachments").array(),
//     isVerifiedService: boolean("is_verified_service").default(true),
//     helpfulCount: integer("helpful_count").default(0),
//     unhelpfulCount: integer("unhelpful_count").default(0),
//     status: varchar("status", { length: 20 }).default("published"),
//     moderationNotes: varchar("moderation_notes", { length: 500 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "ratings_service_request_id_fk",
//     }).references(() => serviceRequests.id, { onDelete: "cascade" }),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "ratings_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     raterFk: foreignKey({
//       columns: [table.raterId],
//       name: "ratings_rater_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     ratingScoreCheck: check(
//       "rating_score_check",
//       `rating_score BETWEEN 1 AND 5`,
//     ),
//     statusCheck: check(
//       "rating_status_check",
//       `status IN ('pending_review', 'published', 'hidden', 'flagged')`,
//     ),
//     providerIdx: index("idx_ratings_provider").on(table.providerId),
//     scoreIdx: index("idx_ratings_score").on(table.ratingScore.desc()),
//     statusIdx: index("idx_ratings_status").on(table.status),
//     requestIdx: index("idx_ratings_request").on(table.serviceRequestId),
//     providerPublishedIdx: index("idx_ratings_provider_published")
//       .on(table.providerId, table.ratingScore)
//       .where(table.status.eq("published")),
//   }),
// );

// export const ratingsRelations = relations(ratings, ({ one }) => ({
//   serviceRequest: one(serviceRequests, {
//     fields: [ratings.serviceRequestId],
//     references: [serviceRequests.id],
//   }),
//   provider: one(providers, {
//     fields: [ratings.providerId],
//     references: [providers.id],
//   }),
//   rater: one(users, {
//     fields: [ratings.raterId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 20. PROVIDER METRICS
// // ============================================================================

// export const providerMetrics = pgTable(
//   "provider_metrics",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).unique().notNull(),
//     totalCompletedServices: integer("total_completed_services").default(0),
//     averageRating: decimal("average_rating", {
//       precision: 3,
//       scale: 2,
//     }).default("0"),
//     totalRatingsCount: integer("total_ratings_count").default(0),
//     responseTimeAverageHours: decimal("response_time_average_hours", {
//       precision: 8,
//       scale: 2,
//     }).default("0"),
//     completionRatePercentage: decimal("completion_rate_percentage", {
//       precision: 5,
//       scale: 2,
//     }).default("100"),
//     cancellationRatePercentage: decimal("cancellation_rate_percentage", {
//       precision: 5,
//       scale: 2,
//     }).default("0"),
//     customerSatisfactionPercentage: decimal(
//       "customer_satisfaction_percentage",
//       { precision: 5, scale: 2 },
//     ).default("100"),
//     onTimeCompletionPercentage: decimal("on_time_completion_percentage", {
//       precision: 5,
//       scale: 2,
//     }).default("100"),
//     last30DaysServices: integer("last_30_days_services").default(0),
//     last30DaysRatingAverage: decimal("last_30_days_rating_average", {
//       precision: 3,
//       scale: 2,
//     }).default("0"),
//     riskScore: decimal("risk_score", { precision: 3, scale: 2 }).default("0"),
//     trustworthinessScore: decimal("trustworthiness_score", {
//       precision: 3,
//       scale: 2,
//     }).default("100"),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_metrics_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     trustworthinessIdx: index("idx_provider_metrics_trustworthiness").on(
//       table.trustworthinessScore.desc(),
//     ),
//   }),
// );

// export const providerMetricsRelations = relations(
//   providerMetrics,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerMetrics.providerId],
//       references: [providers.id],
//     }),
//   }),
// );

// // ============================================================================
// // 21. SUPPORT TICKETS [TODO]
// // ============================================================================

// export const supportTickets = pgTable(
//   "support_tickets",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     serviceRequestId: bigserial("service_request_id", { mode: "bigint" }),
//     ticketType: varchar("ticket_type", { length: 30 }),
//     subject: varchar("subject", { length: 255 }).notNull(),
//     description: text("description").notNull(),
//     attachments: text("attachments").array(),
//     priority: varchar("priority", { length: 20 }).default("medium"),
//     status: varchar("status", { length: 30 }).default("open"),
//     assignedToAdminId: bigserial("assigned_to_admin_id", { mode: "bigint" }),
//     resolutionNotes: text("resolution_notes"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     resolvedAt: timestamp("resolved_at"),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "support_tickets_user_id_fk",
//     }).references(() => users.id),
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "support_tickets_request_id_fk",
//     }).references(() => serviceRequests.id),
//     adminFk: foreignKey({
//       columns: [table.assignedToAdminId],
//       name: "support_tickets_admin_id_fk",
//     }).references(() => users.id),
//     ticketTypeCheck: check(
//       "ticket_type_check",
//       `ticket_type IN ('payment_issue', 'service_quality', 'provider_issue', 'app_bug', 'other')`,
//     ),
//     priorityCheck: check(
//       "priority_check",
//       `priority IN ('low', 'medium', 'high', 'critical')`,
//     ),
//     statusCheck: check(
//       "support_status_check",
//       `status IN ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')`,
//     ),
//     userIdx: index("idx_support_tickets_user").on(table.userId),
//     statusIdx: index("idx_support_tickets_status").on(table.status),
//     createdIdx: index("idx_support_tickets_created").on(table.createdAt.desc()),
//   }),
// );

// export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
//   user: one(users, {
//     fields: [supportTickets.userId],
//     references: [users.id],
//   }),
//   serviceRequest: one(serviceRequests, {
//     fields: [supportTickets.serviceRequestId],
//     references: [serviceRequests.id],
//   }),
//   assignedAdmin: one(users, {
//     fields: [supportTickets.assignedToAdminId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 22. DISPUTES [TODO]
// // ============================================================================

// export const disputes = pgTable(
//   "disputes",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     serviceRequestId: bigserial("service_request_id", {
//       mode: "bigint",
//     }).notNull(),
//     serviceAssignmentId: bigserial("service_assignment_id", { mode: "bigint" }),
//     initiatedByUserId: bigserial("initiated_by_user_id", {
//       mode: "bigint",
//     }).notNull(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     disputeReason: varchar("dispute_reason", { length: 50 }),
//     disputeDescription: text("dispute_description").notNull(),
//     attachments: text("attachments").array(),
//     amountInDispute: decimal("amount_in_dispute", { precision: 12, scale: 2 }),
//     status: varchar("status", { length: 30 }).default("open"),
//     resolutionType: varchar("resolution_type", { length: 30 }),
//     resolutionAmount: decimal("resolution_amount", { precision: 12, scale: 2 }),
//     assignedToAdminId: bigserial("assigned_to_admin_id", { mode: "bigint" }),
//     resolutionNotes: text("resolution_notes"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     resolvedAt: timestamp("resolved_at"),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "disputes_request_id_fk",
//     }).references(() => serviceRequests.id, { onDelete: "cascade" }),
//     assignmentFk: foreignKey({
//       columns: [table.serviceAssignmentId],
//       name: "disputes_assignment_id_fk",
//     }).references(() => serviceAssignments.id),
//     userFk: foreignKey({
//       columns: [table.initiatedByUserId],
//       name: "disputes_user_id_fk",
//     }).references(() => users.id),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "disputes_provider_id_fk",
//     }).references(() => providers.id),
//     adminFk: foreignKey({
//       columns: [table.assignedToAdminId],
//       name: "disputes_admin_id_fk",
//     }).references(() => users.id),
//     reasonCheck: check(
//       "dispute_reason_check",
//       `dispute_reason IN ('service_not_completed', 'poor_quality', 'price_discrepancy', 'incorrect_service', 'no_show', 'other')`,
//     ),
//     statusCheck: check(
//       "dispute_status_check",
//       `status IN ('open', 'under_investigation', 'mediation', 'resolved', 'escalated')`,
//     ),
//     resolutionCheck: check(
//       "resolution_type_check",
//       `resolution_type IN ('refund_to_customer', 'proceed_as_planned', 'partial_refund', 'credits_issued')`,
//     ),
//     requestIdx: index("idx_disputes_request").on(table.serviceRequestId),
//     statusIdx: index("idx_disputes_status").on(table.status),
//   }),
// );

// export const disputesRelations = relations(disputes, ({ one }) => ({
//   serviceRequest: one(serviceRequests, {
//     fields: [disputes.serviceRequestId],
//     references: [serviceRequests.id],
//   }),
//   serviceAssignment: one(serviceAssignments, {
//     fields: [disputes.serviceAssignmentId],
//     references: [serviceAssignments.id],
//   }),
//   initiatedBy: one(users, {
//     fields: [disputes.initiatedByUserId],
//     references: [users.id],
//   }),
//   provider: one(providers, {
//     fields: [disputes.providerId],
//     references: [providers.id],
//   }),
//   assignedAdmin: one(users, {
//     fields: [disputes.assignedToAdminId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 23. PROVIDER PAYOUTS [TODO]
// // ============================================================================

// export const providerPayouts = pgTable(
//   "provider_payouts",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     payoutPeriodStart: date("payout_period_start").notNull(),
//     payoutPeriodEnd: date("payout_period_end").notNull(),
//     grossEarnings: decimal("gross_earnings", {
//       precision: 14,
//       scale: 2,
//     }).notNull(),
//     platformFees: decimal("platform_fees", { precision: 12, scale: 2 }).default(
//       "0",
//     ),
//     processingFees: decimal("processing_fees", {
//       precision: 12,
//       scale: 2,
//     }).default("0"),
//     netPayout: decimal("net_payout", { precision: 14, scale: 2 }).notNull(),
//     payoutMethod: varchar("payout_method", { length: 30 }),
//     payoutDestinationId: bigserial("payout_destination_id", { mode: "bigint" }),
//     payoutStatus: varchar("payout_status", { length: 30 }).default("pending"),
//     payoutReference: varchar("payout_reference", { length: 100 }),
//     payoutCompletedAt: timestamp("payout_completed_at"),
//     notes: text("notes"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "provider_payouts_provider_id_fk",
//     }).references(() => providers.id),
//     destinationFk: foreignKey({
//       columns: [table.payoutDestinationId],
//       name: "provider_payouts_destination_id_fk",
//     }).references(() => paymentMethods.id),
//     methodCheck: check(
//       "payout_method_check",
//       `payout_method IN ('bank_transfer', 'mobile_money', 'cash')`,
//     ),
//     statusCheck: check(
//       "payout_status_check",
//       `payout_status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')`,
//     ),
//     providerIdx: index("idx_provider_payouts_provider").on(table.providerId),
//     statusIdx: index("idx_provider_payouts_status").on(table.payoutStatus),
//     periodIdx: index("idx_provider_payouts_period").on(
//       table.payoutPeriodStart,
//       table.payoutPeriodEnd,
//     ),
//   }),
// );

// export const providerPayoutsRelations = relations(
//   providerPayouts,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [providerPayouts.providerId],
//       references: [providers.id],
//     }),
//     payoutDestination: one(paymentMethods, {
//       fields: [providerPayouts.payoutDestinationId],
//       references: [paymentMethods.id],
//     }),
//   }),
// );

// // ============================================================================
// // 24. AUDIT LOGS [TODO]
// // ============================================================================

// export const auditLogs = pgTable(
//   "audit_logs",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }),
//     entityType: varchar("entity_type", { length: 50 }).notNull(),
//     entityId: bigserial("entity_id", { mode: "bigint" }).notNull(),
//     action: varchar("action", { length: 50 }).notNull(),
//     oldValues: jsonb("old_values"),
//     newValues: jsonb("new_values"),
//     ipAddress: varchar("ip_address", { length: 45 }),
//     userAgent: varchar("user_agent", { length: 500 }),
//     status: varchar("status", { length: 20 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "audit_logs_user_id_fk",
//     }).references(() => users.id),
//     userIdx: index("idx_audit_logs_user").on(table.userId),
//     entityIdx: index("idx_audit_logs_entity").on(
//       table.entityType,
//       table.entityId,
//     ),
//     createdIdx: index("idx_audit_logs_created").on(table.createdAt.desc()),
//   }),
// );

// export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
//   user: one(users, {
//     fields: [auditLogs.userId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 25. COMPLIANCE DOCUMENTS [TODO]
// // ============================================================================

// export const complianceDocuments = pgTable(
//   "compliance_documents",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     providerId: bigserial("provider_id", { mode: "bigint" }).notNull(),
//     documentType: varchar("document_type", { length: 50 }),
//     documentUrl: text("document_url").notNull(),
//     documentHash: varchar("document_hash", { length: 255 }),
//     expiryDate: date("expiry_date"),
//     status: varchar("status", { length: 20 }).default("pending"),
//     uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
//     verifiedAt: timestamp("verified_at"),
//     verifiedByAdminId: bigserial("verified_by_admin_id", { mode: "bigint" }),
//     rejectionReason: varchar("rejection_reason", { length: 500 }),
//   },
//   (table) => ({
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "compliance_documents_provider_id_fk",
//     }).references(() => providers.id, { onDelete: "cascade" }),
//     adminFk: foreignKey({
//       columns: [table.verifiedByAdminId],
//       name: "compliance_documents_admin_id_fk",
//     }).references(() => users.id),
//     documentTypeCheck: check(
//       "document_type_check",
//       `document_type IN ('business_registration', 'tax_certificate', 'insurance', 'certification', 'license', 'other')`,
//     ),
//     statusCheck: check(
//       "compliance_status_check",
//       `status IN ('pending_review', 'approved', 'rejected', 'expired')`,
//     ),
//     providerIdx: index("idx_compliance_documents_provider").on(
//       table.providerId,
//     ),
//     statusIdx: index("idx_compliance_documents_status").on(table.status),
//   }),
// );

// export const complianceDocumentsRelations = relations(
//   complianceDocuments,
//   ({ one }) => ({
//     provider: one(providers, {
//       fields: [complianceDocuments.providerId],
//       references: [providers.id],
//     }),
//     verifiedAdmin: one(users, {
//       fields: [complianceDocuments.verifiedByAdminId],
//       references: [users.id],
//     }),
//   }),
// );

// // ============================================================================
// // 26. ANALYTICS EVENTS [TODO]
// // ============================================================================

// export const analyticsEvents = pgTable(
//   "analytics_events",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     eventType: varchar("event_type", { length: 50 }).notNull(),
//     userId: bigserial("user_id", { mode: "bigint" }),
//     providerId: bigserial("provider_id", { mode: "bigint" }),
//     serviceRequestId: bigserial("service_request_id", { mode: "bigint" }),
//     eventData: jsonb("event_data"),
//     appVersion: varchar("app_version", { length: 20 }),
//     deviceType: varchar("device_type", { length: 20 }),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "analytics_events_user_id_fk",
//     }).references(() => users.id),
//     providerFk: foreignKey({
//       columns: [table.providerId],
//       name: "analytics_events_provider_id_fk",
//     }).references(() => providers.id),
//     requestFk: foreignKey({
//       columns: [table.serviceRequestId],
//       name: "analytics_events_request_id_fk",
//     }).references(() => serviceRequests.id),
//     typeIdx: index("idx_analytics_events_type").on(table.eventType),
//     userIdx: index("idx_analytics_events_user").on(table.userId),
//     createdIdx: index("idx_analytics_events_created").on(
//       table.createdAt.desc(),
//     ),
//   }),
// );

// export const analyticsEventsRelations = relations(
//   analyticsEvents,
//   ({ one }) => ({
//     user: one(users, {
//       fields: [analyticsEvents.userId],
//       references: [users.id],
//     }),
//     provider: one(providers, {
//       fields: [analyticsEvents.providerId],
//       references: [providers.id],
//     }),
//     serviceRequest: one(serviceRequests, {
//       fields: [analyticsEvents.serviceRequestId],
//       references: [serviceRequests.id],
//     }),
//   }),
// );

// // ============================================================================
// // 27. NOTIFICATIONS
// // ============================================================================

// export const notifications = pgTable(
//   "notifications",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     userId: bigserial("user_id", { mode: "bigint" }).notNull(),
//     notificationType: varchar("notification_type", { length: 50 }),
//     title: varchar("title", { length: 255 }),
//     message: text("message"),
//     relatedEntityType: varchar("related_entity_type", { length: 50 }),
//     relatedEntityId: bigserial("related_entity_id", { mode: "bigint" }),
//     actionUrl: varchar("action_url", { length: 500 }),
//     isRead: boolean("is_read").default(false),
//     readAt: timestamp("read_at"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     userFk: foreignKey({
//       columns: [table.userId],
//       name: "notifications_user_id_fk",
//     }).references(() => users.id, { onDelete: "cascade" }),
//     userIdx: index("idx_notifications_user").on(table.userId),
//     readIdx: index("idx_notifications_read").on(table.isRead),
//     createdIdx: index("idx_notifications_created").on(table.createdAt.desc()),
//   }),
// );

// export const notificationsRelations = relations(notifications, ({ one }) => ({
//   user: one(users, {
//     fields: [notifications.userId],
//     references: [users.id],
//   }),
// }));

// // ============================================================================
// // 28. MOBILE MONEY TRANSACTIONS
// // ============================================================================

// export const mobileMoneyTransactions = pgTable(
//   "mobile_money_transactions",
//   {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     transactionId: bigserial("transaction_id", { mode: "bigint" }).notNull(),
//     providerCode: varchar("provider_code", { length: 20 }),
//     customerMsisdn: varchar("customer_msisdn", { length: 20 }),
//     merchantMsisdn: varchar("merchant_msisdn", { length: 20 }),
//     externalReferenceId: varchar("external_reference_id", {
//       length: 100,
//     }).unique(),
//     requestSentAt: timestamp("request_sent_at"),
//     callbackReceivedAt: timestamp("callback_received_at"),
//     callbackStatus: varchar("callback_status", { length: 20 }),
//     callbackPayload: jsonb("callback_payload"),
//     retryCount: integer("retry_count").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     transactionFk: foreignKey({
//       columns: [table.transactionId],
//       name: "mobile_money_transactions_txn_id_fk",
//     }).references(() => transactions.id),
//     transactionIdx: index("idx_mobile_money_transactions_transaction").on(
//       table.transactionId,
//     ),
//     referenceIdx: index("idx_mobile_money_transactions_reference").on(
//       table.externalReferenceId,
//     ),
//   }),
// );

// export const mobileMoneyTransactionsRelations = relations(
//   mobileMoneyTransactions,
//   ({ one }) => ({
//     transaction: one(transactions, {
//       fields: [mobileMoneyTransactions.transactionId],
//       references: [transactions.id],
//     }),
//   }),
// );

// // ============================================================================
// // EXPORT ALL SCHEMAS FOR DRIZZLE
// // ============================================================================

// export const schema = {
//   // Users
//   users,
//   userAddresses,
//   userPreferences,

//   // Providers
//   providers,
//   providerAddresses,
//   providerContacts,
//   providerServices,
//   providerAvailability,
//   providerMetrics,

//   // Services
//   serviceCategories,
//   serviceTypes,

//   // Service Requests & Quotes
//   serviceRequests,
//   quotes,
//   serviceAssignments,

//   // Payments
//   paymentMethods,
//   transactions,
//   transactionFees,
//   wallet,
//   walletTransactions,
//   providerPayouts,
//   mobileMoneyTransactions,

//   // Ratings & Reviews
//   ratings,

//   // Support & Disputes
//   supportTickets,
//   disputes,

//   // Admin & Compliance
//   auditLogs,
//   complianceDocuments,
//   analyticsEvents,
//   notifications,
// };
