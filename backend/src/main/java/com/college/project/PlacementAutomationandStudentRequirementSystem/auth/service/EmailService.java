package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // ✅ Plain Text Email
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    // ✅ HTML Email (for reset password)
    public void sendEmailWithHtml(String to, String subject, String resetLink) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);

            String htmlContent = """
                <div style="font-family: Arial; text-align: center;">
                    <h2>Password Reset Request</h2>
                    <p>Click the button below to reset your password:</p>
                    <a href="%s"
                       style="padding:10px 20px; background-color:blue; color:white; text-decoration:none;">
                       Reset Password
                    </a>
                    <p>This link will expire in 15 minutes.</p>
                </div>
            """.formatted(resetLink);

            helper.setText(htmlContent, true);

        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email", e);
        }

        mailSender.send(message);
    }
}