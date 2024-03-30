const pool = require('../database/db');
const nodemailer = require('nodemailer');
const createError = require('http-errors');

async function sendingResetPassword(email) {
  try {
    // checks if email exists in database
    const existingEmail = await pool.query('select * from users where email = $1', [email]);
    if (existingEmail.rows.length === 0) {
      throw createError(400, 'Email does not exist');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'xmlsender1@gmail.com',
        pass: 'spfs ucnq sjaj qktq',
      },
    });

    const resetLink = `https://invoice-seng2021-24t1-eggs.vercel.app/resetPassword/${email}`;

    const mailOptions = {
      from: 'xmlsender1@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    let query = 'insert into sent_invoices (sender_email, receiver_email, invoices, type) values ($1, $2, $3, $4) returning invoice_id';
    const invoiceId = (await pool.query(query, ['resetPassword@gmail.com', email, [], 'TEXT'])).rows[0].invoice_id;
    console.log('Invoice ID: %d ', invoiceId);

    query = 'update users set notifications = array_append(notifications, $1) where email = $2';
    await pool.query(query, [invoiceId, email]);

    return {
      status: 200,
      message: 'Password reset instructions were sent to your email.'
    };

  } catch (error) {
    throw createError(400, 'Password reset email failed to send.');
  }
}

module.exports = sendingResetPassword;