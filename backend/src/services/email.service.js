import { sendEmail } from '../utils/email.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

// Brand palette
const BRAND = {
  cardBg: '#FFFFFF',
  outerBg: '#F7F3EC',
  gold: '#C8922A',
  goldLight: '#F5E6C8',
  goldName: '#A0720A',
  text: '#1A1A1A',
  textSub: '#4A4A4A',
  textMuted: '#8A8A8A',
  green: '#2E7D52',
  greenLight: '#E8F5EE',
  red: '#B83232',
  redLight: '#FDEAEA',
  border: '#E8E0D0',
  headerBg: '#2A1F0E',
};

const STATUS_META = {
  CONFIRMED: {
    color: BRAND.green,
    bgColor: BRAND.greenLight,
    label: 'Order Confirmed',
    icon: '✓',
    message:
      'Great news! Your order has been confirmed and is now being prepared with care. We will notify you once it is on its way.',
    subject: (id) => `Your Vivid VitaBlends Order ${id} is Confirmed`,
  },
  DELIVERED: {
    color: BRAND.gold,
    bgColor: BRAND.goldLight,
    label: 'Order Delivered',
    icon: '★',
    message:
      'Your order has been delivered. We hope you enjoy your Vivid VitaBlends products. Thank you for choosing us — we look forward to serving you again.',
    subject: (id) => `Your Vivid VitaBlends Order ${id} has been Delivered`,
  },
  CANCELLED: {
    color: BRAND.red,
    bgColor: BRAND.redLight,
    label: 'Order Cancelled',
    icon: '✕',
    message:
      'We regret to inform you that your order has been cancelled. If you have any questions or need assistance, please do not hesitate to reach out to our support team.',
    subject: (id) => `Update on your Vivid VitaBlends Order ${id}`,
  },
};

/**
 * Build the HTML template for order status update
 * @param {object} order - The order object
 * @returns {{ subject: string, html: string }}
 */
const buildOrderStatusEmail = (order) => {
  const { orderId, customerName, status } = order;

  const meta = STATUS_META[status] ?? {
    color: BRAND.gold,
    bgColor: BRAND.goldLight,
    label: 'Status Update',
    icon: '•',
    message: `The status of your order has been updated to: ${status}.`,
    subject: (id) => `Your Vivid VitaBlends Order ${id} — Status Update`,
  };

  const subject = meta.subject(orderId);

  const logoHtml = config.logoUrl
    ? `<img src="${config.logoUrl}" width="48" height="48" alt="Vivid VitaBlends" style="display:block;width:48px;height:48px;border-radius:8px;" />`
    : `<table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:48px;height:48px;border-radius:8px;background:linear-gradient(135deg,#C8922A 0%,#E8B84B 50%,#A07018 100%);text-align:center;vertical-align:middle;"><span style="font-family:Georgia,serif;font-size:18px;font-weight:900;color:#FFFFFF;line-height:48px;">VV</span></td></tr></table>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.outerBg};font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.outerBg};">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background-color:${BRAND.cardBg};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background-color:${BRAND.headerBg};padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" width="48">${logoHtml}</td>
                  <td valign="middle" style="padding-left:16px;">
                    <p style="margin:0 0 2px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.gold};">Vivid VitaBlends</p>
                    <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:0.01em;">Order Notification</h1>
                  </td>
                  <td valign="middle" align="right">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:${meta.bgColor};border-radius:24px;padding:8px 18px;">
                          <span style="font-size:13px;font-weight:700;color:${meta.color};letter-spacing:0.04em;">${meta.icon}&nbsp; ${meta.label}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── GOLD ACCENT BAR ── -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,${BRAND.gold} 0%,#E8B84B 50%,${BRAND.gold} 100%);"></td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 6px;font-size:13px;color:${BRAND.textMuted};">Dear,</p>
              <h2 style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:${BRAND.text};">${customerName}</h2>

              <!-- Message -->
              <p style="margin:0 0 32px;font-size:15px;line-height:1.75;color:${BRAND.textSub};">${meta.message}</p>

              <!-- Order detail card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border-radius:10px;border:1px solid ${BRAND.border};overflow:hidden;">
                <tr>
                  <td colspan="2" style="padding:12px 20px;background-color:${BRAND.outerBg};border-bottom:1px solid ${BRAND.border};">
                    <span style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.gold};">Order Summary</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px 12px;font-size:13px;color:${BRAND.textMuted};">Order Reference</td>
                  <td style="padding:16px 20px 12px;text-align:right;font-family:Georgia,serif;font-size:16px;font-weight:700;color:${BRAND.goldName};letter-spacing:0.05em;">${orderId}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:0 20px;"><div style="height:1px;background-color:${BRAND.border};"></div></td>
                </tr>
                <tr>
                  <td style="padding:12px 20px 16px;font-size:13px;color:${BRAND.textMuted};">Status</td>
                  <td style="padding:12px 20px 16px;text-align:right;">
                    <table cellpadding="0" cellspacing="0" border="0" align="right">
                      <tr>
                        <td style="background-color:${meta.bgColor};border-radius:20px;padding:5px 14px;border:1px solid ${meta.color};">
                          <span style="font-size:12px;font-weight:600;color:${meta.color};letter-spacing:0.06em;">${status}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid ${BRAND.border};background-color:#FDFAF5;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;color:${BRAND.textSub};">&#9993;&nbsp; support@vividvitablends.com</p>
                    <p style="margin:0;font-size:13px;color:${BRAND.textSub};">&#127760;&nbsp; www.vividvitablends.com</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;font-size:12px;color:${BRAND.gold};font-family:Georgia,serif;font-style:italic;">Vivid VitaBlends</p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:11px;color:#BBBBBB;text-align:center;">This is an automated message &mdash; please do not reply directly. &nbsp;&bull;&nbsp; &copy; ${new Date().getFullYear()} Vivid VitaBlends. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  return { subject, html };
};

/**
 * Sends an order status update email to the customer
 * @param {object} order - The updated order
 */
export const sendOrderStatusUpdateEmail = async (order) => {
  try {
    if (
      !order ||
      !order.email ||
      order.email === '' ||
      order.email === 'noemail@example.com'
    ) {
      logger.info(
        'Skipping order status email: no valid email address provided',
        {
          orderId: order?.orderId,
        }
      );
      return;
    }

    // We don't need to send emails for PENDING status as it's the initial state
    if (order.status === 'PENDING') {
      return;
    }

    const { subject, html } = buildOrderStatusEmail(order);

    // Non-blocking fire-and-forget log
    logger.info('Dispatching order status update email', {
      orderId: order.orderId,
      status: order.status,
      to: order.email,
    });

    await sendEmail(order.email, subject, html);
  } catch (error) {
    logger.error('Failed in email service', {
      orderId: order?.orderId,
      error: error.message,
      stack: error.stack,
    });
  }
};
