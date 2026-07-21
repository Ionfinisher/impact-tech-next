import { defineRelations } from "drizzle-orm";
import {
  transaction,
  mobileMoneyTransaction,
  notification,
  user,
  serviceRequest,
  providerAvailability,
  provider,
  serviceType,
  serviceAssignment,
  rating,
  paymentMethod,
  providerMetric,
  userPreference,
  serviceCategory,
  service,
} from "./schema";

export const relations = defineRelations(
  {
    transaction,
    mobileMoneyTransaction,
    notification,
    user,
    serviceRequest,
    providerAvailability,
    provider,
    serviceType,
    serviceAssignment,
    rating,
    paymentMethod,
    providerMetric,
    userPreference,
    serviceCategory,
    service,
  },
  (r) => ({
    user: {
      preferences: r.one.userPreference({
        from: r.user.id,
        to: r.userPreference.userId,
      }),

      serviceRequests: r.many.serviceRequest({
        from: r.user.id,
        to: r.serviceRequest.userId,
      }),

      paymentMethods: r.many.paymentMethod({
        from: r.user.id,
        to: r.paymentMethod.userId,
      }),

      ratings: r.many.rating({
        from: r.user.id,
        to: r.rating.raterId,
      }),
    },

    userPreference: {
      user: r.one.user({
        from: r.userPreference.userId,
        to: r.user.id,
      }),
    },

    provider: {
      services: r.many.service({
        from: r.provider.id,
        to: r.service.providerId,
      }),

      availability: r.many.providerAvailability({
        from: r.provider.id,
        to: r.providerAvailability.providerId,
      }),

      assignments: r.many.serviceAssignment({
        from: r.provider.id,
        to: r.serviceAssignment.providerId,
      }),

      ratings: r.many.rating({
        from: r.provider.id,
        to: r.rating.providerId,
      }),

      metrics: r.one.providerMetric({
        from: r.provider.id,
        to: r.providerMetric.providerId,
      }),
    },

    serviceCategory: {
      serviceTypes: r.many.serviceType({
        from: r.serviceCategory.id,
        to: r.serviceType.categoryId,
      }),
    },

    serviceType: {
      category: r.one.serviceCategory({
        from: r.serviceType.categoryId,
        to: r.serviceCategory.id,
      }),

      providerServices: r.many.service({
        from: r.serviceType.id,
        to: r.service.serviceTypeId,
      }),

      serviceRequests: r.many.serviceRequest({
        from: r.serviceType.id,
        to: r.serviceRequest.serviceTypeId,
      }),
    },

    service: {
      provider: r.one.provider({
        from: r.service.providerId,
        to: r.provider.id,
      }),

      serviceType: r.one.serviceType({
        from: r.service.serviceTypeId,
        to: r.serviceType.id,
      }),
    },

    providerAvailability: {
      provider: r.one.provider({
        from: r.providerAvailability.providerId,
        to: r.provider.id,
      }),
    },

    serviceRequest: {
      user: r.one.user({
        from: r.serviceRequest.userId,
        to: r.user.id,
      }),

      serviceType: r.one.serviceType({
        from: r.serviceRequest.serviceTypeId,
        to: r.serviceType.id,
      }),

      assignments: r.many.serviceAssignment({
        from: r.serviceRequest.id,
        to: r.serviceAssignment.serviceRequestId,
      }),

      transactions: r.many.transaction({
        from: r.serviceRequest.id,
        to: r.transaction.serviceRequestId,
      }),

      ratings: r.many.rating({
        from: r.serviceRequest.id,
        to: r.rating.serviceRequestId,
      }),
    },

    serviceAssignment: {
      serviceRequest: r.one.serviceRequest({
        from: r.serviceAssignment.serviceRequestId,
        to: r.serviceRequest.id,
      }),

      provider: r.one.provider({
        from: r.serviceAssignment.providerId,
        to: r.provider.id,
      }),

      transactions: r.many.transaction({
        from: r.serviceAssignment.id,
        to: r.transaction.serviceAssignmentId,
      }),
    },

    paymentMethod: {
      user: r.one.user({
        from: r.paymentMethod.userId,
        to: r.user.id,
      }),

      transactions: r.many.transaction({
        from: r.paymentMethod.id,
        to: r.transaction.paymentMethodId,
      }),
    },

    transaction: {
      serviceRequest: r.one.serviceRequest({
        from: r.transaction.serviceRequestId,
        to: r.serviceRequest.id,
      }),

      serviceAssignment: r.one.serviceAssignment({
        from: r.transaction.serviceAssignmentId,
        to: r.serviceAssignment.id,
      }),

      user: r.one.user({
        from: r.transaction.userId,
        to: r.user.id,
      }),

      provider: r.one.provider({
        from: r.transaction.providerId,
        to: r.provider.id,
      }),

      paymentMethod: r.one.paymentMethod({
        from: r.transaction.paymentMethodId,
        to: r.paymentMethod.id,
      }),

      mobileMoneyTransaction: r.one.mobileMoneyTransaction({
        from: r.transaction.id,
        to: r.mobileMoneyTransaction.transactionId,
      }),
    },

    rating: {
      serviceRequest: r.one.serviceRequest({
        from: r.rating.serviceRequestId,
        to: r.serviceRequest.id,
      }),

      provider: r.one.provider({
        from: r.rating.providerId,
        to: r.provider.id,
      }),

      rater: r.one.user({
        from: r.rating.raterId,
        to: r.user.id,
      }),
    },

    providerMetric: {
      provider: r.one.provider({
        from: r.providerMetric.providerId,
        to: r.provider.id,
      }),
    },

    notification: {
      user: r.one.user({
        from: r.notification.userId,
        to: r.user.id,
      }),
    },

    mobileMoneyTransaction: {
      transaction: r.one.transaction({
        from: r.mobileMoneyTransaction.transactionId,
        to: r.transaction.id,
      }),
    },
  }),
);
