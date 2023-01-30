export interface IMPStatusResponse {
   acquirer_reconciliation: any[];
   additional_info: AdditionalInfo;
   authorization_code: null;
   binary_mode: boolean;
   brand_id: null;
   build_version: string;
   call_for_authorize_id: null;
   captured: boolean;
   card: Card;
   charges_details: any[];
   collector_id: number;
   corporation_id: null;
   counter_currency: null;
   coupon_amount: number;
   currency_id: string;
   date_approved: Date;
   date_created: Date;
   date_last_updated: Date;
   date_of_expiration: null;
   deduction_schema: null;
   description: string;
   differential_pricing_id: null;
   external_reference: null;
   fee_details: FeeDetail[];
   financing_group: null;
   id: number;
   installments: number;
   integrator_id: null;
   issuer_id: string;
   live_mode: boolean;
   marketplace_owner: null;
   merchant_account_id: null;
   merchant_number: null;
   metadata: Metadata;
   money_release_date: Date;
   money_release_schema: null;
   money_release_status: null;
   notification_url: null;
   operation_type: string;
   order: Order;
   payer: IMPStatusResponsePayer;
   payment_method: Order;
   payment_method_id: string;
   payment_type_id: string;
   platform_id: null;
   point_of_interaction: PointOfInteraction;
   pos_id: null;
   processing_mode: string;
   refunds: any[];
   shipping_amount: number;
   sponsor_id: null;
   statement_descriptor: string;
   status: string;
   status_detail: string;
   store_id: null;
   taxes_amount: number;
   transaction_amount: number;
   transaction_amount_refunded: number;
   transaction_details: TransactionDetails;
}

export interface AdditionalInfo {
   authentication_code: null;
   available_balance: null;
   ip_address: string;
   items: Item[];
   nsu_processadora: null;
   payer: AdditionalInfoPayer;
   shipments: Shipments;
}

export interface Item {
   category_id: string;
   description: null;
   id: string;
   picture_url: null;
   quantity: string;
   title: string;
   unit_price: string;
}

export interface AdditionalInfoPayer {
   first_name: string;
   last_name: string;
}

export interface Shipments {
   receiver_address: ReceiverAddress;
}

export interface ReceiverAddress {
   city_name: string;
   street_name: string;
   zip_code: string;
}

export interface Card {
   cardholder: Cardholder;
   date_created: Date;
   date_last_updated: Date;
   expiration_month: number;
   expiration_year: number;
   first_six_digits: string;
   id: null;
   last_four_digits: string;
}

export interface Cardholder {
   identification: Identification;
   name: string;
}

export interface Identification {
   number: string;
   type: string;
}

export interface FeeDetail {
   amount: number;
   fee_payer: string;
   type: string;
}

export interface Metadata {}

export interface Order {
   id: string;
   type: string;
}

export interface IMPStatusResponsePayer {
   first_name: null;
   last_name: null;
   email: string;
   identification: Identification;
   phone: Phone;
   type: null;
   entity_type: null;
   id: string;
}

export interface Phone {
   area_code: null;
   number: null;
   extension: null;
}

export interface PointOfInteraction {
   business_info: BusinessInfo;
   type: string;
}

export interface BusinessInfo {
   sub_unit: string;
   unit: string;
}

export interface TransactionDetails {
   acquirer_reference: null;
   external_resource_url: null;
   financial_institution: null;
   installment_amount: number;
   net_received_amount: number;
   overpaid_amount: number;
   payable_deferral_period: null;
   payment_method_reference_id: null;
   total_paid_amount: number;
}
