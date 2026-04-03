import nodemailer from 'nodemailer';
import config from '../config/index.js';
import logger from './logger.js';

let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;

  const { smtp } = config;

  if (!smtp.host || !smtp.user || !smtp.pass) {
    logger.warn(
      'SMTP credentials are not fully configured. Email sending will be disabled.'
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465, // true for 465, false for other ports
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  return transporter;
};

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const sendEmail = async (to, subject, html) => {
  const mailTransporter = createTransporter();

  if (!mailTransporter) {
    logger.info('Email simulation (SMTP not configured)', { to, subject });
    return false; // Or true if we want to fake success
  }

  try {
    const info = await mailTransporter.sendMail({
      from: `"Vivid VitaBlends" <${config.smtp.fromEmail}>`,
      to,
      subject,
      html,
    });

    logger.info('Email sent successfully', {
      to,
      subject,
      messageId: info.messageId,
    });
    return true;
  } catch (error) {
    logger.error('Failed to send email', {
      to,
      subject,
      error: error.message,
      stack: error.stack,
    });
    return false;
  }
};
