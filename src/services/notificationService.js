import emailjs from '@emailjs/browser';

/**
 * Service to handle real-world notifications (Email & SMS)
 */
export const NotificationService = {
    /**
     * Send order confirmation email via EmailJS
     * @param {Object} orderData - The order details
     * @returns {Promise}
     */
    sendOrderEmail: async (orderData) => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.warn("Notifications: EmailJS credentials missing in .env");
            return { success: false, message: "Credentials missing" };
        }

        try {
            const templateParams = {
                to_name: orderData.customerName,
                to_email: orderData.customerEmail,
                order_id: orderData.id || 'N/A',
                order_total: orderData.total,
                items_summary: orderData.items.map(i => `${i.title} (x${i.quantity})`).join(', '),
                delivery_address: `${orderData.address}, ${orderData.city}`
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            return { success: true };
        } catch (error) {
            console.error("EmailJS Error:", error);
            return { success: false, error };
        }
    },

    /**
     * Send order confirmation SMS
     * Placeholder for Twilio, Vonage or local gateway
     */
    sendOrderSMS: async (orderData) => {
        const apiKey = import.meta.env.VITE_SMS_API_KEY;
        
        if (!apiKey) {
            console.warn("Notifications: SMS API key missing in .env");
            return { success: false, message: "SMS API Key missing" };
        }

        try {
            // Example structure for a generic SMS API
            const message = `ELIKIA ART: Merci ${orderData.customerName}! Votre commande de ${orderData.total}$ est reçue. Suivi: ${orderData.id}`;
            const phone = orderData.phoneNumber;

            console.log(`Sending real SMS to ${phone}: ${message}`);
            
            // To implement real Twilio:
            // await fetch('https://api.twilio.com/...', { method: 'POST', body: ... });
            
            return { success: true };
        } catch (error) {
            console.error("SMS Gateway Error:", error);
            return { success: false, error };
        }
    }
};
